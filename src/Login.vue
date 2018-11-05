<template>
    <div class="login">
        <h2>12306后台管理系统</h2>
        <el-form :model="form">
            {{form}}
            <el-form-item label='用户名'>
                <el-input v-model='form.username'></el-input>
            </el-form-item>
            <el-form-item label='密码'>
                <el-input v-model='form.password' type="password"></el-input>
            </el-form-item>
        </el-form>
        <el-button @click='login()'> 登陆</el-button>
    </div>
</template>
<script>
import axios from '@/http/axios';
export default {
    data(){
        return{
            form:{}
        }
    },
    methods:{
        login(){
            axios.post('/login',this.form)
            .then((re)=>{
                console.log(re);
                
                if(re.staus==200&&re.data.message=='登陆成功'){
                    window.vm.currentComponent='App';
                    locationStorage.setItem('user',JSON.stringify(result.data))
                }
            })
            .catch(()=>{
                this.$notify.error({
                    title:'错误',
                    message:'网络异常'
                });
            });
        },
    },
}
</script>
<style>
    .login{
        width: 400px;
        margin: 0 auto;
    }
    .login>h2{
        text-align: center;
        margin-top: 200px;
        margin-bottom: 40px
    }
</style>

