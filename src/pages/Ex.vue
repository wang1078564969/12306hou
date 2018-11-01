<template>
    <div class="ex">
        <div class="nav">
            <div class="select">
                <el-button type="success" @click='addex()'>添加</el-button>
                <el-select v-model="params.categoryId" clearable filterable placeholder="请选择">
                    <el-option
                    v-for="item in this.category"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="input">
                <el-input placeholder="请输入内容" v-model="params.keywords" clearable ></el-input>
            </div>
        </div>
        <div class="content">
            <div class="table">
                <el-table
                    :data="allex.list"
                    style="width: 100%"
                    :default-sort = "{prop: 'id', order: 'descending'}">
                    <el-table-column
                    prop="id"
                    label="id"
                    sortable
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="publishtime"
                    label="日期"
                    sortable
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="title"
                    label="姓名"
                    sortable
                    width="180">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="130">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="toupdateex(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click='delectex(scope.row.id)'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="5"
                    layout="prev, pager, next, jumper"
                    :total="100">
                </el-pagination>
            </div>
        </div>
        <div class="model">
            <el-dialog title="文章管理" :visible.sync="visible" fullscreen>
            <el-form :model="formex">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="formex.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="formex.liststyle" placeholder="请选择活动区域">
                    <el-option label="区域一" value="style-one"></el-option>
                    <el-option label="区域二" value="style-two"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="nomodel">取 消</el-button>
                <el-button type="primary" @click="poshupdate()">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import axios from '@/http/axios'
export default {
    data(){
        return{
            formLabelWidth:'120px',
            visible:false,
            allex:[],
            toinput:[],
            category:[],
            formex:{},
            params:{
                page:0,
                pageSize:10
            }
        }
    },
    methods:{
        //翻页
        handleSizeChange(val) {
            this.params.pageSize=val-1;
            this.getex();
        },
        handleCurrentChange(val) {
            this.params.page=val-1;
            this.getex();
        },
        //修改
        toupdateex(row){

            row.categoryId=row.category.id;
            this.formex=row;
            this.visible = true;
        },
        //添加
        addex(){
            this.visible = true;
        },
        //关闭mo
        nomodel(){
            this.formex={};
            this.visible = false;
        },
        //添加
        poshupdate(){
            axios.posh('/manager/article/saveOrUpdateArticle',this.formex)
            .then(() => {
                this.$notify.success({
                    title: '成功',
                    message: '提交成功！'
                });
                this.getex;
                this.nomodel;
            }).catch((err) => {
                this.$notify.error({
                    title: '错误',
                    message: '删除失败！'
              });
            });
        },
        //单个删除
        delectex(id){
            axios.get('/manager/article/deleteArticleById='+id).then(() => {
                this.$notify.s
            }).then(()=>{
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
        },
        //加载数据
        getcategory(){
            axios.get('/manager/category/findAllCategory')
            .then((result) => {
                this.category=result.data.data;
            }).catch(() => {
                this.$notify.error({
                    title:'错误',
                    message:'网络异常！'
                });
            });
        },
        getex(){
            axios.get('/manager/article/findArticle',{
                params:this.params
            }).then((result) => {
                this.allex=result.data.data;
            }).catch((err) => {
                this.$notify.error({
                    title:'错误',
                    message:'网络异常！'
                });
            });
        }
    },
    watch:{
        params:{
            handler:function(){
				this.getex();
            },
            deep:true
        }
    },
    created(){
        this.getex();
        this.getcategory()
    }
}
</script>
<style>
    .nav>div{
        float: left;
        margin-left:8px;
    }
</style>
