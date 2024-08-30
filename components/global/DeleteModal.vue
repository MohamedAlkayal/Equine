<script setup>
const toast = useToast();
const modal = useModal();
const emit = defineEmits(["success"]);

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  record: {
    type: String,
    required: true,
  },
});

const { endpoint, record } = props;

// Delete
const isSubmittingDelete = ref(false);

const handelDelete = async () => {
  isSubmittingDelete.value = true;
  try {
    const res = await useFetchApi("DELETE", endpoint);
    modal.close();
    emit("success");
    toast.add({
      title: `${record} has been deleted successfully`,
      color: "green",
    });
  } catch (error) {
    modal.close();
    toast.add({ title: "Somthing went wrong", color: "red" });
  } finally {
    isSubmittingDelete.value = false;
  }
};
</script>

<template>
  <UModal>
    <div class="p-8">
      <div class="flex gap-3 items-center mb-2">
        <UIcon
          name="i-heroicons-minus-circle-20-solid"
          class="text-red-500 h-8 w-8 mt-1"
        />
        <h1 class="text-xl font-bold">
          Coution: You are deleting {{ record }}
        </h1>
      </div>
      <p class="text-sm text-start text-gray-500 mb-8 ps-12">
        This action is permanent and cannot be reveresed!
      </p>
      <div class="flex justify-end gap-2">
        <UButton
          :disabled="isSubmittingDelete"
          size="md"
          color="red"
          @click="handelDelete"
          >Delete</UButton
        >
        <UButton
          :disabled="isSubmittingDelete"
          size="md"
          color="gray"
          variant="soft"
          class="px-10"
          @click="modal.close()"
          >Cancel</UButton
        >
      </div>
    </div>
  </UModal>
</template>
