<template>
    <div class="user">
        <div class="button">
            <el-button type="success">添加</el-button>
            <el-button type="info">全选</el-button>
            <el-button type="danger" >删除</el-button>
        </div>
        <div class="table">
          <el-table :data="users" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
          </el-table-column>
            <el-table-column
              fixed
              prop="id"
              label="id"
              width="70">
            </el-table-column>
            <el-table-column
              fixed 
              prop="regTime"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="username"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="国家"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="省份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="证件类型"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="身份证号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="手机号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="130">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
      }).then((result)=>{
          if(result.data.stauts == 200){
            this.$notify({
              title: '成功',
              message: result.data.message,
              type: 'success'
            });
            this.getdata();
          }
        }).then(()=>{
            this.$notify.success({
		          title: '成功',
		          message: '删除成功！'
            });
            this.stationd();
          }).catch(()=>{
            this.$notify.error({
		          title: '错误',
		          message: '删除失败！'
		        });
          });
      },
      //加载数据
      getdata(){
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
    },

    created(){
      this.getdata();
    },
    data() {
      return {
        ids:[],
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
