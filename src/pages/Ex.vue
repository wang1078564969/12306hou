<template>
    <div class="user">
        <div class="button">
            <el-button type="success">添加</el-button>
            <el-button type="info">全选</el-button>
            <el-button type="danger" >删除</el-button>
        </div>
        <div class="article">
            <el-table :data="exdata" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
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
                label="title"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="readtimes"
                label="阅读次数">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import axios from "@/http/axios";
export default {
    data(){
        return{
            exdata:{},
            params:{
                page:0,
                pageSize:10,
            }
        }
    },
    methods:{
        //加载数据
        getexdata(){
            axios.get('/manager/article/findArticle',{
                params:this.params
            })
            .then((ex) => {
                this.exdata=ex;
            }).catch(() => {
                this.$notify.error({
                    title:'错误',
                    message:'网络异常！'
                });
            });
        },
    },
    created(){
        this.getexdata();
    },

}
</script>
