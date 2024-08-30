<script lang="ts" setup>
import convertDate from "../../utilities/convertDate";

import { StringSchema } from "yup";

interface Props {
  lable: string;
  type?: "text" | "email" | "number" | "date";
  name: string;
  validator?: StringSchema | undefined;
  placeholder: string;
  initialValue?: string | number | null;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  validator: undefined,
  initialValue: null,
  disabled: false,
});

const { value, errorMessage, errors } = useField(props.name, props.validator, {
  initialValue:
    props.type === "date" && props.initialValue
      ? convertDate(props.initialValue, "yyyy-mm-dd")
      : props?.initialValue,
});
</script>

<template>
  <label :for="props.name" class="block mb-4">
    <div class="flex justify-between items-center mb-2">
      <p>{{ props.lable }}</p>
      <p v-if="errorMessage" class="text-xs text-red-500">
        {{ errorMessage }}
      </p>
    </div>
    <input
      v-model="value"
      :type="props.type"
      :name="props.name"
      :id="props.name"
      :autocomplete="props.name"
      :placeholder="props.placeholder"
      class="remove-arrow w-full border-2 p-[10px] mb-4 rounded-md outline-0"
      :class="errors.length ? ' outline-0 border-red-500 border-2' : ''"
      :disabled="props.disabled"
    />
  </label>
</template>

<style>
.remove-arrow::-webkit-inner-spin-button,
.remove-arrow::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.remove-arrow {
  -moz-appearance: textfield;
}
</style>
