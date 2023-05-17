<template>
  <div class="app-container">
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-chat-round"></i>警告通知</div>
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
            icon="el-icon-plus"
            @click="dialogFormVisible = true"
            >新增接收人</el-button
          >
          <el-input
            class="search"
            v-model="search"
            size="mini"
            placeholder="输入邮箱账号搜索"
          />
        </div>
      </div>
      <div class="container">
        <div class="table">
          <el-table
            :data="
              data.filter(
                (data) =>
                  !search ||
                  data.fromMailName.toLowerCase().includes(search.toLowerCase())
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
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>

            <!-- 邮箱账号 -->
            <el-table-column
              prop="fromMailName"
              label="邮箱账号"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.fromMailName }}
              </template>
            </el-table-column>
            <!-- 邮箱SMTP服务器 -->
            <el-table-column
              prop="smtpHost"
              label="邮箱SMTP服务器"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.smtpHost }}
              </template>
            </el-table-column>
            <!-- SMTP端口 -->
            <el-table-column
              prop="smtpPort"
              label="SMTP端口"
              align="center"
              width="100"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.smtpPort }}
              </template>
            </el-table-column>
            <!-- 接收邮箱 -->
            <el-table-column
              prop="toMail"
              label="接收邮箱(多个邮箱用;隔开)"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.toMail }}
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
                  ></el-button></el-tooltip></template
            ></el-table-column>
          </el-table>
        </div>
        <!-- 对话框 -->
        <el-dialog title="新增签收人" :visible.sync="dialogFormVisible" center>
          <el-form :model="form" size="medium">
            <el-form-item
              label="发送邮箱账号："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱账号不能为空',
              }"
            >
              <el-input
                v-model="form.fromMailName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="发送邮箱密码："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱密码不能为空',
              }"
            >
              <el-input v-model="form.fromPwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="发送邮箱SMTP服务器："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱SMTP服务器不能为空',
              }"
            >
              <el-input v-model="form.smtpHost" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="是否启用安全链接(SSL)："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: 'SSL不能为空',
              }"
            >
              <el-input v-model="form.smtpSsl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="发送邮箱的SMTP端口："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱的SMTP端口不能为空',
              }"
            >
              <el-select v-model="form.smtpPort" placeholder="请选择端口号">
                <el-option label="25" value="25"> </el-option>
                <el-option label="465" value="465"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="接收邮件(多个邮件;隔开)："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '接收邮件不能为空',
              }"
            >
              <el-input v-model="form.toMail" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="danger" class="test" @click="testHandle"
            >发送警告测试</el-button
          >
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addEmail">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改签收人" :visible.sync="dialog" center>
          <el-form :model="editForm" size="medium" class="infomation">
            <el-form-item
              label="发送邮箱账号："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱账号不能为空',
              }"
            >
              <el-input
                v-model="editForm.fromMailName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="发送邮箱密码："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱密码不能为空',
              }"
            >
              <el-input
                v-model="editForm.fromPwd"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="发送邮箱SMTP服务器："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱SMTP服务器不能为空',
              }"
            >
              <el-input
                v-model="editForm.smtpHost"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="是否启用安全链接(SSL)："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: 'SSL不能为空',
              }"
            >
              <el-input
                v-model="editForm.smtpSsl"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="发送邮箱的SMTP端口："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '邮箱的SMTP端口不能为空',
              }"
            >
              <el-select v-model="editForm.smtpPort" placeholder="请选择端口号">
                <el-option label="25" value="25"> </el-option>
                <el-option label="465" value="465"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="接收邮件(多个邮件;隔开)："
              :label-width="formLabelWidth"
              :rules="{
                required: true,
                message: '接收邮件不能为空',
              }"
            >
              <el-input v-model="editForm.toMail" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="danger" class="test" @click="test"
            >发送警告测试</el-button
          >
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="EditEmail">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  email,
  addEmail,
  testEmail,
  deleteEmail,
  editEmail,
  viewMail,
} from "@/api/email";
export default {
  data() {
    return {
      data: [{}],
      // editing: false,
      input3: "",
      listLoading: false,
      search: "",
      listLoading: false,
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
      listLoading: false,
      dialogFormVisible: false,
      dialog: false,
      editForm: {},
      form: {
        fromMailName: "",
        fromPwd: "",
        smtpHost: "",
        smtpPort: "",
        smtpSsl: "",
        toMail: "",
      },
      formLabelWidth: "200px",
    };
  },
  methods: {
    //编辑按钮
    edit(row) {
      this.dialog = true;
      console.log(row);
      viewMail(row.id).then((res) => {
        this.editForm = res.data;
        console.log(this.editForm);
      });
    },
    EditEmail() {
      let obj = {
        fromMailName: this.fromMailName,
        fromPwd: this.fromPwd,
        smtpHost: "",
        smtpPort: "",
        smtpSsl: "",
        toMail: "",
      };
      testEmail(obj).then((res) => {
        this.listLoading = true;
        console.log(res.msg);
        if (res.msg === "测试失败") {
          this.listLoading = false;
          this.$message({
            offset: 100,
            type: "error",
            message: "填写的内容有误，测试失败",
          });
        } else if (res.msg === "测试成功") {
          this.listLoading = false;
          editEmail(this.obj).then((res) => {
            console.log(res);
            this.$router.push({ path: "email", name: "email" });
            this.$message.success("修改成功");
            window.location.reload();
          });
        }
      });
    },
    test() {
      let obj = {
        fromMailName: this.editForm.fromMailName,
        fromPwd: this.editForm.fromPwd,
        smtpHost: this.editForm.smtpHost,
        smtpPort: this.editForm.smtpPort,
        smtpSsl: this.editForm.smtpSsl,
        toMail: this.editForm.toMail,
      };
      if (
        obj.fromMailName &&
        obj.fromPwd &&
        obj.smtpHost &&
        obj.smtpPort &&
        obj.smtpSsl &&
        obj.toMail
      ) {
        testEmail(obj).then((res) => {
          if (res.msg === "测试失败") {
            this.$message({
              offset: 100,
              type: "error",
              message: "测试失败",
            });
          } else if (res.msg === "测试成功") {
            this.$message({
              offset: 100,
              type: "success",
              message: "测试成功",
            });
          }
        });
      }
    },
    //添加发送测试
    testHandle() {
      let obj = {
        fromMailName: this.form.fromMailName,
        fromPwd: this.form.fromPwd,
        smtpHost: this.form.smtpHost,
        smtpPort: this.form.smtpPort,
        smtpSsl: this.form.smtpSsl,
        toMail: this.form.toMail,
      };
      if (
        obj.fromMailName &&
        obj.fromPwd &&
        obj.smtpHost &&
        obj.smtpPort &&
        obj.smtpSsl &&
        obj.toMail
      ) {
        testEmail(obj).then((res) => {
          if (res.msg === "测试失败") {
            this.$message({
              offset: 100,
              type: "error",
              message: "测试失败",
            });
          } else if (res.msg === "测试成功") {
            this.$message({
              offset: 100,
              type: "success",
              message: "测试成功",
            });
          }
        });
      }
    },
    //选项
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleRowClick(row) {
      console.log(row); //打印的时当前选中的行
    },
    //删除按钮
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
          deleteEmail(obj.ids).then(() => {
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
    //添加收件人
    addEmail() {
      let obj = {
        fromMailName: this.form.fromMailName,
        fromPwd: this.form.fromPwd,
        smtpHost: this.form.smtpHost,
        smtpPort: this.form.smtpPort,
        smtpSsl: this.form.smtpSsl,
        toMail: this.form.toMail,
      };
      if (
        obj.fromMailName &&
        obj.fromPwd &&
        obj.smtpHost &&
        obj.smtpPort &&
        obj.smtpSsl &&
        obj.toMail
      ) {
        testEmail(obj).then((res) => {
          this.listLoading = true;
          console.log(res.msg);
          if (res.msg === "测试失败") {
            this.listLoading = false;
            this.$message({
              offset: 100,
              type: "error",
              message: "填写的内容有误，测试失败",
            });
          } else if (res.msg === "测试成功") {
            this.listLoading = false;
            addEmail(obj).then((res) => {
              console.log(res);
              this.$router.push({ path: "email", name: "email" });
              window.location.reload();
            });
          }
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
    // 刷新
    refresh() {
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      email().then(({ data }) => {
        this.listLoading = false;
        console.log(this.data);
        this.data = data;
      });
    },
  },
  created() {
    this.fetchData();
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
.container {
  padding-bottom: 20px;
}
.search {
  width: 200px;
  margin-left: 10px;
}

.test {
  height: 40px;
  width: 150px;
  margin-left: 200px;
  margin-bottom: 40px;
}

.el-input__inner {
  border: none !important;
}
</style>
