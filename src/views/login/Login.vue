<template>
    <section class="w3l-form-36">
        <div class="form-36-mian section-gap">
            <div class="wrapper">
                <div class="form-inner-cont">
                    <h3 class="chear_font">Login now</h3>
                    <el-form ref="login" :model="loginUser" :rules="loginRules" method="post" class="signin-form" id="form">
                        <el-form-item prop="username">
                            <div class="form-input">
                                <el-icon>
                                    <User style="width: 1em; height: 1em; margin-right: 8px; margin-top: 1px;"/>
                                </el-icon>
                                <el-input ref="username"
                                    v-model="loginUser.username"
                                    placeholder="Username"
                                    name="username"
                                    autocomplete="off"/>
                            </div>
                        </el-form-item>
                        <el-form-item prop="password">
                            <div class="form-input">
                                <el-icon>
                                    <key style="width: 1em; height: 1em; margin-right: 8px; margin-top: 1px;"/>
                                </el-icon>
                                <el-input ref="password"
                                    v-model="loginUser.password"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    autocomplete="off"/>
                            </div>
                        </el-form-item>
                        <el-checkbox v-show="isShowCheck" v-model="isCheck" @change="setEnvironment">测试环境</el-checkbox>
                        <div class="login-remember d-grid">
                            <label class="check-remaind">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                                <p class="remember">Remember me</p>
                            </label>    
                            <button class="btn theme-button" @click.prevent="handleLogin">Login</button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>

<script type = "text/javascript">
    import { User, Key } from '@element-plus/icons'
    import { setToken, setUser } from '@/utils/Cookies'
    import gt from '@/utils/GlobalMethod'
    import { ref } from 'vue'
    import router from '@/router/index.js';
    export default {
        name: 'Login',
        components: {
            User,
            Key,
        },
        setup (props) {
            const loginUser = ref({
                username: '',
                password: ''
            });
            const login = ref(null)
            const isShowCheck = process.env.NODE_ENV !== 'production' ? false : true;
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('username不能为空'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('password能小于6位'))
                } else {
                    callback()
                }
            }
            const loginRules = {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            }
            const isCheck = false;
            const updateProUrl = () => {
                if (process.env.NODE_ENV === 'production') {
                    if (this.isCheck) {
                        setProUrl('http://172.30.177.43:3003');
                    } else {
                        setProUrl('http://bg.rosewayserver.com:3003');
                    }
                } else {
                    setProUrl(process.env.VUE_APP_REQUEST_URL);
                }
            };
            const setEnvironment = () => {
                updateProUrl();
            };
            const handleLogin = () => {
                const params = loginUser.value;
                gt.httpPost('/login', params).then(response => {
                    console.log('login response.data : ', response);
                    const { token, user } = response.data;
                    if (token) {
                        setToken(token);
                        // 此处保存user信息必须转json字符串保存，否则读取时解析不出来
                        setUser(JSON.stringify(user));
                        router.push({ name: 'Layout', params: {} });
                    } else {
                        alert(response.data.msg)
                    }
                })
            }
            return {
                login,
                loginRules,
                isCheck,
                setEnvironment,
                isShowCheck,
                handleLogin,
                loginUser
            }
        }
    }
</script>

<style>
    .el-form-item {
        margin-bottom: 0
    }
    .form-36-mian {
      background-size: cover;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(255, 255, 255, 0)), url(@/../static/img/women.jpg);
      background-attachment: fixed;
      min-height: 100vh;
      display: grid;
      align-items: center;
      padding: 2rem 0;
    }
    .form-input {
        margin-top: 30px;
    }
</style>
