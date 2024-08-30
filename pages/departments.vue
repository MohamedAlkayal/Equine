<script setup>
import convertDate from "../utilities/convertDate";

import {
  DepartmentCreateModal,
  DepartmentUpdateModal,
  DepartmentEmployeesModal,
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
    key: "manager",
    label: "Manager",
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
  let string = `/Departments`;
  if (query.value) string += `?query=${query.value}`;
  return string;
});
const { data: employees, status, refresh } = useAsyncApi("GET", fetchString);

// Create
const openCreate = () => {
  modal.open(DepartmentCreateModal, {
    onSuccess() {
      refresh();
    },
  });
};

// Update
const openUpdate = (row) => {
  modal.open(DepartmentUpdateModal, {
    updateInitials: row,
    onSuccess() {
      refresh();
    },
  });
};

// Delete
const openDelete = (row) => {
  modal.open(DeleteModal, {
    endpoint: `Departments/${row.id}`,
    record: "Department",
    onSuccess() {
      refresh();
    },
  });
};

// Department Employess
const openEmployeesList = (row) => {
  modal.open(DepartmentEmployeesModal, {
    departmentData: row,
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
    <PageControls
      page="Departments"
      label="Department"
      icon="building-library-20-solid"
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
  </div>
</template>
