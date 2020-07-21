<style lang="less" scoped>
    .status {
        display: inline-block;
        width: 8em;
        text-align: center;
        color: #42b983;
        margin-left: 10px;
    }

    .el-alert {
        margin: 20px 0 0;
    }

</style>
<template>
    <div>
        <div class="block">
            <h3>服务状态：</h3>
            <hr>
            <el-alert
                v-for="(e, i) of errMessages" :key="i"
                :title="e"
                type="error"
                :closable="false"
                effect="light">
            </el-alert>
            <el-alert
                v-if="nginx_version"
                :title="`检测到 Nginx 版本: (${nginx_version})`"
                type="success"
                :closable="false"
                effect="light">
            </el-alert>
            <el-alert
                v-if="acmesh_version"
                :title="`检测到 acme.sh 版本: (${acmesh_version})`"
                type="success"
                :closable="false"
                effect="light">
            </el-alert>
        </div>
        <div>
            <div class="status block">
                <div>
                    <i style="font-size: 5em; color: #00458a;" class="el-icon-help"></i>
                </div>
                <div>
                    代理数量：{{ proxy_count }}
                </div>
            </div>
            <div class="status block">
                <div>
                    <i style="font-size: 5em; color: #5c5c5c;" class="el-icon-edit"></i>
                </div>
                <div>
                    证书数量： {{ certificate_count }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Home',
        data(){
            return {
                proxy_count: null,
                certificate_count: null,
                nginx_version: null,
                acmesh_version: null,
                errMessages: [],
            }
        },
        async created() {
            let response = await this.$http.get('/home-data');
            console.log(response);
            this.proxy_count = response.data.proxy_count;
            this.certificate_count = response.data.certificate_count;
            this.nginx_version = response.data.nginx_version;
            this.acmesh_version = response.data.acmesh_version;
            this.errMessages = response.data.errMessages;
        },
    }
</script>
