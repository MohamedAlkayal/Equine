<script setup>
const renderedList = [
  {
    label: "Employees",
    icon: "i-heroicons-user-group-20-solid",
    to: "/employees",
  },
  {
    label: "Departments",
    icon: "i-heroicons-building-library-20-solid",
    to: "/departments",
  },
];
</script>

<template>
  <div
    class="hidden md:flex w-[80px] md:w-[300px] p-4 border-e h-screen flex-col justify-between pb-8"
  >
    <div>
      <div
        class="flex justify-center items-center w-full h-20 bg-primary-50 mx-auto mb-6 rounded-md"
      >
        <h1 class="text-4xl font-black text-primary-500 m-0">LOGO</h1>
      </div>
      <UVerticalNavigation
        :links="renderedList"
        :ui="{
          base: 'justify-center md:justify-start ',
          padding: ' px-2 py-4 md:px-4',
          active:
            'text-primary-500 before:bg-primary-50 font-semibold duration-300',
          label: ' md:ps-3 hidden md:block ',
          inactive: 'text-gray-600 hover:text-primary-500  duration-300',
          icon: {
            base: 'sm:h-6 sm:w-6',
            active: 'text-primary duration-300',
            inactive:
              'text-gray-600 group-hover:text-primary-500  duration-300',
          },
        }"
      />
    </div>
  </div>
</template>
