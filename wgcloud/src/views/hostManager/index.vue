<template>
  <div class="app-container">
    <div class="bg-cover" v-if="showCover"></div>
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-s-platform"></i>主机管理</div>
        <!-- 按钮 -->
        <div class="right" style="margin-bottom: 10px">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-refresh"
            @click="refresh()"
            >刷新</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-full-screen"
            @click="allchange()"
            >全选</el-button
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
            @click="deleteHost"
            >删除</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-top-right"
            @click="deviceExport"
            >导出</el-button
          >
          <el-input
            class="search"
            v-model="search"
            size="mini"
            placeholder="输入设备名搜索"
          />
        </div>
      </div>
      <!-- 表格 -->
      <div class="container-table" style="color: #fff">
        <el-table
          :data="
            data.filter(
              (data) =>
                !search ||
                data.deviceName.toLowerCase().includes(search.toLowerCase())
            )
          "
          ref="multipleTable"
          v-loading="listLoading"
          tooltip-effect="dark"
          style="width: 100%"
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
          element-loading-spinner="el-icon-loading"
          element-loading-text="加载中"
          element-loading-background="#081b31"
        >
          <el-table-column type="selection" width="55" style="color: #fff">
          </el-table-column>
          <!-- 设备名 -->
          <el-table-column
            prop="deviceName"
            label="设备名"
            align="center"
            style="color: #fff"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.editing" @click="openDailog(scope.row)">{{
                scope.row.deviceName
              }}</span
              ><el-input v-else v-model="scope.row.deviceName"></el-input
            ></template>
          </el-table-column>
          <!-- IP地址 -->
          <el-table-column
            prop="deviceIp"
            label="IP地址"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div v-if="!scope.row.editing">{{ scope.row.deviceIp }}</div>
              <el-input v-else v-model="scope.row.deviceIp"></el-input>
            </template>
          </el-table-column>
          <!-- 类型 -->
          <el-table-column
            prop="deviceType"
            label="类型"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.deviceType == 1">Linux</p>
              <p v-else-if="scope.row.deviceType == 2">Windows</p>
              <p v-else-if="scope.row.deviceType == 3">Redis</p>
              <p v-else-if="scope.row.deviceType == 4">Mysql</p>
              <p v-else>未分类</p></template
            >
          </el-table-column>
          <!-- 区域 -->
          <el-table-column
            prop="region"
            label="区域"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div v-if="!scope.row.editing">{{ scope.row.region }}</div>
              <el-input v-else v-model="scope.row.region"></el-input>
            </template>
          </el-table-column>
          <!-- 监控类型 -->
          <el-table-column
            class="MonitoreType"
            prop="monitoringType"
            label="监控类型"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.monitoringType === 'Agent'"
                :color="
                  scope.row.monitoringType === 'Agent' &&
                  scope.row.state === '0'
                    ? '#f56c6c'
                    : '#0c2643' &&
                      scope.row.monitoringType === 'Agent' &&
                      scope.row.state === '1'
                    ? '#0c2643'
                    : '#0c2643'
                "
                style="border: 1px solid #14c8ff"
                effect="dark"
                >AGENT</el-tag
              >
              <el-tag
                v-else
                :color="
                  scope.row.monitoringType === 'Agent' &&
                  scope.row.state === '0'
                    ? '#f56c6c'
                    : '#0c2643' &&
                      scope.row.monitoringType === 'Agent' &&
                      scope.row.state === '1'
                    ? '#0c2643'
                    : '#0c2643'
                "
                style="border: none"
                effect="dark"
                >AGENT</el-tag
              >
              <el-tag
                v-if="scope.row.monitoringType === 'SSH'"
                :color="
                  scope.row.monitoringType === 'SSH' && scope.row.state === '0'
                    ? '#f56c6c'
                    : '#0c2643' &&
                      scope.row.monitoringType === 'SSH' &&
                      scope.row.state === '1'
                    ? '#0c2643'
                    : '#0c2643'
                "
                style="border: 1px solid #14c8ff"
                effect="dark"
                >SSH</el-tag
              >
              <el-tag
                v-else
                :color="
                  scope.row.monitoringType === 'SSH' && scope.row.state === '0'
                    ? '#f56c6c'
                    : '#0c2643' &&
                      scope.row.monitoringType === 'SSH' &&
                      scope.row.state === '1'
                    ? '#0c2643'
                    : '#0c2643'
                "
                style="border: none"
                effect="dark"
                >SSH</el-tag
              >
            </template>
          </el-table-column>
          <!-- 代理 -->
          <el-table-column
            prop="proxy"
            label="代理"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div v-if="!scope.row.editing">{{ scope.row.proxy }}</div>
              <el-input v-else v-model="scope.row.proxy"></el-input>
            </template>
          </el-table-column>
          <!-- 管理 -->
          <el-table-column prop="manage" label="管理" align="center">
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
                content="指标"
                placement="top"
                :hide-after="2000"
              >
                <el-button
                  type="primary"
                  icon="el-icon-s-unfold"
                  circle
                  size="mini"
                  @click="targetbtnhandle"
                ></el-button>
              </el-tooltip>

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
              ></el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <el-pagination
        class="pager"
        style="margin-top: 30px"
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
    </div>

    <!-- 对话框 -->
    <Popup
      class="dialogFlag"
      v-show="dialogFlag"
      @cancel="closeHandle"
      :openData="openData"
      :rowData="rowData"
      ref="ref2"
    ></Popup>

    <!-- 弹出框 -->
    <el-dialog title="添加主机" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" size="medium">
        <el-form-item
          label="设备名:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '设备名不能为空',
          }"
        >
          <el-input
            v-model="form.deviceName"
            autocomplete="off"
            style="height: 35px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="IP地址:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: 'IP地址不能为空',
          }"
        >
          <el-input v-model="form.deviceIp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label=" 类型:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '类型不能为空',
          }"
        >
          <el-select
            v-model="form.deviceType"
            placeholder="请选择类型"
            @change="selectHandle"
          >
            <el-option label="linux" value="1"> </el-option>
            <el-option label="windows" value="2"></el-option>
            <el-option label="redis" value="3"></el-option>
            <el-option label="mysql" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域:" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="监控类型："
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '类型不能为空',
          }"
        >
          <el-select
            v-model="form.monitoringType"
            placeholder="请选择监控类型"
            clearable
          >
            <el-option label="Agent" value="Agent"> </el-option>
            <el-option
              v-if="form.deviceType !== '2'"
              label="SSH"
              value="SSH"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="form.deviceType === '3'"
          label="密码:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.monitoringType == 'SSH' && form.deviceType == '1'"
          label="主机用户名:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '类型不能为空',
          }"
        >
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.monitoringType == 'SSH' && form.deviceType == '1'"
          label="主机密码:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '类型不能为空',
          }"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.monitoringType == 'Agent' && form.deviceType === '1'"
          label="端口:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.monitoringType == 'SSH' && form.deviceType !== '4'"
          label="端口:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.port" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.deviceType == '4'"
          label="主机用户名:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '类型不能为空',
          }"
        >
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.deviceType == '4'"
          label="主机密码:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: '类型不能为空',
          }"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.deviceType == '4'"
          label="主机端口:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.port" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addHostHandle">添加主机</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue";
import {
  deviceInfo,
  deleteHost,
  addHost,
  editHost,
  deviceExport,
  ces,
} from "@/api/deviceInfo";
export default {
  name: "Parent",
  data() {
    return {
      // editing: false,
      search: "",
      openData: "",
      deviceType: "",
      rowData: "",
      // tableData: "",
      dialogFlag: false,
      listLoading: false,
      showCover: false,
      data: [{}],
      dialogData: [
        {
          monitorName: "agent主机名称",
          nuit: "%",
          gap: "1h",
          app: "agent",
          time: "15:16:34",
          newdata: "Up",
        },
      ],
      dialogFormVisible: false,
      form: {
        deviceName: "",
        deviceIp: "",
        deviceType: "",
        region: "",
        monitoringType: "",
        proxy: "",
        userName: "",
        password: "",
        port: "",
      },
      formLabelWidth: "120px",
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
    };
  },
  components: {
    Popup,
  },
  created() {
    this.fetchData();
    this.form.monitoringType = "";
  },
  methods: {
    selectHandle() {
      this.form.monitoringType = "";
    },
    //编辑按钮
    edit(row) {
      row.editing = true;
      console.log(row.editing, 1);
    },
    //保存按钮
    save(row) {
      console.log(row);
      editHost(row).then((res) => {
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
    //分页相关事件
    sizeChangehandle(pagerNum) {
      this.eachPage = parseInt(pagerNum);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangehandle(currentPage) {
      this.currentPage = parseInt(currentPage);
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
    //选项
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    //添加
    addHostHandle() {
      let obj = {
        deviceName: this.form.deviceName,
        deviceIp: this.form.deviceIp,
        deviceType: this.form.deviceType,
        region: this.form.region,
        state: 1,
        monitoringType: this.form.monitoringType,
        proxy: this.form.proxy,
        userName: this.form.userName,
        password: this.form.password,
        port: this.form.port,
      };
      if (
        obj.deviceName &&
        obj.deviceIp &&
        obj.deviceType &&
        obj.monitoringType &&
        obj.state
      ) {
        addHost(obj).then((res) => {
          console.log(res);
          this.$router.push({ path: "hostManager", name: "hostManager" });
          window.location.reload();
        });
      } else {
        this.$message({
          offset: 100,
          type: "error",
          message: "请填写要输入的内容",
        });
        this.dialogFormVisible = true;
      }
    },
    //在线
    successHandle() {
      console.log(this.data);
      return this.data.filter((item, index) => {
        if (item.portStates == 1) {
          console.log(index, item);
        }
      });
    },
    // 刷新
    refresh() {
      this.fetchData();
    },
    //全选
    allchange() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    handleRowClick(row) {
      this.rowData = row;
      this.deviceType = row.deviceType;
    },
    //批量删除
    deleteHost() {
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
          deleteHost(obj).then(() => {
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
    //打开对话框
    openDailog(item) {
      this.dialogFlag = true;
      this.showCover = true;
      this.$refs.ref2.overviewHandle(item.deviceType, item.id);
    },
    //指标按钮
    targetbtnhandle() {
      this.dialogFlag = true;
      this.showCover = true;
      this.$refs.ref2.targetbtnhandle();
    },
    //关闭对话框
    closeHandle() {
      this.dialogFlag = false;
      this.showCover = false;
    },
    //删除一个主机
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
          deleteHost(obj).then(() => {
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
      deviceInfo(params.pageSize, params.pageNum).then(({ data }) => {
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
      ces().then(({ data }) => {
        this.openData = data;
      });
    },
    //导出
    deviceExport() {
      deviceExport().then((res) => {
        let blob = new Blob([res], { type: "application/vnd.ms-excel" });
        let objectUrl = URL.createObjectURL(blob);
        this.$message.success("导出成功");
        window.location.href = objectUrl;
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

.icon {
  // color: #0c2643;
  font-weight: 900;
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
.right {
  margin-right: 20px;
  margin-left: auto;
}

.container-table {
  margin: 10px;
}

i {
  margin-right: 5px;
  font-size: 18px;
}

.pager {
  height: 50px;
  padding: 10px;
  background: #081b31;
  // box-shadow: 1px 1px 1px 1px #bdbdbd;
  border-radius: 0 0 15px 15px;
}
.MonitoreType {
  width: 20px;
  height: 20px;
  border: 1px solid black;
}

.el-tag {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  text-align: center;
  margin-right: 5px;
}

.dialogFlag {
  z-index: 9999;
  position: absolute;
  top: 0px;
  background: #fff;
}
.bg-cover {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
}
.search {
  width: 200px;
  margin-left: 10px;
}
</style>
