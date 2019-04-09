<template>
    <div class="nav">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper"/>
                HOME 
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-people" />
                作品
            </MenuItem>
            <!-- <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="4">
                <Icon type="ios-construct" />
                综合设置
            </MenuItem> -->
        </Menu>
        <router-view></router-view>
    </div>
</template>
<script>
import { Menu,MenuItem, Icon, Submenu, MenuGroup } from "iview";
export default {
    components: {
        Menu,MenuItem, Icon, Submenu, MenuGroup
    },
    data () {
        return {
            theme1: 123
        }
    }
};
</script>
<style lang="stylus" scoped>
.nav {
    background: #ffffff;
}
</style>


