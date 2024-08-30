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
    await useFetchApi("PATCH", `/Employees/${updateInitials.id}`, values);
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
      <ErrorMessage :submitError="submitError" />
      <VeeForm @submit="createUser" v-slot="{ isSubmitting, values }">
        <InputField
          lable="Name"
          type="text"
          name="name"
          placeholder="Please enter emplyee name"
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
          lable="Salary (EGP)"
          type="number"
          name="salary"
          placeholder="Please enter employee salary"
          :initialValue="updateInitials.salary"
          :validator="
            number()
              .transform((value) => (Number.isNaN(value) ? null : value))
              .nullable()
              .required()
              .max(20000)
          "
        />
        <InputField
          lable="Date of Birth"
          type="date"
          name="birthDate"
          placeholder="Please enter employee birthday"
          :initialValue="updateInitials.birthDate"
          :validator="date().required().min('1-1-1940').max('1-1-2010')"
        />
        <InputField
          lable="Date of Joining"
          type="date"
          name="dateOfJoining"
          placeholder="Please enter employee date of joining"
          :initialValue="updateInitials.dateOfJoining"
          :validator="date().required()"
        />
        <UButton type="submit" block :disabled="isSubmitting" class="mb-4">
          Update
        </UButton>
      </VeeForm>
    </div>
  </UModal>
</template>
