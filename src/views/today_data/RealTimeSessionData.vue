<template>
    <el-card class="box-card">
        <el-row :gutter="20">
            <h3><strong>实时数据(今日-场次)</strong></h3>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>Rummy场次</h5>
                    <h1>{{ data.rummy }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>Rummy 2人场次</h5>
                    <h1>{{ data.rummy2User }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>TeenPatti场次</h5>
                    <h1>{{ data.teenpatti }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>TeenPatti Speed场次</h5>
                    <h1>{{ data.teenpattiSpeed }}</h1>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>AK47场次</h5>
                    <h1>{{ data.ak47 }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>LowestJoker场次</h5>
                    <h1>{{ data.lowJoker }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>HighestJoker场次</h5>
                    <h1>{{ data.highJoker }}</h1>
                </el-card>
            </el-col>
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>AndarBahar场次</h5>
                    <h1>{{ data.andarBahar }}</h1>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-card class="box-card">
                    <h5>龙虎斗场次</h5>
                    <h1>{{ data.dragonTiger }}</h1>
                </el-card>
            </el-col>
             <el-col :span="4">
                <el-card class="box-card">
                    <h5>总场次</h5>
                    <h1>{{ data.total }}</h1>
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
    // import EventBus from '@/utils/EventBus.js'
    import { ref, onMounted } from 'vue'
    import gt from '@/utils/GlobalMethod'
    export default {
        name: 'RealtimeSession',
        setup() {
            const data = ref({
                rummy: 0, 
                teenpatti: 0,
                rummy2User: 0,
                teenpattiSpeed: 0,
                ak47: 0,
                lowJoker: 0,
                highJoker: 0,
                andarBahar: 0,
                dragonTiger: 0,
                total: 0
            });
            const getData = () => {
                gt.httpGet('/realtime_data', { type: 2 }).then(response => {
                    const result = response.data.result;
                    console.log('realtime_data result : ', result);
                    data.value.rummy = result.Rummy;
                    data.value.rummy2User = result.Rummy2User;
                    data.value.teenpatti = result.TeenPatti;
                    data.value.teenpattiSpeed = result.QuickTP;
                    data.value.ak47 = result.Ak47;
                    data.value.lowJoker = result.LowJoker;
                    data.value.highJoker = result.HighJoker;
                    data.value.andarBahar = result.AndarBahar;
                    data.value.dragonTiger = result.BigBattle;
                    data.value.total = result.Total;
                })
            }
            onMounted(() => {
                getData()
            });
            return {
                data
            }
        }
    }
</script>