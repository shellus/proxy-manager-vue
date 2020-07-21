<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['certificate-config-dialog'].open()">添加签发配置</el-button>
        </div>
        <div class="block">
            <div v-for="(certificateConfig, i) of data.data" :key="i">
                <div>
                    {{ TYPE_TITLES[certificateConfig.type] }}
                </div>
                <div @click="goEdit(certificateConfig)">编辑</div>
            </div>
        </div>
        <certificate-config-dialog :TYPE_TITLES="TYPE_TITLES"
                                   ref="certificate-config-dialog"></certificate-config-dialog>
        <el-pagination @current-change="jump" :current-page="searchForm.page" :page-size="data.per_page"
                       layout="total, prev, pager, next, jumper" :total="data.total">
        </el-pagination>
    </div>
</template>
<script>
    import CertificateConfigDialog from "@/views/certificate/CertificateConfigDialog";

    export default {
        name: 'CertificateConfigIndex',
        components: {CertificateConfigDialog},
        data() {
            return {
                TYPE_TITLES: {},
                searchForm: {},
                data: []
            }
        },
        async created() {
            let response = await this.$http.get('/certificate/certificate-config/index-data');
            this.TYPE_TITLES = response.data.TYPE_TITLES;
            this.search()
        },
        methods: {
            jump(index) {
                this.searchForm.page = index;
                this.search();
            },
            async search() {
                let response = await this.$http.get('/certificate/certificate-config/list', {params: this.searchForm});
                this.data = response.data;
            },
            goEdit(certificateConfig) {
                this.$refs['certificate-config-dialog'].open(certificateConfig)
            }
        }
    }
</script>
