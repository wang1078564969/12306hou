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
                <el-select v-model="params.pageSize" filterable placeholder="请选择">
                    <el-option
                    v-for="item in 10"
                    :key="item"
                    :label="item"
                    :value="item">
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
                 height="800"
                    :data="allex.list"
                    >
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
                    @current-change="handleCurrentChange"
                    :page-size='this.params.pageSize'
                    layout="prev, pager, next, jumper"
                    :total="this.allex.total">
                </el-pagination>
            </div>
        </div>
        <div class="model">
            <el-dialog title="文章管理" :visible.sync="visible" fullscreen>
            <el-form :model="formex">
                {{formex}}
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="formex.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="栏目" :label-width="formLabelWidth">
                    <el-select v-model="formex.categoryId" placeholder="请选择活动区域">
                        <el-option :key='c.id' v-for='c in category' :label="c.name" :value="c.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="formex.liststyle" placeholder="请选择活动区域">
                        <el-option label="区域一" value="style-one"></el-option>
                        <el-option label="区域二" value="style-two"></el-option>
                    </el-select>
                </el-form-item>
                <el-upload
                  class="upload-demo"
                  action="http://47.107.71.18:8099/manager/file/upload"
                    :on-success='handleUploadSuccess'
                    :file-list='fileList'
                    :on-remove='handleFileRemove'
                  list-type="picture">
                  <el-button size="small" type="text">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                <el-form-item><mavon-editor  ref='de' v-model="formex.content"/></el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="nomodel()">取 消</el-button>
                <el-button type="primary" @click="pupdate()">确 定</el-button>
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
            fileList:[],
            formLabelWidth:'120px',
            visible:false,
            allex:[],
            category:[],
            formex:{
                liststyle:'style-one',
				fileIds:[],
            },
            params:{
                page:0,
                pageSize:10
            }
        }
    },
    methods:{
        //翻页
        handleCurrentChange(val) {
            this.params.page=val-1;
            this.getex();
        },
        //修改  
        toupdateex(row){
            //克隆当前数据
            let article = _.clone(row);
            article.categoryId = article.category.id;
            delete article.category;
            //默认显示
            this.fileList=article.articleFileVMs.map((item)=>{
                return{
                    name:item.cmsFile.id,
					url:'http://39.108.81.60:8888/group1/'+item.cmsFile.id
                }
            })
            	article.fileIds = article.articleFileVMs.map(item=>item.cmsFile.id);
				delete article.articleFileVMs;
				// 4.2 依赖文件 articleFileVMs -> fileIds1·a
				// 4.3 取消默认空值
				for(let key in article){
					let val = article[key]
					if(!val){
						delete article[key];
					}
				}
            this.formex=article;
            this.visible = true;
        },
        //添加
        addex(){
            this.fileList=[];
            this.formex={
                liststyle:'style-one',
				fileIds:[],
            },
            this.visible = true;
        },
        //关闭mo
        nomodel(){
            this.visible = false;
        },
        handleFileRemove(file){
             //1. 通过id删除附件         
            axios.get('/manager/file/delete',{
                params:{
                    id:file.name
                }
            })
            .then(()=>{
                this.$notify.success({
                    title: '成功',
                    message: '删除成功！'
                });
                //2. 从fileIds中挪出
                _.remove(this.formex.fileIds,(id)=>{
                    return id == file.name
                })
                this.formex.fileIds.push(1);
                this.formex.fileIds.pop();
            })
            .catch(()=>{
                this.$notify.error({
                    title: '错误',
                    message: '删除失败！'
                });
            });
        },
        handleUploadSuccess(response, file, fileList){
            file.name = response.data.id;
            this.formex.fileIds.push(response.data.id);
        },
        //提交
        pupdate(){
            this.formex.source=this.$refs.de.d_render;
            console.log(this.formex);
            axios.post('/manager/article/saveOrUpdateArticle',this.formex)
            .then((e) => {
                console.log(e);
                
                this.$notify.success({
                    title: '成功',
                    message: '提交成功！'
                });
                this.getex();
                this.nomodel();
            }).catch((err) => {
                this.$notify.error({
                    title: '错误',
                    message: '添加失败！'
              });
            });
            console.log(this.formex);
        },
        //单个删除
        delectex(id){
            axios.get('/manager/article/deleteArticleById?id='+id).then(() => {
            }).then(()=>{
              this.$notify.success({
                title: '成功',
                message: '删除成功！'
              });
              this.getex();
            })
            .catch(()=>{
              this.$notify.error({
                title: '错误',
                message: '删除失败！'
              });
            });
        },
        //加载数据栏目
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
                console.log(result);
                
                this.allex=result.data.data;
            }).catch((err) => {
                this.$notify.error({
                    title:'错误',
                    message:'网络异常！'
                });
            });
        },
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
    .quill{
        width: 85%;
        margin: 20px auto 0;
    }
    .nav>div{
        float: left;
        margin-left:8px;
    }
</style>
