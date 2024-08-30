<script lang="ts" setup>
import { string, number, date } from "yup";

const { profileData } = defineProps({
  profileData: {
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
  let string = "/Departments?paginae=999";
  if (query.value) string += `&query=${query.value}`;
  return string;
});

const { data: departments, status: departmentsStatus } = useAsyncApi(
  "GET",
  fetchString
);
const selectedDepartment = ref(null);

// Read Employee Departments
const {
  data: employeeDepartments,
  status: employeeDepartmentsStatus,
  refresh: employeeDepartmentsRefresh,
} = useAsyncApi("GET", `/Employees/${profileData.id}/Departments`);

// Assign Empoyee to Department
const assignLoading = ref(false);
const assignDepartment = async () => {
  assignLoading.value = true;
  try {
    await useFetchApi(
      "POST",
      `/Departments/${selectedDepartment.value}/employees`,
      {
        employeeId: profileData.id,
      }
    );
    toast.add({ title: "Department assigned successfully", color: "green" });
    await employeeDepartmentsRefresh();
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
const removeDepartment = async (departmentId) => {
  removedID.value = departmentId;
  try {
    await useFetchApi(
      "DELETE",
      `/Departments/${departmentId}/employees/${profileData.id}`
    );
    toast.add({ title: "Department removed successfully", color: "green" });
    await employeeDepartmentsRefresh();
  } catch (error) {
    toast.add({ title: "Somthing went wrong", color: "red" });
  } finally {
    removedID.value = null;
  }
};
</script>

<template>
  <UModal :ui="{ width: 'sm:max-w-3xl' }">
    <div class="p-6 min-h-[450px]">
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-heroicons-user-circle-16-solid" class="h-8 w-8" />
        <h1 class="text-xl font-bold w-fit">{{ profileData.name }}</h1>
      </div>
      <div
        class="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-4 z-50"
      >
        <h2 class="text-lg font-medium">Departments</h2>
        <div class="flex gap-3">
          <USelectMenu
            :options="departments"
            searchable
            v-model="selectedDepartment"
            v-model:query="query"
            :loading="departmentsStatus === 'pending' || qeuryLoading"
            searchable-placeholder="Search a department..."
            placeholder="Select a department"
            icon="i-heroicons-magnifying-glass-20-solid"
            class="w-full lg:w-52"
            option-attribute="name"
            value-attribute="id"
          />
          <UButton
            :disabled="!selectedDepartment"
            :loading="assignLoading"
            icon="i-heroicons-check-circle"
            size="sm"
            @click="assignDepartment"
          >
            Assign
          </UButton>
        </div>
      </div>
      <UTable
        class="flex-1"
        :loading="employeeDepartmentsStatus === 'pending'"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :columns="[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Department' },
          { key: 'manager', label: 'Manager' },
          { key: 'actions' },
        ]"
        :rows="employeeDepartments ? employeeDepartments : []"
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
            @click="removeDepartment(row.id)"
          >
            Remove
          </UButton>
        </template>
      </UTable>
    </div>
  </UModal>
</template>
