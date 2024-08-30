<script lang="ts" setup>
import { string, number, date } from "yup";

const { updateInitials } = defineProps({
  profileData: {
    type: Object,
    required: true,
  },
});

const toast = useToast();
const modal = useModal();
const emit = defineEmits(["success"]);

const submitError = ref(null);

const createUser = async (values) => {
  submitError.value = "";
  try {
    await useFetchApi("PATCH", `/Employees/${profileData.id}`, values);
    emit("success");
    toast.add({ title: "Employee updated successfully", color: "green" });
    modal.close();
  } catch (error) {
    submitError.value = error.response?.title;
    toast.add({ title: "Somthing went wrong", color: "red" });
    console.error(error);
  }
};
</script>

<template>
  <UModal>
    <div class="p-6">
      <h1 class="text-xl font-bold w-fit">Update Employee</h1>
    </div>
  </UModal>
</template>
