<template>
  <div class="app-container">
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-s-unfold"></i>进程列表</div>
        <div class="right">
          <el-button type="primary" size="mini">全部</el-button>
          <el-button type="success" size="mini">在线</el-button>
          <el-button type="danger" size="mini">已下线</el-button>
          <!-- <el-input placeholder="请输入内容" v-model="input1"> </el-input> -->
        </div>
      </div>
      <div class="container">
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="data"
            tooltip-effect="dark"
            style="width: 100%"
            border
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center"
            >
            </el-table-column>

            <!-- IP地址 -->
            <el-table-column prop="ip" label="IP" width="150" align="center">
              <template> </template>
            </el-table-column>
            <!-- 进程名称 -->
            <el-table-column
              prop="type"
              label="进程名称"
              width="100"
              align="center"
            >
              <template></template>
            </el-table-column>
            <!-- PID-->
            <el-table-column prop="area" label="PID" align="center">
              <template> </template>
            </el-table-column>
            <!-- 内存% -->
            <el-table-column
              class="MonitoreType"
              prop="methods"
              label="内存%"
              align="center"
            >
              <template> </template>
            </el-table-column>
            <!-- CPU% -->
            <el-table-column prop="agent" label="CPU%" align="center">
              <template> </template>
            </el-table-column>
            <!-- 启动时间 -->
            <el-table-column
              prop="agent"
              label="启动时间"
              width="150"
              align="center"
            >
              <template> </template>
            </el-table-column>
            <!-- 读取 -->
            <el-table-column prop="agent" label="读取" align="center">
              <template> </template>
            </el-table-column>
            <!-- 写入 -->
            <el-table-column prop="agent" label="写入" align="center">
              <template> </template>
            </el-table-column>
            <!-- 线程数 -->
            <el-table-column prop="agent" label="线程数" align="center">
              <template> </template>
            </el-table-column>
            <!-- 监控状态 -->
            <el-table-column prop="agent" label="监控状态" align="center">
              <template> </template>
            </el-table-column>
            <!-- 更新时间 -->
            <el-table-column
              prop="agent"
              label="更新时间"
              width="100"
              align="center"
            >
              <template> </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column prop="manage" label="操作" align="center">
              <template>
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
                    @click="editHandle"
                  ></el-button></el-tooltip></template
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{}],
      input3: "",
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
    };
  },
  methods: {
    targetbtnhandle() {},
    hold() {},
    editHandle() {},
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
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px 20px;
}

.el-button--primary {
  background: #3f51b5;
  border: #fff;
}
.card {
  width: 100%;
  // height: 600px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 1px 1px 1px 1px #bdbdbd;
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
  background: #f7f7f7;
  box-shadow: 1px 1px 1px 1px #bdbdbd;
  border-radius: 0 0 15px 15px;
}
</style>
