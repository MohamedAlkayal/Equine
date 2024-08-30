<script lang="ts" setup>
interface Props {
    submitError: string | null
}

const props = defineProps<Props>()
</script>

<template>
    <div class="h-12">
        <p
            v-if="props.submitError"
            class="p-3 text-red-500 text-sm text-center rounded"
        >
            {{ submitError }}
        </p>
    </div>
</template>
