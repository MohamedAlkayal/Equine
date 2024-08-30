<script setup>
const {} = defineProps({
    rowsPerPage: {
        required: true,
    },
    page: {
        required: true,
    },
    total: {
        required: true,
    },
})
</script>

<template>
    <div dir="rtl" class="text-xs text-gray-600">
        من
        {{ rowsPerPage * page + 1 - rowsPerPage }} إلى
        {{ rowsPerPage * page > total ? total : rowsPerPage * page }}
        إجمالي النتائج {{ total }}
    </div>
</template>
