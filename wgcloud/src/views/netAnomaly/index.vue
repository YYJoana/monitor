<template>
  <div class="app-container">
    <div class="header">
      <div class="title">流量检测</div>
      <!-- <div class="alarm">报警</div> -->
    </div>
    <div class="content">
      <div class="left">
        <span style="color: #01ffff">实时数据</span>
        <div class="charts">
          <div class="canves1" id="canves1"></div>
          <div class="canves2" id="canves2">
            <div class="text">实时攻击率</div>
            <dv-decoration-12 class="dv-decoration-12"
              ><div class="rate" style="">
                攻击率：{{ (Math.random() * 0.8 + 0.1).toFixed(2) }}%
              </div></dv-decoration-12
            >
          </div>
        </div>
        <div class="abnormal">今天异常情况</div>
      </div>
      <div class="right">
        <div class="right-title">流量分析</div>
        <div class="container">
          <div class="container-item">
            <div class="table">
              <div
                class="tableData"
                style="display: inline-block; width: 100%%"
              >
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  empty-text="暂无数据"
                  class="table"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <el-table-column type="index" label="序号"> </el-table-column>
                  <el-table-column prop="value" label="djit" width="90px">
                  </el-table-column>
                  <el-table-column prop="value" label="sloss" width="90px">
                  </el-table-column>
                  <el-table-column prop="value" label="smeansz" width="90px">
                  </el-table-column>
                  <el-table-column prop="value" label="dur" width="90px">
                  </el-table-column>
                  <el-table-column prop="value" label="dbytes" width="90px">
                  </el-table-column>
                  <el-table-column label="是否正常" prop="normal">
                  </el-table-column>
                </el-table>
                <vue-seamless-scroll
                  :data="tableData"
                  class="seamless-warp"
                  style="width: 100%"
                  :class-option="classOption"
                >
                  <el-table
                    :data="tableData"
                    class="table_scroll"
                    style="width: 100%"
                    :header-cell-style="{ 'text-align': 'center' }"
                    :cell-style="{ 'text-align': 'center' }"
                  >
                    <el-table-column type="index" label="序号">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === 'Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          >{{ scope.$index + 1 }}</span
                        >
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          >{{ scope.$index + 1 }}</span
                        >
                      </template></el-table-column
                    >
                    <el-table-column
                      type="host"
                      label="特征值1"
                      width="90px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === ' Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          >{{ scope.row.dur }}</span
                        >
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          >{{ scope.row.dur }}</span
                        >
                        <!-- {{ scope.row.dur }} -->
                      </template></el-table-column
                    >

                    <el-table-column
                      prop="value"
                      label="特征值2"
                      width="90px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === 'Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          >{{ scope.row.dbytes }}</span
                        >
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          >{{ scope.row.dbytes }}</span
                        >
                        <!-- {{ scope.row.dbytes }} -->
                      </template></el-table-column
                    >
                    <el-table-column
                      type="type"
                      label="特征值3"
                      width="90px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === ' Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          >{{ scope.row.smeansz }}</span
                        >
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          >{{ scope.row.smeansz }}</span
                        >
                        <!-- {{ scope.row.smeansz }} -->
                      </template></el-table-column
                    >
                    <el-table-column
                      prop="value"
                      label="特征值4"
                      width="90px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === 'Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          >{{ scope.row.sloss }}</span
                        >
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          >{{ scope.row.sloss }}</span
                        >
                        <!-- {{ scope.row.sloss }} -->
                      </template></el-table-column
                    >
                    <el-table-column
                      prop="value"
                      label="特征值5"
                      width="90px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === 'Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          >{{ scope.row.djit }}</span
                        >
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          >{{ scope.row.djit }}</span
                        >
                        <!-- {{ scope.row.djit }} -->
                      </template></el-table-column
                    >
                    <el-table-column label="是否正常" prop="attackCat">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.attackCat === 'Normal'"
                          :class="{ 'text-success': scope.row.attackCat }"
                          ><i class="el-icon-check"></i
                        ></span>
                        <span
                          v-else
                          :class="{
                            'text-danger': scope.row.attackCat !== 'Normal',
                          }"
                          ><i class="el-icon-close"></i
                        ></span>
                      </template>
                    </el-table-column>
                  </el-table>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { flowList } from "@/api/netAnomaly";
export default {
  data() {
    return {
      tableData: [{}],
    };
  },
  mounted() {
    this.eventLine();
  },
  computed: {
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.tableList
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    eventLine() {
      var myChart1 = echarts.init(document.getElementById("canves1"));
      myChart1.resize({
        width: 400,
        height: 300,
      });
      var option;
      option = {
        color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],
        legend: {},
        radar: [
          {
            indicator: [
              { text: "djit" },
              { text: "sloss" },
              { text: "smeansz" },
              { text: "dur" },
              { text: "dbytes" },
            ],
            center: ["50%", "50%"],
            radius: 110,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            axisName: {
              formatter: "【{value}】",
              color: "#01b0ff",
            },
            splitArea: {
              areaStyle: {
                color: ["#77EADF", "#26C3BE", "#64AFE9", "#428BD4"],
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
              },
            },
          },
        ],
        series: [
          {
            type: "radar",
            emphasis: {
              lineStyle: {
                width: 4,
              },
            },
            data: [
              {
                value: [100, 8, 0.4, -80, 2000],
                // name: "Data A",
              },
              {
                value: [60, 5, 0.3, -100, 1500],
                // name: "Data B",
                areaStyle: {
                  color: "rgba(255, 228, 52, 0.6)",
                },
              },
            ],
          },
        ],
      };
      option && myChart1.setOption(option);
    },
    fetchData() {
      flowList().then(({ data }) => {
        console.log(data);
        this.tableData = data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  color: #fff;
}
.table.el-table {
  height: 34px;
  box-sizing: border-box;
  tbody {
    //隐藏上面表格的tbody
    display: none;
    overflow: hidden;
  }
}
// 重点注意这段样式
.seamless-warp {
  height: 100%;
  overflow: hidden;
  ::v-deep .table_scroll .el-table__header-wrapper {
    display: none;
  }
}
.text-danger {
  color: #e63078;
}
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
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.title {
  width: 90%;
  height: 10%;
  margin: 20px;
  font-size: 30px;
  color: #01ffff;
  font-weight: bolder;
  text-align: center;
  position: relative;
}
.title::after {
  position: absolute;
  content: "";
  width: 300px;
  border: 1px solid #01ffff;
  top: 18px;
  left: 16%;
}
.title::before {
  position: absolute;
  content: "";
  width: 300px;
  border: 1px solid #01ffff;
  top: 18px;
  left: 57%;
}

.alarm {
  width: 60px;
  height: 30px;
  margin: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #01ffff;
  border-radius: 5px;
}

.content {
  display: flex;
  justify-content: space-between;
}

.charts {
  padding-top: 50px;
  display: flex;
}

.right {
  width: 600px;
  height: 550px;
  border: 1px solid #01ffff;
  border-radius: 10px;
}
.right-title {
  text-align: center;
  padding: 10px;
  border: 1px solid #01ffff;
  width: 120px;
  margin: auto;
  font-style: oblique;
  font-weight: bold;
}

.container {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
  .item-title {
    text-align: center;
  }
}

.data {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
}

.table {
  .tableData {
    // border: 1px solid;
    border-radius: 0 0 5px 5px;
    height: 500px;
    overflow: hidden;
  }
}

.abnormal {
  margin-top: 60px;
  color: #01ffff;
}

.text {
  width: 230px;
  border: 1px solid;
  border-top: none #b6b6b6;
  border-left: none #b6b6b6;
  border-right: none #b6b6b6;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.canves2 {
  width: 230px;
  height: 270px;
  border: 1px solid #b6b6b6;
  margin: 0 30px;
  border-radius: 10px;
}

.dv-decoration-12 {
  width: 170px;
  height: 170px;
  margin: 30px;
}
</style>
