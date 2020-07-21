<style scoped>
    .line {
        display: flex;
    }

    .line .el-input {
        flex: 1;
    }

    .line i {
        line-height: 40px;
        display: inline-block;
        padding-left: 10px;
        font-size: 1.5em;
    }
</style>
<template>
    <div>
        <div class="line" v-for="(line, i) of value" :key="i">
            <el-input size="small" v-model="value[i][valueKey]"></el-input>
            <i style="color: #42b983;" class="el-icon-circle-plus-outline" @click="addLine(i)"></i>
            <i v-if="showDelete" style="color: #b9ae10;" class="el-icon-remove-outline" @click="removeLine(i)"></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MultiInput',
        props: {
            valueKey: String,
            value: Array,
        },
        computed: {
            showDelete() {
                return this.value.length > 1
            }
        },
        created() {
            if (this.value.length === 0) {
                this.addLine(0);
            }
        },
        methods: {
            addLine(index) {
                let newLine = {};
                newLine[this.valueKey] = '';
                this.value.splice(index + 1, 0, newLine)
            },
            removeLine(index) {
                this.value.splice(index, 1)
            }
        }
    }
</script>
