<script setup>
import convertDate from "../utilities/convertDate"; // Utility function to convert dates

import {
  EmployeeCreateModal,
  EmployeeUpdateModal,
  EmployeeDepartmentsModal,
  DeleteModal,
} from "#components"; // Importing required modals from components

const modal = useModal(); // Using a modal for creating, updating, and deleting data

// Columns for the Employees table
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

// Reactive variables to handle query and loading state
const query = ref("");
const qeuryLoading = ref(false);
let debounceTimer = null;

// Function to update the query with debounce for efficiency
const updateQuery = (q) => {
  qeuryLoading.value = true;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    query.value = q;
    qeuryLoading.value = false;
  }, 1000);
};

// Computed property to generate the API endpoint string based on the query
const fetchString = computed(() => {
  let string = `/Employees`;
  if (query.value) string += `?query=${query.value}`;
  return string;
});

// Fetching employees data with custom API hook
const { data: employees, status, refresh } = useAsyncApi("GET", fetchString);

// Function to open the create employee modal
const openCreate = () => {
  modal.open(EmployeeCreateModal, {
    onSuccess() {
      refresh(); // Refresh the data after creation
    },
  });
};

// Function to open the update employee modal
const openUpdate = (row) => {
  modal.open(EmployeeUpdateModal, {
    updateInitials: row, // Passing the selected row data to the modal
    onSuccess() {
      refresh(); // Refresh the data after update
    },
  });
};

// Function to open the delete employee modal
const openDelete = (row) => {
  modal.open(DeleteModal, {
    endpoint: `Employees/${row.id}`, // API endpoint for deletion
    record: "Employee", // Record type for deletion confirmation
    onSuccess() {
      refresh(); // Refresh the data after deletion
    },
  });
};

// Function to open the employee's departments modal
const openProfile = (row) => {
  modal.open(EmployeeDepartmentsModal, {
    profileData: row, // Passing the selected row data to the modal
    onSuccess() {
      refresh(); // Refresh the data after update
    },
  });
};

// Function to generate action items for each row in the table
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
    <!-- Dynamic page title -->
  </Head>
  <div
    class="relative flex flex-col min-h-[400px] max-h-screen h-full overflow-hidden"
  >
    <!-- Page Controls: Search bar and create button -->
    <PageControls
      page="Employees"
      label="Employee"
      icon="user-group-20-solid"
      :qeuryLoading="qeuryLoading"
      @openCreate="openCreate"
      @queryChange="updateQuery"
    />
    <!-- Employees Table -->
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
      <!-- Date of Birth column formatting -->
      <template #birthDate-data="{ row }">
        {{ convertDate(row.birthDate) }}
      </template>
      <!-- Joining Date column formatting -->
      <template #dateOfJoining-data="{ row }">
        {{ convertDate(row.dateOfJoining) }}
      </template>
      <!-- Actions column with dropdown for each row -->
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
