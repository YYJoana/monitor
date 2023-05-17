<template>
  <div class="app-container">
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-help"></i>端口列表</div>
        <div class="right">
          <el-button type="primary" size="mini" @click="sortType = -1"
            >全部</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="dialogFormVisible = true"
            >添加</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="deletePortHandle"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="sortType = 1"
            >在线</el-button
          >
          <el-button type="danger" size="mini" @click="sortType = 0"
            >已下线</el-button
          >
          <el-input
            class="search"
            v-model="search"
            size="mini"
            placeholder="输入IP或者监控项名称搜索"
          />
        </div>
      </div>
      <div class="container">
        <div class="table">
          <el-table
            :data="filData"
            v-loading="listLoading"
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            element-loading-spinner="el-icon-loading"
            element-loading-text="加载中"
            element-loading-background="#081b31"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
            >
            </el-table-column>

            <!-- 名称 -->
            <el-table-column
              class="MonitoreType"
              prop="portName"
              label="名称"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.editing">{{ scope.row.portName }}</div>
                <el-input v-else v-model="scope.row.portName"></el-input>
              </template>
            </el-table-column>
            <!-- IP -->
            <el-table-column
              prop="Ip"
              label=" IP"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.editing">{{ scope.row.ip }}</div>
                <el-input v-else v-model="scope.row.ip"></el-input>
              </template>
            </el-table-column>
            <!-- 端口-->
            <el-table-column
              prop="telnetPort"
              label="端口"
              align="center"
              width="150px"
            >
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <div v-if="!scope.row.editing">{{ scope.row.telnetPort }}</div>
                <el-input v-else v-model="scope.row.telnetPort"></el-input>
              </template>
            </el-table-column>
            <!-- 端口状态 -->
            <el-table-column
              prop="portStates"
              label="端口状态"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.portStates == 1"
                  color="#0c2643"
                  effect="dark"
                  style="
                    border: 1px solid #14c8ff;
                    height: 20px;
                    line-height: 20px;
                  "
                  >正常</el-tag
                >
                <el-tag
                  v-else
                  color="#0c2643"
                  effect="dark"
                  style="
                    border: 1px solid #e6307b;
                    height: 20px;
                    line-height: 20px;
                  "
                  >失败</el-tag
                ></template
              >
            </el-table-column>
            <!-- 监控状态 -->
            <el-table-column
              prop="monitoringStates"
              label="监控状态"
              align="center"
              width="100px"
            >
              <template slot-scope="scope">
                <el-tooltip
                  :content="
                    scope.row.monitoringStates == 1 ? '监控中' : '未监控'
                  "
                  placement="top"
                >
                  <el-switch
                    v-model="scope.row.monitoringStates"
                    active-color="#00feb5"
                    inactive-color="#e6307b"
                    :active-value="1"
                    :inactive-value="0"
                    @change="changeMonitorType(scope.row)"
                  >
                  </el-switch>
                </el-tooltip>
              </template>
            </el-table-column>
            <!-- 更新时间 -->
            <el-table-column
              prop="updateTime"
              label="更新时间"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.updateTime }}
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column prop="manage" label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="!scope.row.editing"
                  class="item"
                  effect="dark"
                  content="编辑"
                  placement="top"
                  :hide-after="2000"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    @click="edit(scope.row)"
                  ></el-button
                ></el-tooltip>
                <el-tooltip
                  v-else
                  class="item"
                  effect="dark"
                  content="保存"
                  placement="top"
                  :hide-after="2000"
                >
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    circle
                    size="mini"
                    @click="save(scope.row)"
                  ></el-button
                ></el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="top"
                  :hide-after="2000"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                    @click="deleteHandle(scope.row)"
                  ></el-button
                ></el-tooltip> </template
            ></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
          class="pager"
          background
          :page-size="eachPage"
          :page-sizes="[5, 10, 20]"
          layout="prev, pager, next,total,->,sizes,jumper"
          :total="count"
          :current-page.sync="pagerCurrentPage"
          @size-change="sizeChangehandle"
          @current-change="currentChangehandle"
          @prev-click="prevClickhandle"
          @next-click="nextClickhandle"
        >
        </el-pagination>
        <!-- 对话框 -->
        <el-dialog title="添加端口" :visible.sync="dialogFormVisible" center>
          <el-form :model="form" size="medium">
            <el-form-item
              label="名称:"
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '类型不能为空',
              }"
            >
              <el-input v-model="form.portName" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="id:" :label-width="formLabelWidth">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item
              label="ip:"
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '类型不能为空',
              }"
            >
              <el-input v-model="form.ip" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="端口:"
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '类型不能为空',
              }"
            >
              <el-input v-model="form.telnetPort" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addPortHandle"
              >添加端口</el-button
            >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  telnetport,
  addPort,
  deletePort,
  editPort,
  editMonitorState,
} from "@/api/port";
export default {
  data() {
    return {
      search: "",
      // editing: false,
      sortType: -1,
      data: [{}],
      input3: "",
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
      listLoading: false,
      dialogFormVisible: false,
      form: {
        telnetPort: "",
        ip: "",
        id: "",
        telnetIp: "",
        portStates: "",
        monitoringStates: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filData() {
      const arr = this.data.filter((p) => {
        return (
          !this.search ||
          p.ip.toLowerCase().includes(this.search.toLowerCase()) ||
          p.portName.toLowerCase().includes(this.search.toLowerCase())
        );
      });
      if (this.sortType == 1) {
        return arr.filter((row) => row.portStates == 1);
      } else if (this.sortType == 0) {
        return arr.filter((row) => row.portStates == 0);
      } else if (this.sortType == -1) {
        return arr;
      }
      return arr;
    },
  },
  mounted() {},
  methods: {
    //编辑按钮
    edit(row) {
      row.editing = true;
      console.log(row.editing, 1);
    },
    //保存按钮
    save(row) {
      console.log(row);
      editPort(row).then((res) => {
        console.log(res);
        if (res.msg == "更新成功") {
          row.editing = false;
          this.$message({
            offset: 100,
            type: "success",
            message: "修改成功!",
          });
        }
      });
    },
    //选项
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleRowClick(row) {
      console.log(row); //打印的时当前选中的行
    },
    //批量删除
    deletePortHandle() {
      let obj = {
        ids: [],
      };
      this.multipleSelection.forEach((row) => obj.ids.push(row.id));
      this.$confirm(" 是否继续删除?", "删除主机", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePort(obj).then(() => {
            this.fetchData();
            this.$message({
              offset: 100,
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            offset: 100,
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页操作
    sizeChangehandle(pageNum) {
      this.eachPage = parseInt(pageNum);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangehandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    //上一页
    prevClickhandle() {
      this.currentPage -= 1;
    },
    //下一页
    nextClickhandle() {
      this.currentPage += 1;
    },
    //删除单个接口
    deleteHandle(row) {
      let obj = {
        ids: [],
      };
      obj.ids.push(row.id);
      this.$confirm(" 是否继续删除?", "删除主机", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePort(obj).then(() => {
            this.fetchData();
            this.$message({
              offset: 100,
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            offset: 100,
            type: "info",
            message: "已取消删除",
          });
        });
    },
    fetchData() {
      this.listLoading = true;
      const { currentPage, eachPage } = this;
      const params = {
        pageNum: currentPage,
        pageSize: eachPage,
      };
      telnetport(params.pageSize, params.pageNum).then(({ data }) => {
        this.listLoading = false;
        console.log(data);
        this.data = data.rows;
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    //添加端口
    addPortHandle() {
      let obj = {
        portName: this.form.portName,
        ip: this.form.ip,
        portStates: 1,
        monitoringStates: 1,
        telnetPort: this.form.telnetPort,
      };
      if (
        obj.portName &&
        obj.ip &&
        obj.portStates &&
        obj.monitoringStates &&
        obj.telnetPort
      ) {
        addPort(obj).then((res) => {
          console.log(res);
          this.$router.push({ path: "port", name: "port" });
          window.location.reload();
        });
      } else {
        this.$message({
          offset: 100,
          type: "error",
          message: "请填写要输入的内容",
        });
      }
    },
    //修改监控状态
    changeMonitorType(row) {
      // const status = row.monitoringState ? 0 : 1;
      console.log(row.monitoringStates, row.id, row);
      editPort(row).then((res) => {
        console.log(res);
        if (res.msg == "更新成功") {
          this.editing = false;
          this.$message({
            offset: 100,
            type: "success",
            message: "修改成功!",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}
/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent !important;
  border: 0; //去除表格
}
/*去除底边框*/
::v-deep.el-table td.el-table__cell {
  border: 0;
}
::v-deep.el-table th.el-table__cell.is-leaf {
  border: 0;
}
/*去除底部灰条.el-table::before*/
::v-deep .el-table::before {
  display: none;
}
.app-container {
  padding: 40px 20px;
  color: #fff;
}
.card {
  width: 100%;
  // height: 600px;
  background: #081b31;
  border-radius: 15px;
  // box-shadow: 1px 1px 1px 1px #bdbdbd;
}
.header {
  height: 10%;
  width: 100%;
  display: flex;
  line-height: 60px;
  position: relative;
}

.header::after {
  content: "";
  width: 100%;
  border: 1px solid #ebeef5;
  position: absolute;
  top: 60px;
  left: 0;
}
.title {
  margin-left: 20px;
  font-size: 18px;
  color: #fff;
}

i {
  margin-right: 5px;
  font-size: 18px;
}
.right {
  margin-right: 20px;
  margin-left: auto;
}
.table {
  margin: 20px;
}
.pager {
  height: 50px;
  padding: 10px;
  background: #081b31;
  // box-shadow: 1px 1px 1px 1px #bdbdbd;
  border-radius: 0 0 15px 15px;
}
.search {
  width: 200px;
  margin-left: 10px;
}
</style>
