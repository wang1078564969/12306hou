<template>
  <div class="user">
    <div class="button">
      <el-button type="success" @click='adduser()'>添加</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <div class="table">
      <el-table :data="users"  @selection-change="handleSelectionChange" height="800">
        <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="70"
            sortable>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="真实姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="email"
              abel="电子邮箱"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-button @click="openuser(scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
        <!-- 模态框 -->
    <div class="mo">
          <el-dialog title="栏目" :visible.sync="dialogFormVisible" height>
            <el-form :model="formuser">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="formuser.username" lazy></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="formuser.password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth">
                  <el-input v-model="formuser.nickname"></el-input>
                </el-form-item>
                <el-form-item label="email" :label-width="formLabelWidth">
                  <el-input v-model="formuser.email"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closemo()">取 消</el-button>
                <el-button type="primary" @click="updatauser()">确 定</el-button>
              </div>
          </el-dialog>
        </div>
  </div>
</template>

<script>
	import axios from '@/http/axios';
  export default {
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.ids=this.multipleSelection.map((item)=>{
          return item.id;
        });
      },
      //单个删除
      deleteUser(id){
        axios.get('/manager/user/deleteUserById', {
        params: {
          id:id
        }
      }).then(()=>{
            this.$notify.success({
		          title: '成功',
		          message: '删除成功！'
            });
            this.getuser();
          }).catch(()=>{
            this.$notify.error({
		          title: '错误',
		          message: '删除失败！'
		        });
          });
      },
      //加载数据
      getuser(){
        axios.get('/manager/user/findAllUser')
        .then((result)=>{
          this.users = result.data.data;
        }).catch(()=>{
					this.$notify.error({
	          title: '错误',
	          message: '网络异常！'
	        });
				})
      },
      //用户信息
      updatauser(){
        axios.post('/manager/user/saveOrUpdateUser',this.formuser)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: '提交成功！'
          });
            this.getuser();
            this.closemo();
          }).catch((err) => {
            this.$notify.error({
              title: '错误',
              message: '删除失败！'
            });
          });
      },
      //添加
      adduser(){
        this.dialogFormVisible = true;
      },
      //修改
      openuser(row){
        this.formuser=row;
        this.dialogFormVisible = true;
      },
      //关闭
      closemo(){
        this.form = {};
        this.dialogFormVisible = false;
      },
    },
    created(){
      this.getuser();
    },
    data() {
      return {
        dialogFormVisible:false,
        formuser:{},
        formLabelWidth:'120px',
        users: [],
        multipleSelection:[]
      }
    }
  }
</script>
<style>
    .table{
        margin: 10px 0 0 0;
    }
</style>
