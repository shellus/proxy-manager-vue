<style lang="less" scoped>
    .status {
        display: inline-block;
        width: 8em;
        text-align: center;
        color: #42b983;
    }

    .el-alert {
        margin: 20px 0 0;
    }

</style>
<template>
    <div>
        <div class="block" style="width: 35em;">
            <h3>服务状态：</h3>
            <hr>
            <el-alert
                title="检测到 Nginx 版本: (1.17.1)"
                type="success"
                :closable="false"
                effect="light">
            </el-alert>
            <el-alert
                v-if="false"
                title="未检测到 Nginx，请检查环境变量"
                type="error"
                :closable="false"
                effect="dark">
            </el-alert>
            <el-alert
                title="检测到 acme.sh 版本: (v2.8.7)"
                type="success"
                :closable="false"
                effect="light">
            </el-alert>
            <el-alert
                v-if="false"
                title="未检测到 acme.sh，请检查环境变量"
                type="error"
                :closable="false"
                effect="dark">
            </el-alert>
        </div>
        <div>
            <div class="status block">
                <div>
                    <i style="font-size: 5em; color: #00458a;" class="el-icon-help"></i>
                </div>
                <div>
                    Nginx状态正常
                </div>
            </div>
            <div class="status block">
                <div>
                    <i style="font-size: 5em; color: #5c5c5c;" class="el-icon-edit"></i>
                </div>
                <div>
                    SSL配置完整
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Home',
    }
</script>
