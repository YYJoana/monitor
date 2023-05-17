<template>
  <div class="app-container">
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-link"></i>服务器接口管理</div>
        <div class="right">
          <el-button type="primary" size="mini" @click="sortType = -1"
            >全部</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="dialogFormVisible = true"
            >添加</el-button
          >
          <el-button type="success" size="mini" @click="sortType = 200"
            >200</el-button
          >
          <el-button type="warning" size="mini" @click="sortType = 404"
            >404</el-button
          >
          <el-button type="danger" size="mini" @click="sortType = 500"
            >500</el-button
          >
          <!-- <el-button type="danger" size="mini" @click="sortType = 403"
            >403</el-button
          >
          <el-button type="danger" size="mini" @click="sortType = 400"
            >400</el-button
          > -->
          <!-- <el-input placeholder="请输入内容" v-model="input1"> </el-input> -->
        </div>
      </div>
      <div class="container">
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="filData"
            tooltip-effect="dark"
            v-loading="listLoading"
            style="width: 100%"
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

            <!-- 服务器名称 -->
            <el-table-column
              prop="ip"
              label="服务器名称"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.editing">{{ scope.row.appName }}</div>
                <el-input v-else v-model="scope.row.appName"></el-input>
              </template>
            </el-table-column>
            <!-- 接口地址 -->
            <el-table-column
              prop="ip"
              label="接口地址"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.editing">{{ scope.row.heathUrl }}</div>
                <el-input v-else v-model="scope.row.heathUrl"></el-input>
              </template>
            </el-table-column>
            <!-- 请求方式 -->
            <el-table-column
              prop="type"
              label="请求方式"
              width="100"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.editing">{{ scope.row.requestMode }}</div>
                <el-input v-else v-model="scope.row.requestMode"></el-input>
              </template>
            </el-table-column>
            <!-- 健康状态-->
            <el-table-column
              prop="area"
              label="健康状态"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.heathStatus === 200"
                  color="#04da9a"
                  effect="dark"
                  style="border: none; height: 20px; line-height: 20px"
                  >200</el-tag
                >
                <el-tag
                  v-else-if="scope.row.heathStatus === 404"
                  color="#ed6942"
                  effect="dark"
                  style="border: none; height: 20px; line-height: 20px"
                  >404</el-tag
                >
                <el-tag
                  v-else
                  color="#df337e"
                  effect="dark"
                  style="border: none; height: 20px; line-height: 20px"
                  >500</el-tag
                >
              </template>
            </el-table-column>
            <!-- 响应时间ms -->
            <el-table-column
              class="MonitoreType"
              prop="methods"
              label="响应时间ms"
              align="center"
              width="100"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-if="!scope.row.editing">{{ scope.row.requestTime }}</div>
                <el-input v-else v-model="scope.row.requestTime"></el-input>
              </template>
            </el-table-column>
            <!-- 监控状态 -->
            <el-table-column
              prop="agent"
              label="监控状态"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-tooltip
                  :content="
                    scope.row.monitoringState == 1 ? '监控中' : '未监控'
                  "
                  placement="top"
                >
                  <el-switch
                    v-model="scope.row.monitoringState"
                    active-color="#04da9a"
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
              prop="agent"
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
        <el-dialog
          title="添加接口"
          :visible.sync="dialogFormVisible"
          center
          top="100vh"
        >
          <el-form :model="form" size="medium">
            <el-form-item
              label="服务器名称:"
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '类型不能为空',
              }"
            >
              <el-input v-model="form.appName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="接口地址:"
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '类型不能为空',
              }"
            >
              <el-input v-model="form.heathUrl" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addMonitorHandle"
              >添加服务器接口</el-button
            >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { serveList, editServe, deleteServe, addServe } from "@/api/serve";
export default {
  data() {
    return {
      data: [{}],
      sortType: -1,
      listLoading: false,
      input3: "",
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
      dialogFormVisible: false,
      form: {
        appName: "",
        heathUrl: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filData() {
      if (this.sortType == 200) {
        return this.data.filter((row) => row.heathStatus == 200);
      } else if (this.sortType == 400) {
        return this.data.filter((row) => row.heathStatus == 400);
      } else if (this.sortType == 403) {
        return this.data.filter((row) => row.heathStatus == 403);
      } else if (this.sortType == 404) {
        return this.data.filter((row) => row.heathStatus == 404);
      } else if (this.sortType == 500) {
        return this.data.filter((row) => row.heathStatus == 500);
      } else if (this.sortType == -1) {
        return this.data;
      }
      return this.data;
    },
  },
  methods: {
    //编辑按钮
    edit(row) {
      row.editing = true;
    },
    //保存按钮
    save(row) {
      console.log(row);
      editServe(row).then((res) => {
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
    //删除
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
          deleteServe(obj.ids).then(() => {
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
    //添加
    addMonitorHandle() {
      let obj = {
        appName: this.form.appName,
        heathUrl: this.form.heathUrl,
        requestMode: "get",
        heathStatus: 200,
        // requestTime: this.form.requestTime,
        monitoringState: 1,
      };
      if (
        obj.appName &&
        obj.requestMode &&
        obj.heathUrl &&
        obj.heathStatus &&
        // obj.requestTime &&
        obj.monitoringState
      ) {
        addServe(obj).then((res) => {
          console.log(res);
          this.$router.push({ path: "serveManager", name: "serveManager" });
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
    fetchData() {
      this.listLoading = true;
      const { currentPage, eachPage } = this;
      const params = {
        pageNum: currentPage,
        pageSize: eachPage,
      };
      serveList(params.pageSize, params.pageNum).then(({ data }) => {
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
  border-radius: 0 0 15px 15px;
}

.el-dialog {
  transform: none;
  padding: 0;
  left: 0;
  top: 50% !important;
  position: relative;
  margin: 0 auto;
  margin-top: 0 !important;
  width: 45%;
}
</style>
