<template>
    <el-card class="box-card">
        <el-row :gutter="20">
            <h3><strong>实时数据(今日-用户)</strong></h3>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>新增</h5>
                    <h1>{{data.newRegister}}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>活跃</h5>
                    <h1>{{ data.todayActive }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>总在线</h5>
                    <h1>{{ data.online }}</h1>
                </el-card>
            </el-col>
             <el-col :span="4">
                <el-card class="box-card">
                    <h5>最高在线</h5>
                    <h1>{{ data.onlineMax }}</h1>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>累计充值用户</h5>
                    <h1>{{ data.totalRechargeUsers }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>累计用户</h5>
                    <h1>{{ data.totalUsers }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>大厅在线</h5>
                    <!-- <h1>{{ data }}</h1> -->
                    <h1>{{ data.online }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>游戏在线</h5>
                    <h1>{{ data.game }}</h1>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>新三充值总在线</h5>
                    <h1>{{ data.threeDays }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>充值用户总在线</h5>
                    <h1>{{ data.totalPayin }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4" v-if="userlevel === 3">
                <el-card class="box-card">
                    <h5>金币池数值</h5>
                    <h1>{{ data.goldPool }}</h1>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>
<style>
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
        text-align: center;
    }
    .span {
        text-align: center;
        display:block;
    }
</style>
<script>
    import { ref, onMounted } from 'vue'
    import gt from '@/utils/GlobalMethod'
    import { getUser } from '@/utils/Cookies.js'
    export default {
        name: 'RealTimeData',
        setup() {
            const data = ref({});
            const userlevel = ref('');
            const getData = () => {
                gt.httpGet('/realtime_data', { type: 1 }).then(response => {
                    const result = response.data.result;
                    console.log('realtime_data result : ', result);
                    data.value.todaySession = result.todaySession;
                    data.value.todayActive = result.todayActive;
                    data.value.totalUsers = result.totalUsers;
                    data.value.totalRechargeUsers = result.totalRechargeUsers;
                    data.value.onlineMax = result.onlineMax;
                    data.value.newRegister = result.newRegister;
                    data.value.goldPool = result.goldPool;
                    data.value.game = result.online.game;
                    data.value.hall = result.online.hall;
                    data.value.online = result.online.game + result.online.hall;
                    data.value.threeDays = result.online.threeDays;
                    data.value.totalPayin = result.online.totalPayin
                })
            }
            onMounted(() => {
                userlevel.value = JSON.parse(getUser()).level;
                getData()
            })
            return {
                data,
                userlevel
            }
        }
    }
</script>