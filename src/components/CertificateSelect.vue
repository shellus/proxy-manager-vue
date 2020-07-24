<template>
    <el-select clearable :value="value" @change="onSelect" filterable :disabled="disabled">
        <el-option v-for="item of data" :key="item.id" :value="item.id" :label="item.name"></el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'CertificateSelect',
        props: {
            value: [Number],
            disabled: Boolean
        },
        data() {
            return {
                data: []
            }
        },
        async created() {
            let response = await this.$http.get('/certificate/certificate/select-list');
            this.data = response.data
        },
        methods: {
            onSelect(value) {
                this.$emit('input', value === '' ? null : value)
            },
        }
    }
</script>
