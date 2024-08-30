<script setup>
import convertDate from "../utilities/convertDate";

import {
  EmployeeCreateModal,
  EmployeeUpdateModal,
  EmployeeDepartmentsModal,
  DeleteModal,
} from "#components";

const modal = useModal();

// Table data
const cols = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "salary",
    label: "Salary",
  },
  {
    key: "birthDate",
    label: "Date of Birth",
  },
  {
    key: "dateOfJoining",
    label: "Joining Date",
  },
  {
    key: "createdDate",
    label: "Created at",
  },
  {
    key: "actions",
  },
];

// Read
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
  let string = `/Employees`;
  if (query.value) string += `?query=${query.value}`;
  return string;
});
const { data: employees, status, refresh } = useAsyncApi("GET", fetchString);

// Create
const openCreate = () => {
  modal.open(EmployeeCreateModal, {
    onSuccess() {
      refresh();
    },
  });
};

// Update
const openUpdate = (row) => {
  modal.open(EmployeeUpdateModal, {
    updateInitials: row,
    onSuccess() {
      refresh();
    },
  });
};

// Delete
const openDelete = (row) => {
  modal.open(DeleteModal, {
    endpoint: `Employees/${row.id}`,
    record: "Employee",
    onSuccess() {
      refresh();
    },
  });
};

// Employee Departments
const openProfile = (row) => {
  modal.open(EmployeeDepartmentsModal, {
    profileData: row,
    onSuccess() {
      refresh();
    },
  });
};

// Actions
const items = (row) => [
  [
    {
      label: "Update",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => openUpdate(row),
    },
    {
      label: "Departments",
      icon: "i-heroicons-building-library-16-solid",
      click: () => openProfile(row),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => openDelete(row),
    },
  ],
];
</script>

<template>
  <Head>
    <title>Employees - Equine</title>
  </Head>
  <div
    class="relative flex flex-col min-h-[400px] max-h-screen h-full overflow-hidden"
  >
    <PageControls
      page="Employees"
      label="Employee"
      icon="user-group-20-solid"
      :qeuryLoading="qeuryLoading"
      @openCreate="openCreate"
      @queryChange="updateQuery"
    />
    <UTable
      class="flex-1"
      :loading="status === 'pending'"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: 'Loading...',
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      :columns="cols"
      :rows="employees ? employees : []"
      :ui="{
        thead: 'sticky top-0 z-40 bg-gray-50',
      }"
    >
      <template #birthDate-data="{ row }">
        {{ convertDate(row.birthDate) }}
      </template>
      <template #dateOfJoining-data="{ row }">
        {{ convertDate(row.dateOfJoining) }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)" :ui="{ item: { padding: 'px-3 py-3' } }">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <!-- <div
      class="flex-none flex justify-between items-center p-4 px-8 border-t border-gray-200 dark:border-gray-700"
    >
      <PaginationMeta
        :rowsPerPage="10"
        :page="page"
        :total="employees?.meta?.total"
      />
      <UPagination
        size="xs"
        v-if="employees?.meta?.total"
        v-model="page"
        :page-count="selectedRowsPerPage"
        :total="employees.meta.total"
        :to="
          (page) => ({
            query: { page },
          })
        "
      />
    </div> -->
  </div>
</template>
