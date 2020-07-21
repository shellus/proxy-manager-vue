<style lang="less" scoped>
    #app {
        width: 1024px;
        min-height: 100%;
        margin: 0 auto;
    }

    #main {
        background-color: #f2f6fc;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
<style>
    .el-menu {
        min-height: 100%;
    }
</style>

<template>
    <el-container id="app">
        <el-aside width="200px">
            <el-menu
                :default-active="menuIndex"
                class="el-menu-vertical-demo"
                @select="goPage"
                background-color="#e6ebf3"
                text-color="#2c3e50"
                active-text-color="#f56c6c">
                <el-menu-item v-for="(menu, i) of menus" :key="i" :index="menu.link.name">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{ menu.name }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main id="main">
            <div>{{childTitle}}</div>
            <hr>
            <router-view ref="router-view"/>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            childTitle() {
                return this.$route.meta.title
            }
        },
        watch: {
            '$route.name': function (value) {
                this.menuIndex = value
            }
        },
        created() {
        },
        data() {
            return {
                menuIndex: 'Home',
                menus: [
                    {
                        name: '首页',
                        icon: 'el-icon-menu',
                        link: {name: 'Home'}
                    },
                    {
                        name: '证书管理',
                        icon: 'el-icon-menu',
                        link: {name: 'CertificateIndex'}
                    },
                    {
                        name: '代理管理',
                        icon: 'el-icon-menu',
                        link: {name: 'ProxyHostIndex'}
                    },
                ]
            }
        },
        methods: {
            goPage(index) {
                for (let i in this.menus) {
                    if (this.menus[i].link.name === index) {
                        this.$router.push(this.menus[i].link)
                    }
                }
            }
        }
    }
</script>
