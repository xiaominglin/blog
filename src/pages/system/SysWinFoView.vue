<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="网站信息" name="first">
        <el-row>
            <el-col :span="16">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="网站名称" prop="site_name">
                        <el-input v-model="ruleForm.site_name"></el-input>
                    </el-form-item>
                    <el-form-item label="公网安备" prop="site_gwa">
                        <el-input v-model="ruleForm.site_gwa"></el-input>
                    </el-form-item>
                    <el-form-item label="统计代码" prop="site_analytics">
                        <el-input type="textarea" v-model="ruleForm.site_analytics"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="SEO设置" name="second">
        <el-row>
            <el-col :span="16">
                <el-form :model="seoRuleForm" :rules="seoRuleForm" ref="seoRuleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="SEO标题" prop="site_seo_title">
                        <el-input v-model="seoRuleForm.site_seo_title"></el-input>
                    </el-form-item>
                    <el-form-item label="SEO关键字" prop="site_seo_keywords">
                        <el-input v-model="seoRuleForm.site_seo_keywords"></el-input>
                    </el-form-item>
                    <el-form-item label="SEO描述" prop="site_seo_description">
                        <el-input type="textarea" v-model="seoRuleForm.site_seo_description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitFormSet('seoRuleForm')">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="用户注册设置" name="third">
         用户注册设置
    </el-tab-pane>
        <el-tab-pane label="用户注册设置" name="four">
         CDN设置
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        ruleForm: {
          site_name: '',
          site_gwa: '',
          site_analytics: ''
        },
        seoRuleForm: {
          site_seo_title: '',
          site_seo_keywords: '',
          site_seo_description: ''
        },
        rules: {
          site_name: [
            { required: true, message: '请输入站点名称', trigger: 'blur' },
            { min: 3, message: '长度至少3个字符', trigger: 'blur' }
          ],
          site_gwa: [
            { required: true, message: '公网安备', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$store.dispatch('doWebInfo', this.ruleForm).then(() => {
                     this.$message.success("修改成功"); 
                }).catch(err => {
                     this.$message.error(err); 
                });
          } else {
            return false;
          }
        });
      },
      submitFormSet(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                this.$store.dispatch('doWebInfo', this.seoRuleForm).then(() => {
                    const init = this.$store.state.sys;
                    let that = this;
                    that.ruleForm.site_name = init.site_name; 
                    that.ruleForm.site_gwa = init.site_gwa; 
                    that.ruleForm.site_analytics = init.site_analytics; 
                    that.seoRuleForm.site_seo_title = init.site_seo_title; 
                    that.seoRuleForm.site_seo_keywords = init.site_seo_keywords; 
                    that.seoRuleForm.site_seo_description = init.site_seo_description; 
                     this.$message.success("修改成功"); 
                }).catch(err => {
                     this.$message.error(err); 
                });
          } else {
            return false;
          }
        });
      }
    },
    created () {
           this.$store.dispatch('winFoData').then(() => {
               const init = this.$store.state.sys;
               let that = this;
               that.ruleForm.site_name = init.site_name; 
               that.ruleForm.site_gwa = init.site_gwa; 
               that.ruleForm.site_analytics = init.site_analytics; 
               that.seoRuleForm.site_seo_title = init.site_seo_title; 
               that.seoRuleForm.site_seo_keywords = init.site_seo_keywords; 
               that.seoRuleForm.site_seo_description = init.site_seo_description; 
            }).catch(err => {
                this.$message.error(err); //返回失败提示错误
            });  
      }
  };
</script>