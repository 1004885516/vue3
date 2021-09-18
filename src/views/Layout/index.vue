<template>
    <el-container class="color-bg">
        <BSidebar v-if="show"/>
        <el-container>
            <el-header>
                <BHeader v-if="show" :isPhone="false"/>
                <BHeader v-else :isPhone="true"/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
    .color-bg {
        background: rgb(247, 247, 252);
        height: 100%;
        border: 1px solid #eee;
    }
    .el-drawer{
        background-color: rgb(34, 46, 60)
    }
    .el-drawer {
      background-color: rgb(34, 46, 60) !important;
    }
</style>

<script>
import BSidebar from './LSidebar.vue'
import BHeader from './THeader.vue'
export default {
    name: 'Layout',
    components: {
        BSidebar,
        BHeader
    },
    setup() {
        const screenWidth = document.body.clientWidth; // 屏幕尺寸
        let show = true;
        if (screenWidth < 1000) {
            show = false;
        } else {
            show = true;
        };
        return {
            screenWidth,
            show,
        }
    }
}
</script>