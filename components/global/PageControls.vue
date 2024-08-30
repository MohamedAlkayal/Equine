<script lang="ts" setup>
interface Props {
  page: string;
  label: string;
  icon: string;
  qeuryLoading: boolean;
}

const { page, label, icon, qeuryLoading } = defineProps<Props>();

const emit = defineEmits<{
  (e: "openCreate"): void;
  (e: "queryChange", q: string): void;
}>();

const query = ref("");
watch(query, (newVal) => {
  emit("queryChange", newVal);
});
</script>

<template>
  <div class="sticky top-0 z-50 p-8 border-b w-full">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-3 text-gray-600">
        <UIcon
          :name="`i-heroicons-${icon}`"
          class="w-6 h-6 sm:w-8 sm:h-8 text-primary"
        />
        <h1 class="text-lg sm:text-2xl font-medium">{{ page }}</h1>
        <UInput
          v-model="query"
          :loading="qeuryLoading"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search ..."
          class="w-52 mt-1"
          id="search"
          size="sm"
        />
      </div>
      <UButton
        class="px-4"
        dir="rtl"
        icon="i-heroicons-plus-16-solid"
        size="md"
        @click="emit('openCreate')"
      >
        <template class="hidden sm:block"> Create {{ label }} </template>
      </UButton>
    </div>
  </div>
</template>
