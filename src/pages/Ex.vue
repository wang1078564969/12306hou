<template>
    <div class="user">
        <div class="button">
            <el-button type="success">添加</el-button>
            <el-button type="info">全选</el-button>
            <el-button type="danger" >删除</el-button>
        </div>
        <div class="article">
            <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="demonstration">直接前往</span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import axios from "@/http/axios";
export default {
    data(){
        return{
            exdata:{},

        }
    },
    methods:{
        getexdata(){
            axios.get('')
        }
    },
    created(){

    },

}
</script>
