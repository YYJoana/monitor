<template>
  <div class="app-container">
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-document-copy"></i>日志信息</div>
        <div class="right" style="margin-bottom: 10px">
          <el-select
            v-model="value3"
            filterable
            placeholder="请选择"
            size="mini"
            style="width: 100px; margin: 0 10px"
            @change="changeType"
          >
            <el-option
              v-for="item in options1"
              :key="item.value3"
              :label="item.label3"
              :value="item.value3"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="value4"
            filterable
            placeholder="请选择"
            size="mini"
            style="width: 100px"
            @change="changeLogin"
          >
            <el-option
              v-for="item in options2"
              :key="item.value4"
              :label="item.label4"
              :value="item.value4"
            >
            </el-option>
          </el-select>
          <!-- <el-button type="success" size="mini">正常</el-button>
          <el-button type="danger" size="mini">失败</el-button> -->
          <!-- <el-button type="primary" size="mini">操作系统</el-button> -->
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            size="mini"
            value-format="yyyy-MM-dd"
            style="margin-left: 10px; width: 150px"
          >
          </el-date-picker>
          <span style="margin: 0 5px">至</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期"
            size="mini"
            value-format="yyyy-MM-dd"
            style="margin-right: 10px; width: 150px"
          >
          </el-date-picker>
          <el-button type="primary" size="mini" @click="dataQuery"
            >查询</el-button
          >
          <el-button type="danger" size="mini" @click="clearHandle"
            >重置</el-button
          >
        </div>
      </div>
      <div class="container">
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="data"
            v-loading="listLoading"
            tooltip-effect="dark"
            style="width: 100%"
            element-loading-spinner="el-icon-loading"
            element-loading-text="加载中"
            element-loading-background="#081b31"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
            >
              <template slot-scope="scope">{{
                scope.$index + (currentPage - 1) * eachPage + 1
              }}</template>
            </el-table-column>

            <!-- 摘要 -->
            <el-table-column
              prop="infoContent"
              label="设备名"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope"
                >{{ scope.row.deviceName }}
              </template>
            </el-table-column>
            <!--主机名 -->
            <el-table-column
              prop="hostName"
              label="主机名"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{ scope.row.hostName }} </template>
            </el-table-column>
            <!-- 主机类型 -->
            <el-table-column
              prop="hostType"
              label="类型"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.hostType == 1">linux</p>
                <p v-else-if="scope.row.hostType == 2">Windows</p>
                <p v-else-if="scope.row.hostType == 3">Redis</p>
                <p v-else-if="scope.row.hostType == 4">Mysql</p>
                <p v-else>未分类</p>
              </template>
            </el-table-column>
            <!-- 严重级别 -->
            <el-table-column
              class="severity"
              prop="methods"
              label="严重级别"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.severity == 1"
                  color="#0c2643"
                  effect="dark"
                  style="border: 1px solid #a8b7ca"
                  size="small"
                  >未分类</el-tag
                >
                <el-tag
                  v-else-if="scope.row.severity == 2"
                  color="#0c2643"
                  effect="dark"
                  style="border: 1px solid #01b0ff"
                  size="small"
                  >警告</el-tag
                >
                <el-tag
                  v-else-if="scope.row.severity == 3"
                  color="#0c2643"
                  effect="dark"
                  style="border: 1px solid #ed6942"
                  size="small"
                  >一般严重</el-tag
                >
                <el-tag
                  v-else-if="scope.row.severity == 4"
                  color="#0c2643"
                  effect="dark"
                  style="border: 1px solid #e6307b"
                  size="small"
                  >严重</el-tag
                >
                <el-tag
                  v-else-if="scope.row.severity == 5"
                  color="#0c2643"
                  effect="dark"
                  style="border: 1px solid #8e0742"
                  size="small"
                  >灾难</el-tag
                >
              </template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column prop="hostType" label="状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.state == 1"
                  color="#3a6ea0"
                  effect="dark"
                  style="border: none; height: 20px; line-height: 20px"
                  >正常</el-tag
                >
                <el-tag
                  v-else
                  color="#df337e"
                  effect="dark"
                  style="border: none; height: 20px; line-height: 20px"
                  >失败</el-tag
                ></template
              >
            </el-table-column>
            <!-- 添加时间 -->
            <el-table-column
              prop="time"
              label="更新时间"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope"
                >{{ scope.row.updateTime }}
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              prop="manage"
              label="操作"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  style="height: 30px; line-height: 5px"
                  @click="viewHandle(scope.row)"
                  >查看</el-button
                ></template
              ></el-table-column
            >
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
          title="查看日志信息"
          :visible.sync="dialogFormVisible"
          center
          class="dialog"
        >
          <el-form :model="form" size="medium">
            <el-form-item label="名称:" :label-width="formLabelWidth">
              <el-input
                v-model="form.hostName"
                autocomplete="off"
                class="paperview-input-text"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="id:" :label-width="formLabelWidth">
              <el-input
                v-model="form.id"
                autocomplete="off"
                class="paperview-input-text"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="摘要:" :label-width="formLabelWidth">
              <el-input
                v-model="form.infoContent"
                autocomplete="off"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="主机类型:" :label-width="formLabelWidth">
              <el-input
                :value="
                  form.hostType +
                  '(1:Linux,2:Window,3:Mysql,4:redis,其他：未分类)'
                "
                autocomplete="off"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="严重级别:" :label-width="formLabelWidth">
              <el-input
                :value="
                  form.severity + '(1:未分类,2:警告,3:一般严重,4:严重,5:灾难,)'
                "
                autocomplete="off"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="状态:" :label-width="formLabelWidth">
              <el-input
                :value="form.state + '(1:正常,0:失败)'"
                autocomplete="off"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="更新时间:" :label-width="formLabelWidth">
              <el-input
                v-model="form.updateTime"
                autocomplete="off"
                readonly
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { logInfo, viewLogInfo } from "@/api/login";
export default {
  data() {
    return {
      data: [{}],
      options1: [
        {
          value3: "1",
          label3: "Linux",
        },
        {
          value3: "2",
          label3: "Windows",
        },
        {
          value3: "3",
          label3: "Mysql",
        },
        {
          value3: "0",
          label3: "未分类",
        },
      ],
      value3: "",
      options2: [
        {
          value4: "1",
          label4: "未分类",
        },
        {
          value4: "2",
          label4: "警告",
        },
        {
          value4: "3",
          label4: "一般严重",
        },
        {
          value4: "4",
          label4: "严重",
        },
        {
          value4: "5",
          label4: "灾难",
        },
      ],
      value4: "",
      input3: "",
      value1: "",
      value2: "",
      hostType: "",
      severity: "",
      listLoading: false,
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
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
  methods: {
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
    //根据日期查询
    dataQuery() {
      this.fetchData();
    },
    //重置按钮
    clearHandle() {
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      this.fetchData();
    },
    changeType() {
      this.fetchData();
    },
    changeLogin() {
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      const { currentPage, eachPage, value3, value4, value1, value2 } = this;
      const params = {
        pageNum: currentPage,
        pageSize: eachPage,
        hostType: value3,
        severity: value4,
        startDate: value1,
        endDate: value2,
      };
      logInfo(
        params.pageSize,
        params.pageNum,
        params.hostType,
        params.severity,
        params.startDate,
        params.endDate
      ).then(({ data }) => {
        console.log(params.hostType);
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
    viewHandle(row) {
      this.dialogFormVisible = true;
      console.log(row);
      viewLogInfo(row.id).then(({ data }) => {
        this.form = data;
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
  border-radius: 0 0 15px 15px;
}
</style>
