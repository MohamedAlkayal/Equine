<script setup>
import convertDate from "../utilities/convertDate"; // Utility to format dates

import {
  DepartmentCreateModal,
  DepartmentUpdateModal,
  DepartmentEmployeesModal,
  DeleteModal,
} from "#components"; // Importing modals for CRUD operations

const modal = useModal(); // Modal instance for handling modals

// Table columns definition
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
    key: "manager",
    label: "Manager",
  },
  {
    key: "createdDate",
    label: "Created at",
  },
  {
    key: "updatedDate",
    label: "Updated at",
  },
  {
    key: "actions",
  },
];

// Query handling with debounce for search functionality
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

// Computed fetch string for API calls
const fetchString = computed(() => {
  let string = `/Departments`;
  if (query.value) string += `?query=${query.value}`;
  return string;
});

// Fetching employees data with the useAsyncApi composable
const { data: employees, status, refresh } = useAsyncApi("GET", fetchString);

// Open modal for creating a new department
const openCreate = () => {
  modal.open(DepartmentCreateModal, {
    onSuccess() {
      refresh(); // Refresh the data after successful creation
    },
  });
};

// Open modal for updating an existing department
const openUpdate = (row) => {
  modal.open(DepartmentUpdateModal, {
    updateInitials: row, // Passing the current row data to the modal
    onSuccess() {
      refresh(); // Refresh the data after successful update
    },
  });
};

// Open modal for deleting a department
const openDelete = (row) => {
  modal.open(DeleteModal, {
    endpoint: `Departments/${row.id}`, // API endpoint for deletion
    record: "Department", // Record type for user feedback
    onSuccess() {
      refresh(); // Refresh the data after successful deletion
    },
  });
};

// Open modal to see employees in a department
const openEmployeesList = (row) => {
  modal.open(DepartmentEmployeesModal, {
    departmentData: row, // Passing department data to the modal
    onSuccess() {
      refresh(); // Refresh the data after successful operation
    },
  });
};

// Define action items for the actions column
const items = (row) => [
  [
    {
      label: "Update",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => openUpdate(row),
    },
    {
      label: "See Members",
      icon: "i-heroicons-user-group-20-solid",
      click: () => openEmployeesList(row),
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
    <title>Departments - Equine</title>
  </Head>
  <div
    class="relative flex flex-col min-h-[400px] max-h-screen h-full overflow-hidden"
  >
    <!-- Page controls including search and create button -->
    <PageControls
      page="Departments"
      label="Department"
      icon="building-library-20-solid"
      :qeuryLoading="qeuryLoading"
      @openCreate="openCreate"
      @queryChange="updateQuery"
    />
    <!-- Table displaying department data -->
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
      <!-- Formatting birthDate column using convertDate utility -->
      <template #birthDate-data="{ row }">
        {{ convertDate(row.birthDate) }}
      </template>
      <!-- Formatting dateOfJoining column using convertDate utility -->
      <template #dateOfJoining-data="{ row }">
        {{ convertDate(row.dateOfJoining) }}
      </template>
      <!-- Actions column with dropdown menu -->
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
  </div>
</template>
