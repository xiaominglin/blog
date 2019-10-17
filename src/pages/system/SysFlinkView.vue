<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="所有友情链接" name="first">
      <template>
        <!-- 按钮排序 -->
        <el-table :data="tableData"  border  style="width: 100%">
          <el-table-column label="排序" width="180"></el-table-column>
          <el-table-column prop="id" label="ID" width="180"></el-table-column>
          <el-table-column prop="title" label="幻灯片标题"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column prop="url" label="链接"></el-table-column>
          <el-table-column prop="image" label="图片"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <el-tab-pane label="添加友情链接" name="second">
      
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        tableData: [{
            id: '2016-05-02',
            title: '王小虎',
            description: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '2016-05-02',
            title: '王小虎',
            description: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '2016-05-02',
            title: '王小虎',
            description: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: '2016-05-02',
            title: '王小虎',
            description: '上海市普陀区金沙江路 1518 弄'
          }]
      };
    },
    methods: {

    }
  };
</script>