<template>
    <div class="user">
        <div class="bottom">
            <el-button type="success" @click='totianjia()'>添加</el-button>
            <el-button type="danger" @click='idsdelect()'>删除</el-button>
        </div>
        <div class="table">
          <el-table :data="station" border style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection" width="55">
          </el-table-column>
            <el-table-column
              fixed
              prop="id"
              label="id"
              width="70">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名字"
              width="120">
            </el-table-column>
            <el-table-column
              prop="parent.name"
              label="父"
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
              fixed="right"
              label="操作"
              width="130">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toupdate(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click='delectstation(scope.row.id)'>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 模态框 -->
        <div class="mo">
            <el-dialog title="栏目" :visible.sync="dialogFormVisible" height>
              <el-form :model="form">
                <el-form-item label="栏目名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="父栏目" :label-width="formLabelWidth">
                  <el-select v-model="form.parentId" filterable placeholder="一级栏目">
                    <el-option v-for='c in station' :key='c.id' :label="c.name" :value="c.id" ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="概述" :label-width="formLabelWidth">
                  <el-input v-model="form.comment" type="textarea" ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closemo()">取 消</el-button>
                <el-button type="primary" @click="modfiydata()">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import axios from '@/http/axios';
export default {
    data(){
      return{
        station:[],
        multipleSelection:[],
        dialogFormVisible:false,
        form:{},
        formLabelWidth:'120px',
      }  
    },
    methods:{
      handleSelectionChange(val){
				this.multipleSelection = val;
      },
      //全选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      //修改
      modfiydata(){
				axios.post('/manager/category/saveOrUpdateCategory',this.form)
				.then(()=>{
					this.$notify.success({
	          title: '成功',
	          message: '提交成功！'
	        });
	        this.closemo();
	        this.stationd();
				})
				.catch((e)=>{
					this.$notify.error({
	          title: '错误',
	          message: '提交失败！'
	        });
				});
        this.dialogFormVisible = false;
      },
      //打开
      toupdate(row){
				row.parentId = row.parent.id;
        this.form=row;
        this.dialogFormVisible = true;
      },
      //添加
      totianjia(){
        this.dialogFormVisible = true;
      },
      //关闭
      closemo(){
        this.form = {};
        this.dialogFormVisible = false;
      },
      //单个删除
      delectstation(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{ 
          axios.get('/manager/category/deleteCategoryById?id='+id)
          .then(()=>{
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
        })
      },
      //批量删除
      idsdelect(){
       	this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=this.multipleSelection.map((item)=>{
            return item.id;
          });
          if(ids[0]==undefined){
            this.$notify.error({
		          title: '错误',
		          message: '请选择删除项'
		        });
          }else{
              axios.post('/manager/category/batchDeleteCategory',{ids})
            .then(()=>{
              this.$notify.success({
                title: '成功',
                message: '删除成功！'
              });
              this.stationd();
            })
            .catch(()=>{
              this.$notify.error({
                title: '错误',
                message: '删除失败！'
              });
            });
          }
        })
      },
        //加载数据
      stationd(){
          axios.get('/manager/category/findAllCategory')
            .then((result)=>{
              this.station=result.data.data;
            })
            .catch(()=>{
                this.$notify.error({
                    title:'错误',
                    message:'网络异常！'
                });
            })
      },
    },
    created(){
      this.stationd();
    }
}
</script>

