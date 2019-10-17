<template>
  <div class="login">
      <div class="middle-wrapper">
          <div class="title-wrapper">
              <div class="title">
                VUE-ADMIN 后台管理系统
              </div>
          </div>
          <div class="login-form">
            <el-form :model="form" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入账号">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        <i slot="prefix" class="el-input__icon el-icon-adm-user" style="font-size: 18px;"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        <i slot="prefix" class="el-input__icon el-icon-adm-password" style="font-size: 18px;"></i>
                        <i slot="suffix" class="el-input__icon el-icon-view" style="cursor: pointer;"
                        @click="_togglePasswordType"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="yanzhengma">
                    <div class="check-code-wrapper">
                    <div class="yanzhengma-wrapper">
                        <el-input v-model="form.yanzhengma" placeholder="请输入验证码">
                        <i slot="prefix" class="el-input__icon el-icon-adm-vertification" style="font-size: 18px;"></i>
                        </el-input>
                    </div>
                    <div class="validate-code-wrapper">
                        <validate-code ref="validate-code" @change="_setCheckCode"></validate-code>
                    </div>
                    </div>
                </el-form-item>
                <el-form-item style="margin-bottom: 0;">
                  <el-row>
                    <el-col :span="14">
                      <el-checkbox v-model="checked">记住账号</el-checkbox>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item>
                          <el-button
                          type="primary"
                          class="login-btn"
                          style="width: 100%;"
                          @click="loginHandle('loginForm')">
                          登陆系统
                          </el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
            </el-form>
          </div>
      </div>
  </div>
</template>
<script>
  import validateCode from '../../components/ValidateCode/index'
  export default {
      components: {
        validateCode
      },
      data () {
          // var checkYanzhengma = (rule, value, callback) => {
          // value = value.toUpperCase();
          //   if (value === '') {
          //     callback(new Error('请输入验证码'));
          //   } else if (value !== this.checkCode) {
          //     callback(new Error('验证码错误'));
          //     this.$refs['validate-code'].draw();
          //   } else {
          //     callback();
          //   }
          // };
          return {
            passwordType: 'password',
            checkCode: '',
            checked: false,
            form: {
              username: '',
              password: '',
              yanzhengma: ''
            },
            rules: {
              username: [
                { required: true, message: '账号不能为空', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
              ],
              // yanzhengma: [
              //   { validator: checkYanzhengma, trigger: 'blur' }
              // ]
            }
          }
      },
      methods: {
          _togglePasswordType() {
              this.passwordType == 'password' ? this.passwordType = '' : this.passwordType = 'password'
          },
          _setCheckCode (value) {
            this.checkCode = value; 
          },
          loginHandle(loginForm) {
            this.$refs[loginForm].validate(valid => {
                if (valid) {
                  this.$store.dispatch('login', this.form).then(() => {
                    this.$router.push({ path: '/home' }); //登录成功之后重定向到首页
                  }).catch(err => {
                    this.$message.error(err); //登录失败提示错误
                  });
                }else{
                  return false;
                }
            });
          }
      }
  }
</script>
<style lang="scss" scoped>
  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(32, 160, 255);

    .middle-wrapper {
      position: fixed;
      width: 100%;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-60%);

      .title-wrapper {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
      }
      .login-form {
        position: relative;
        margin: 0 auto;
        width: 520px;
        padding: 30px 50px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #ffffff;

        .el-row {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          .login-btn {
            width: 100%;
          }
        }

        .check-code-wrapper {
          display: flex;
          justify-content: space-between;
          height: 40px;

          .yanzhengma-wrapper {
            flex: 0 1 auto;
          }

          .validate-code-wrapper {
            flex: 0 0 160px;
          }
        }
      }
    }
  }
</style>
