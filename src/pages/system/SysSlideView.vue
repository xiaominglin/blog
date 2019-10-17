<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="所有幻灯片" name="first">
      <template>
        <template>
          <el-button type="primary" size="mini" @click="changeOrder()">
            排序
          </el-button>
          <el-button type="success" size="mini" @click="addSlide()">
            增加
          </el-button>
        </template>
        <!-- 按钮排序 -->
        <el-table :data="tableData"  border  style="width: 100%">
          <el-table-column label="排序" width="80">
            <template slot-scope="scope">
                <el-input prop="list_order" v-model="scope.row.list_order"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" width="60"></el-table-column>
          <el-table-column prop="title" label="幻灯片标题" width="100"></el-table-column>
          <el-table-column prop="description" label="描述" width="120"></el-table-column>
          <el-table-column prop="url" label="链接"></el-table-column>
          <el-table-column prop="image" label="图片"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">
                {{scope.row.status | statusFilter}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作">
             <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleUpdate(row,'edit')">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 16px; text-align:right;"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="pageSizeList"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
          <!-- 编辑新增 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="handleClose">
          <el-form :model="form" ref="dataForm">
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="form.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="form.image" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-select v-model="form.status" placeholder="状态">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">保 存</el-button>
          </div>
        </el-dialog>

      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style>
  .el-col {
    border-radius: 4px;
  }
</style>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        tableData: [],
        pageSizeList:[3, 4, 5, 6],
        total: 0,
        pagesize: 3,
        currentpage: 1,
        tanchuan: false,
        list_order: [],
        dialogFormVisible: false,
        form :{
          title : '',
          description : '',
          url: '',
          image: '',
          status: '1'
        },
        formLabelWidth: '120px',
        textMap: {
          update: '编辑',
          create: '添加'
        },
        dialogStatus: '',
        statusOptions: [{
          value: '1',
          label: '启用'
        }, {
          value: '0',
          label: '禁用'
        }],
      };
    },
    filters: {
      statusFilter(status) {
        return status ? '启用' : '停用';
      }
    },
    methods: {
      getTableData(){
        this.$store.dispatch('slide',{"pagesize":this.pagesize,"currentpage":this.currentpage}).then(() => {
            const init = this.$store.state.sys;
            const slide = init.slide;
            if( slide.code == '1'){
              this.tableData = slide.data;
              this.total = slide.count;
            }else {
              this.$message.error(slide.msg); //返回失败提示错误
            }
        }).catch(err => {
            this.$message.error(err); //返回失败提示错误
        });
      },
      updateTableData(id){
        this.$store.dispatch('updateTableData',{"id":id}).then(() => {
            const init = this.$store.state.sys;
            const delSlide = init.delSlide;
            if( delSlide.count > '0'){
              this.$message({
                message: delSlide.msg,
                type: 'success'
              });
            }else {
              this.$message.error(delSlide.msg); //返回失败提示错误
            }
        }).catch(err => {
            this.$message.error(err); //返回失败提示错误
        });
      },
      editSlideInfo(form){
        this.$store.dispatch('editSlideInfo',form).then(() => {
            const init = this.$store.state.sys;
            const editSlideInfo = init.editSlideInfo;
            if( editSlideInfo.count > '0'){
              this.$message({
                message: editSlideInfo.msg,
                type: 'success'
              });
              this.dialogFormVisible = false
            }else {
              this.$message.error(editSlideInfo.msg); //返回失败提示错误
            }
        }).catch(err => {
            this.$message.error(err); //返回失败提示错误
        });
      },
      createNewData(data){
        this.$store.dispatch('createNewSlide',data).then(() => {
          const init = this.$store.state.sys;
          const addSlideInfo = init.addSlideInfo;
          this.$message.success(addSlideInfo.msg);
          this.dialogFormVisible = false
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        }).catch(err => {
            this.$message.error(err); //返回失败提示错误
        });
      },
      handleSizeChange (value) {
        this.pagesize = value;
        this.getTableData();
      },
      handleCurrentChange (value) {
        this.currentpage = value;
        this.getTableData();
      },
      handleUpdate(row,status) {
        this.form = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      changeOrder(){
        console.log("doSomething" + this.list_order);
      },
      handleModifyStatus(row, status) {
        this.updateTableData(row.id);
        this.getTableData();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      createData(){
         this.createNewData(this.form);
      },
      updateData(){
        const tempData = Object.assign({}, this.form)
        this.editSlideInfo(tempData);
        this.getTableData();
      },
      addSlide(){
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      }
    },
    created () {
      this.getTableData();
    }
  };
</script>