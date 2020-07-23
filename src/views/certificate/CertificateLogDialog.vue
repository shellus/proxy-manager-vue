<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="证书日志"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="block">
            <el-table v-if="data && data.logs" ref="table" :data="data.logs" border style="width: 100%">
                <el-table-column label="类型" align="center" width="100">
                    <template slot-scope="scope">
                        {{ OP_TYPE_TITLES[scope.row.op_type] }}
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="时间" align="center" width="170"></el-table-column>
                <el-table-column label="详情" align="center">
                    <template slot-scope="scope">
                        <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" :title="scope.row.detail">{{ scope.row.detail }}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'CertificateLogDialog',
        props: {
            OP_TYPE_TITLES: Object,
        },
        data() {
            return {
                dialogVisible: false,
                data: null
            }
        },
        created() {
        },
        methods: {
            async open(certificate) {
                this.data = null;
                let response = await this.$http.get('/certificate/certificate/log', {params: {id: certificate.id}});
                this.data = response.data;

                this.dialogVisible = true;
            },
            onClose() {
                this.dialogVisible = false;
                this.data = null;
            }
        }
    }
</script>
