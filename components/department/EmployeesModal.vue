<script lang="ts" setup>
import { string, number, date } from "yup";

const { departmentData } = defineProps({
  departmentData: {
    type: Object,
    required: true,
  },
});

const toast = useToast();
const modal = useModal();
const emit = defineEmits(["success"]);

// Read Departments
const query = ref("");
const qeuryLoading = ref(false);
let debounceTimer = null;
const updateQuery = (q) => {
  qeuryLoading.value = true;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    query.value = q;
    qeuryLoading.value = false;
  }, 1000);
};

const fetchString = computed(() => {
  let string = "/Employees?paginate=990";
  if (query.value) string += `&query=${query.value}`;
  return string;
});

const { data: employees, status: employeesStatus } = useAsyncApi(
  "GET",
  fetchString
);
const selectedEmployee = ref(null);

// Read Employee Departments
const {
  data: departmentEmployees,
  status: departmentEmployeesStatus,
  refresh: departmentEmployeesRefresh,
} = useAsyncApi("GET", `/Departments/${departmentData.id}/Employees`);

// Assign Empoyee to Department
const assignLoading = ref(false);
const assignEmployee = async () => {
  assignLoading.value = true;
  try {
    await useFetchApi("POST", `/Departments/${departmentData.id}/employees`, {
      EmployeeId: selectedEmployee.value,
    });
    toast.add({ title: "Employee assigned successfully", color: "green" });
    await departmentEmployeesRefresh();
  } catch (error) {
    if (error.status === 422) {
      toast.add({
        title: "Employee is alredy assigned to this department",
        color: "red",
      });
    } else {
      toast.add({ title: "Somthing went wrong", color: "red" });
    }
  } finally {
    assignLoading.value = false;
  }
};

// Remove Employee From Department

const removedID = ref(null);
const removeEmployee = async (departmentId) => {
  removedID.value = departmentId;
  try {
    await useFetchApi(
      "DELETE",
      `/Departments/${departmentData.id}/employees/${departmentId}`
    );
    toast.add({ title: "Employee removed successfully", color: "green" });
    await departmentEmployeesRefresh();
  } catch (error) {
    toast.add({ title: "Somthing went wrong", color: "red" });
  } finally {
    removedID.value = null;
  }
};
</script>

<template>
  <UModal :ui="{ width: 'sm:max-w-3xl' }">
    <div class="relative p-6 flex flex-col h-[500px] overflow-hidden">
      <div>
        <div class="flex items-center gap-3 mb-6">
          <UIcon name="i-heroicons-building-library-16-solid" class="h-8 w-8" />
          <h1 class="text-xl font-bold w-fit">{{ departmentData.name }}</h1>
        </div>
        <div
          class="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-4 z-50"
        >
          <h2 class="text-lg font-medium">Employees</h2>
          <div class="flex gap-3">
            <USelectMenu
              :options="employees"
              searchable
              v-model="selectedEmployee"
              v-model:query="query"
              :loading="employeesStatus === 'pending' || qeuryLoading"
              searchable-placeholder="Search an employee..."
              placeholder="Select an employee"
              icon="i-heroicons-magnifying-glass-20-solid"
              class="w-full lg:w-52"
              option-attribute="name"
              value-attribute="id"
            />
            <UButton
              :disabled="!selectedEmployee"
              :loading="assignLoading"
              icon="i-heroicons-check-circle"
              size="sm"
              @click="assignEmployee"
            >
              Assign
            </UButton>
          </div>
        </div>
      </div>
      <UTable
        class="flex-1"
        :loading="departmentEmployeesStatus === 'pending'"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :columns="[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Department' },
          { key: 'salary', label: 'Salary' },
          { key: 'dateOfJoining', label: 'Date of Joining' },
          { key: 'actions' },
        ]"
        :rows="departmentEmployees ? departmentEmployees : []"
        :ui="{
          thead: 'sticky top-0 z-10 bg-gray-50',
        }"
      >
        <template #actions-data="{ row }">
          <UButton
            color="red"
            variant="soft"
            size="sm"
            icon="i-heroicons-x-circle"
            :loading="removedID === row.id"
            @click="removeEmployee(row.id)"
          >
            Remove
          </UButton>
        </template>
      </UTable>
    </div>
  </UModal>
</template>
