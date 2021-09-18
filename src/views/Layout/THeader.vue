<template>
    <el-row>
        <div v-if="isPhone">
            <el-button @click="drawer = true" icon="el-icon-s-unfold" type="info"  size="mini" style="margin-right: .5rem;"></el-button>
        </div>
        <el-col :span="12" class="left-show">
            <span style="margin-right: 20px">{{ channel_id }}</span>
            <!-- <el-cascader v-show="isShow" v-model="selectValue" :options="options" @change="handleChange"></el-cascader> -->
        </el-col>
        <el-col :span="12" class="right-show">
            <span style="margin-right: 100px">{{ mode }}</span>
            <span style="margin-right: 20px">{{ name }}</span>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 30px"></i>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<style>
    .el-header {
        background-color: #ffffff;
        line-height: 60px;
        width: 100%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .left-show {
        text-align: left !important;
    }
    .right-show {
        text-align: right !important;
    }
    .el-row {
        display:flex;
    }
</style>

<script>
    // import EventBus from '@/utils/EventBus.js'
    import { getUser, getProUrl, removeToken } from '@/utils/Cookies.js'
    import gd from '@/utils/GlobalData'
    import gt from '@/utils/GlobalMethod'
    import LSidebar from './LSidebar.vue'
    import { ref } from 'vue'
    export default {
        components: {
            LSidebar
        },
        props: ['isPhone'],
        setup(props) {
            const channel_id = gd.ChannelId;
            let isShow = true;
            const selectValue = ref('');
            const options = [];
            const name = 'aaa';
            const mode = `${process.env.NODE_ENV}(${getProUrl()})`;
            const drawer = false;
            const isAll = false;
            const isPhone = false;
            const checkShowChannelSelect = () => {
                const path = $route.path;
                if (path === gd.RoutePath.RealTime_Data || path === gd.RoutePath.Active_Data
                    || path === gd.RoutePath.Session_Data) {
                        isShow = false;
                    } else {
                        isShow = true;
                    }
            };
            const handleChange = (value) => {
                console.log('event emit name : ' + $route.name + ', value : ' + value[0]);
                console.log($route.name);
                gt.setApkId(value[0]);
                // EventBus.$emit(gd.EventId.CHANGE_APK_ID);
            };
            const queryChannelPackage = () => {
                gt.httpGet('/channel_package', { isAll: isAll }).then((response) => {
                    if (!response.data.result) {
                        $message({ message: '无数据返回' });
                        return false;
                    }
                    gt.clearPackageIds();
                    console.log('response.data.result', response.data.result);
                    for (let i = 0; i < response.data.result.length; i++) {
                        const data = response.data.result[i];
                        gt.addPackageId(data.apk_id, data.package_id);
                        if (i === 0) {
                            selectValue = data.apk_id;
                        }
                    }
                    const packageIds = gt.getPackageIdsByAll();
                    for (let key in packageIds) {
                        let item = { value: key, label: key };
                        options.push(item);
                    }
                    gt.setApkId(selectValue);
                }).catch(function (error) {
                    console.log(error);
                });
            };  
            const logout = () => {
                gt.httpPost('/logout', { isAll: isAll }).then((response) => {
                    console.log('response.data.result-----', response.data);
                    if (!response.data.session) {
                        removeToken();
                        $router.replace('/login')
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            return {
                checkShowChannelSelect,
                channel_id,
                isShow,
                selectValue,
                options,
                name,
                mode,
                drawer,
                isAll,
                handleChange,
                queryChannelPackage,
                logout,
                isPhone
            };
        }
    };
</script>