<!--左侧边栏-->
<template>
    <el-aside width="260px">
        <!-- :default-openeds="['0']" 默认打开的标签 -->
        <el-menu :default-openeds="['0']" :default-active="$route.path" router>
            <a class="sidebar-brand" href="">
                <span class="align-middle">后台管理系统</span>
            </a>
            <el-sub-menu v-for="(item, inx) in MenuList" :index="getIndex(inx)" :key="inx">
                <template #title>
                    <i class="el-icon-s-data icon-deit"></i>
                    <span class="sidebar-header">{{item.name}}</span>
                </template>
                <template v-if="item.isSub">
                    <el-sub-menu v-for="(subItem, subInx) in item.list" :key="subInx" :index="subItem.name">
                        <template #title><i class="el-icon-s-operation"></i><span class="sidebar-header">{{ subItem.name }}</span></template>
                        <el-menu-item v-for="(child, childInx) in subItem.items" :key="childInx" :index="child.root">
                            <i class="el-icon-right"></i>
                            {{ child.name }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item v-for="(subItem, subInx) in item.list" :key="subInx" :index="subItem.root">
                        <i class="el-icon-right"></i>
                        {{ subItem.name }}
                    </el-menu-item>
                </template>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>

<style>
    .el-aside, .el-sub-menu, .el-menu-item {
        background-color: rgb(34, 46, 60) !important;
    }
    .el-menu {
        background-color: rgb(34, 46, 60) !important;
    }
    .el-menu-item {
        color: rgba(255, 255, 255, 0.7) !important;
    }
    .el-menu-item.is-active {
        color: rgba(64, 158, 255, 0.8) !important;
    }
    .sidebar-brand {
        font-weight: 600;
        font-size: 1.15rem;
        padding: 1.15rem 1.5rem;
        display: block;
        color: #f8f9fa;
    }
    .sidebar-header {
        padding: 1.5rem 1.5rem .375rem;
        font-size: .85rem;
        color: #ced4da
        
    }
    .align-middle {
        vertical-align: middle!important
    }
</style>

<script>
import { getUser } from '@/utils/Cookies.js'
import { ref } from 'vue'
export default {
    setup() {
        let userlevel = ref(1);
        let userName = ref('');
        let MenuList = ref([]);
        const Menus = [
            {
                name: '游戏数据总览', isSub: false,
                list: [
                    { root: '/realtime_data',           name: '实时数据' },
                    { root: '/realtime_session',        name: '实时数据-场次' },
                    { root: '/realtime_room',           name: '实时数据-房间' },
                    { root: '/important_data',          name: '关键数据' },
                    { root: '/recharge_data',           name: '历史数据' },
                    { root: '/active_data',             name: '用户来源' },
                    { root: '/gold_query',              name: '金币变化' },
                    { root: '/session_data',            name: '场次总览' },
                    { root: '/session_pump',            name: '场次抽水' },
                    { root: '/play_game_data',          name: '对局数据' },
                    { root: '/user_gold_charts',        name: '用户金币图表' },
                    { root: '/session_charts',          name: '用户场次图表' },
                    { root: '/online_recharge_charts',  name: '在线&充值图表' },
                    { root: '/online_time',             name: '在线时长' },
                    { root: '/user_keep',               name: '留存数据' },
                    { root: '/new_register_charts',     name: '新用户注册' },
                    { root: '/package_data',            name: '分包数据' },
                    { root: '/user_lose_gold',          name: '用户流失金币' },
                    { root: '/event_data',              name: '事件数据' },
                    // { root: '/dot_data',                name: '打点数据' },     用于测试AF数据对不上，自己记录的打点，现阶段可以去掉了
                    { root: '/pc_info_charts',          name: '性能监控' },
                ]
            },
            {
                name: '用户管理', isSub: false,
                list: [
                    { root: '/user_data',               name: '用户数据' },
                    { root: '/user_gears',              name: '档位输赢' },
                    { root: '/gm_user_read',            name: '用户管理' },
                    { root: '/otp_query',               name: '验证码查询' },
                    { root: '/active_user_sift',        name: '排行榜' },
                    { root: '/reject_list',             name: '个人排斥列表' },
                    { root: '/reject_list_person',      name: '全部排斥列表' },
                    { root: '/prevent_tactics',         name: '防刷策略' },
                    { root: '/kyc_manage',              name: 'KYC管理' },
                    { root: '/invite_query',            name: '邀请返利查询' },
                    { root: '/gold_surplus',            name: '金币结余' },
                    { root: '/bottom_pour',             name: '场次注数' },
                ]
            },
            {
                name: '邮件系统', isSub: false,
                list: [
                    {root: '/mail_system',               name: '系统'},
                    {root: '/mail_user',                 name: '用户'},
                    {root: '/mail_cancel',               name: '取消'},
                    {root: '/mail_recharge_success',     name: '充值模板(成功)'},
                    {root: '/mail_recharge_fail',        name: '充值模板(失败)'},
                ]
            },
            {
                name: '活动管理', isSub: true,
                list: [
                    { 
                        name: '活动统计',
                        items: [
                            {root: '/activity_limit_data',       name: '限时活动'},
                            {root: '/go_broke_data',             name: '破产活动'},
                            {root: '/new_user_recharge_data',    name: '新用户充值'},
                            {root: '/invite_statistics',         name: '邀请活动统计'},
                            {root: '/invite_activity_query',     name: '邀请活动查询'},
                            {root: '/research_result',           name: '调研结果统计'},
                            {root: '/box_data',                  name: '每日宝箱统计'},
                        ]
                    },
                    { 
                        name: '活动配置',
                        items: [
                            {root: '/activity_limit',            name: '限时活动'},
                            {root: '/activity_broke',            name: '破产活动'},
                            {root: '/new_user_recharge',         name: '新用户充值'},
                            {root: '/activity_invite',           name: '邀请活动'},
                            {root: '/research_activity_config',  name: '调研活动'},
                            {root: '/research_open_time',        name: '调研活动开启时间'},
                            {root: '/activity_box',              name: '宝箱活动配置'},
                        ]
                    },
                ]
            },
            {
                name: '流水数据', isSub: false,
                list: [
                    { root: '/recharge_query',          name: '充值查询' },
                    { root: '/create_order',            name: '创建订单' },
                    { root: '/recharge_statistics',     name: '充值统计' },
                    { root: '/withdraw_manage',         name: '提现管理' },
                    { root: '/shop_order_status',       name: '订单状态查询'},
                ]
            },
            {
                name: '系统配置', isSub: false,
                list: [
                    { root: '/gm_marquee',              name: '跑马灯'},
                    { root: '/gm_marquee_game',         name: '跑马灯(游戏)' },
                ]
            },
            {
                name: '服务器配置', isSub: true,
                list: [
                    {
                        name: '场次配置', items: [
                        {root: '/session_rummy',             name: 'Rummy'},
                        {root: '/session_rummy_2p',          name: 'Rummy(2人)'},
                        {root: '/session_teenpatti',         name: 'TeenPatti'},
                        {root: '/session_teenpatti_speed',   name: 'TeenPatti(speed)'},
                        {root: '/session_practice',          name: 'Practice'},
                        {root: '/session_ak47',              name: 'AK47'},
                        {root: '/session_lowest_joker',      name: 'LowestJoker'},
                        {root: '/session_highest_joker',     name: 'HighestJoker'},
                        {root: '/session_dragon_tiger',      name: '龙虎斗'},
                        {root: '/session_andar_bahar',       name: 'AndarBahar'},
                    ]},
                    {
                        name: 'AI配置', items: [
                        {root: '/ai_rummy',                  name: 'Rummy控牌'},
                        {root: '/ai_rummy_robot',            name: 'Rummy(Robot)控牌'},
                        {root: '/ai_rummy2user',             name: 'Rummy2user控牌'},
                        {root: '/ai_rummy2user_robot',       name: 'Rummy2user(Rob)控牌'},
                        {root: '/ai_teenpatti',              name: 'TeenPatti控牌'},
                        {root: '/ai_teenpatti_new',          name: 'TeenPatti控牌新(9-9)'},
                        {root: '/ai_quicktp_new',            name: '快速TP控牌新(9-9)'},
                        {root: '/ai_ak47_new',               name: 'AK47控牌新(9-9)'},
                        {root: '/ai_tp_recharge',            name: 'TP充值玩家控牌'},
                        {root: '/ai_ak47',                   name: 'AK47控牌'},
                        {root: '/ai_lowest_joker',           name: 'LowestJoker控牌'},
                        {root: '/ai_highest_joker',          name: 'HighestJoker控牌'},
                        {root: '/ai_andar_bahar',            name: 'AndarBahar控牌'},
                        {root: '/ai_switch',                 name: '控牌开关'},
                        {root: '/ai_filling',                name: '机器人补位'},
                        {root: '/ai_filling_tp',             name: 'TP机器人补位'},
                        {root: '/ai_filling_tp2',            name: 'TP机器人补位2'},
                        {root: '/ai_filling_ab',             name: 'AB机器人补位'},
                        {root: '/ai_session_limit',          name: '场次额度'},
                        {root: '/ai_trigger_config',         name: '触发配置'},
                        {root: '/ai_trigger_config_r',       name: '充值玩家触发配置'},
                        {root: '/ai_event_config',           name: '事件配置'},
                        {root: '/ai_operation_config',       name: '操作配置'},
                        // {root: '/ai_recharge_card_config',   name: '充值事件牌型概率'},
                        {root: '/ai_dt_putin_config',        name: '龙虎斗投放配置'},
                        {root: '/ai_dt_bet_config',          name: '龙虎斗下注配置'},
                    ]},
                    {
                        name: '活动配置', items: [
                        {root: '/activity_login',            name: '签到活动'},
                        {root: '/activity_turntable',        name: '转盘活动'},
                        {root: '/activity_newusergive',      name: '新用户赠送'},
                        // {root: '/activity_limit',            name: '限时活动'},
                        {root: '/activity_first',            name: '首充活动'},
                        {root: '/bulletin_board',            name: '宣传栏配置'},
                        {root: '/activity_show',             name: '活动显示配置'},
                        {root: '/weeks_card',                name: '周卡配置'},
                        {root: '/months_card',               name: '月卡配置'},
                        {root: '/balance_pop_up',            name: '余额弹窗'},
                        {root: '/game_button_conf',          name: '玩法按钮配置'},
                        // {root: '/new_user_recharge',         name: '新用户充值'},
                    ]},
                    {
                        name: '商城配置', items: [
                        {root: '/shop_bmart_config',         name: 'BMart配置'},
                        {root: '/shop_funzone_config',       name: 'Funzone配置'},
                        {root: '/shop_serpay_config',        name: 'Serpay配置'},
                        {root: '/shop_paytm_config',         name: 'Paytm配置'},
                        {root: '/shop_payu_config',          name: 'Payu配置'},
                        {root: '/shop_xpay_config',          name: 'XPay配置'},
                        {root: '/shop_list',                 name: '商品列表'},
                        {root: '/shop_payway_config',        name: 'Payway配置'},
                        {root: '/white_list_config',         name: '白名单配置'},
                    ]},
                    {
                        name: '提现配置', items: [
                        {root: '/withdraw_game',             name: '游戏提现'},
                        {root: '/withdraw_payout',           name: 'Payout'},
                    ]},
                    {
                        name: '审核配置', items: [
                        {root: '/check_config',             name: '审核配置'},
                    ]},
                    {
                        name: '客服配置', items: [
                        {root: '/system_config',            name: '系统配置'},
                    ]},
                    {
                        name: '定义配置', items: [
                        {root: '/game_player',               name: '玩家定义'},
                        {root: '/card_type',                 name: '牌型定义'},
                        {root: '/recharge_and_rank',         name: '提充及充值档位定义'},
                        {root: '/recharge_and_weight',       name: '充提比权重配置'},
                        {root: '/small_win_config',          name: '充值用户保护配置'},
                        {root: '/gold_pool_config',          name: '金币池配置'},
                        {root: '/gold_pool_add',             name: '金币池增加概率'},
                    ]},
                    {
                        name: 'OTP配置', items: [
                        {root: '/otp_config',                name: '渠道配置'},
                        {root: '/tem_config',                name: '模板配置'},
                    ]},
                    {
                        name: 'GM', items: [
                        {root: '/gm_user',                   name: '用户'},
                        {root: '/black_list',                name: '黑名单'},
                        {root: '/gm_update',                 name: '更新配置'},
                        {root: '/gm_recharge',               name: '充值回调'},
                        {root: '/gm_payout',                 name: '提现回调'},
                        {root: '/server_list',              name: '服务器列表' },
                    ]},
                    {
                        name: '渠道配置', items: [
                        {root: '/channel_package',           name: '渠道包'},
                    ]},
                ]
            },
            {
                name: '日志', isSub: false, list: [ {root: '/log_operation',     name: '操作日志'} ] 
            },
        ]
        // userlevel.value = JSON.parse(getUser()).level;
        // userName.value = JSON.parse(getUser()).userName;
        // if (userlevel === 5) {
        //     userlevel = 9;
        // }
        // if (userlevel === 1) {
        //     Menus[0].list = Menus[0].list.splice(0, 3)
        //     MenuList.push(Menus[0])
        // } else if (userlevel === 2) {
        //     MenuList = Menus.splice(0, 6);
        //     for (let i = 0; i < MenuList.length; i++) {
        //         const item = MenuList[i];
        //         if (item.name === '游戏数据总览') {
        //             if (userName === 'phil' || userName === 'sonia') {
        //                 item.list = item.list.splice(0, 16);
        //             } else {
        //                 item.list = item.list.splice(0, 15);
        //             }
        //         }
        //         if (item.name === '用户管理') {
        //             item.list = item.list.splice(0, 8);
        //         }
        //         if (userName !== 'anjum' && item.name === '流水数据') {
        //             item.list.splice(1,1);
        //         }
        //     }
        // } else {
            MenuList.value = Menus;
        // }
        const getIndex = (index) => {
            return `${index}`;
        }
        return {
            userlevel,
            userName,
            MenuList,
            getIndex
        }
    },
}
</script>
<style>
    .icon-deit {
        left: 10px;
        margin-right: 20px;
    }
</style>
