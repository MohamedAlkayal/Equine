<script lang="ts" setup>
import { string, number, date } from "yup";

const { updateInitials } = defineProps({
  updateInitials: {
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
    await useFetchApi("PATCH", `/Departments/${updateInitials.id}`, values);
    emit("success");
    toast.add({ title: "Department updated successfully", color: "green" });
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
      <h1 class="text-xl font-bold w-fit">Create Department</h1>
      <ErrorMessage :submitError="submitError" />
      <VeeForm @submit="createUser" v-slot="{ isSubmitting, values }">
        <InputField
          lable="Name"
          type="text"
          name="name"
          placeholder="Please enter department name"
          :initialValue="updateInitials.name"
          :validator="
            string()
              .required()
              .matches(/^\s*[A-Za-z]+(?:\s[A-Za-z]+)*\s*$/, {
                message: 'Please enter a valid name',
              })
              .ensure()
              .trim()
          "
        />
        <InputField
          lable="Manager"
          type="text"
          name="manager"
          placeholder="Please enter manager name"
          :initialValue="updateInitials.manager"
          :validator="
            string()
              .required()
              .matches(/^\s*[A-Za-z]+(?:\s[A-Za-z]+)*\s*$/, {
                message: 'Please enter a valid name',
              })
              .ensure()
              .trim()
          "
        />
        <UButton type="submit" block :disabled="isSubmitting" class="mb-4">
          Update
        </UButton>
      </VeeForm>
    </div>
  </UModal>
</template>
