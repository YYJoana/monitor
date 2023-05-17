<template>
  <div class="app-container">
    <div class="header">
      <div class="title">文件检测</div>
    </div>
    <div class="content">
      <div class="left">
        <span class="left-title" style="color: #01ffff">实时数据</span>
        <div class="canves">
          <div class="canves-item1">
            <span class="fs-xl text mx-2">文件扫描雷达图</span>
            <div
              id="centreLeft2Chart"
              style="width: 4.125rem; height: 4.625rem"
            ></div>
          </div>
          <div class="canves-item2">
            <div class="rate">
              <div class="item">
                <span>文件风险率</span>
                <centerChart
                  :id="rate[0].id"
                  :tips="rate[0].tips"
                  :colorObj="rate[0].colorData"
                />
              </div>
              <div class="item">
                <span>文件可疑率</span>
                <centerChart
                  :id="rate[1].id"
                  :tips="rate[1].tips"
                  :colorObj="rate[1].colorData"
                />
              </div>
            </div>
            <div class="water">
              <dv-water-level-pond :config="water" style="height: 120px" />
            </div>
          </div>
        </div>
        <div class="hostInformation">
          <el-carousel
            indicator-position="none"
            height="170px"
            :interval="2000"
          >
            <el-carousel-item
              v-for="(item, index) in descriptions"
              :key="index"
            >
              <el-descriptions
                title="主机信息"
                class="descriptions"
                style="color: #01ffff"
              >
                <el-descriptions-item label="id">{{
                  item.device.id ? item.device.id : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="主机名">{{
                  item.device.hostName ? item.device.hostName : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="设备类型">{{
                  item.device.deviceType === 1
                    ? "Linux"
                    : item.device.deviceType === 2
                    ? "Windows"
                    : item.device.deviceType === 3
                    ? "Mysql"
                    : item.device.deviceType === 4
                    ? "Redis"
                    : "未分类"
                }}</el-descriptions-item>
                <el-descriptions-item label="设备名称">{{
                  item.device.deviceName ? item.device.deviceName : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="区域">{{
                  item.device.region ? item.device.region : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="监控类型">{{
                  item.device.monitoringType === 1 ? "监控中" : "未监控"
                }}</el-descriptions-item>
                <el-descriptions-item label="代理">{{
                  item.device.proxy ? item.device.proxy : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="状态">{{
                  item.device.state === 1 ? "正常" : "失败"
                }}</el-descriptions-item>
                <el-descriptions-item label="用户名">{{
                  item.device.userName ? item.device.userName : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="端口">{{
                  item.device.port ? item.device.port : "暂无数据"
                }}</el-descriptions-item>
                <el-descriptions-item label="更新时间">{{
                  item.device.updateTime ? item.device.updateTime : "暂无数据"
                }}</el-descriptions-item>
              </el-descriptions>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="right">
        <div class="right-title">文件类分析</div>
        <div class="container">
          <div class="container-item">
            <p class="item-title">服务器最新文件数：15条</p>
            <div class="data">
              <span>存在风险数:2</span>
              <span>总数:300</span>
            </div>
            <div class="table">
              <div class="tableData" style="display: inline-block; width: 100%">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  empty-text="暂无数据"
                  class="table"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style="{ 'text-align': 'center' }"
                >
                  <!-- <el-table-column type="index" label="序号"> </el-table-column> -->
                  <el-table-column type="host" label="主机" width="120px">
                  </el-table-column>
                  <el-table-column prop="value" label="文件名" width="120px">
                  </el-table-column>
                  <el-table-column prop="type" label="类别"> </el-table-column>
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
                    <!-- <el-table-column type="index" label="序号">
                      <template slot-scope="scope">
                        <span
                          v-if="scope.row.normal"
                          :class="{ 'text-success': scope.row.normal }"
                          >{{ scope.$index + 1 }}</span
                        >
                        <span
                          v-else-if="scope.row.normal === ''"
                          :class="{ 'text-warning': scope.row.normal === '' }"
                          >{{ scope.$index + 1 }}
                        </span>
                        <span
                          v-else
                          :class="{ 'text-danger': !scope.row.normal }"
                          >{{ scope.$index + 1 }}</span
                        ></template
                      ></el-table-column
                    > -->
                    <el-table-column
                      type="hostName"
                      label="主机"
                      width="120px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.hostName }}</template
                      ></el-table-column
                    >

                    <el-table-column
                      prop="exceptionFile"
                      label="文件名"
                      width="120px"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.exceptionFile }}</template
                      ></el-table-column
                    >
                    <el-table-column
                      type="riskName"
                      label="类别"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.riskName }}</template
                      ></el-table-column
                    >
                    <el-table-column
                      label="是否正常"
                      prop="riskLevel"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        {{ scope.row.riskLevel }}
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
import centerChart from "@/components/centerChartRate";
import {
  anomalyDetection,
  anomalyList,
  collectRiskName,
  collectIdType,
} from "@/api/hostAnomaly";
export default {
  data() {
    return {
      water: {
        data: [5, Math.floor(Math.random() * 6) + 5],
        shape: "roundRect",
        formatter: "{value}%",
        waveNum: 3,
      },
      rate: [
        {
          id: "centerRate1",
          tips: Math.floor(Math.random() * 1) + 40,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5",
              },
            },
          },
        },
        {
          id: "centerRate2",
          tips: 100 - [Math.floor(Math.random() * 1) + 40],
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad",
              },
            },
          },
        },
      ],
      tableData: [{}],
      descriptions: [],
    };
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
  components: {
    centerChart,
  },
  mounted() {
    // this.draw();
    this.getData();
  },
  created() {
    this.fetchData();
  },
  methods: {
    draw(data) {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("centreLeft2Chart")
      );
      this.chart.resize({
        width: 430,
        height: 300,
      });
      const count = [];
      const name = [];
      data.forEach((item) => {
        name.push(item.Risk_Name);
        count.push(item.count);
      });
      let option = {
        angleAxis: {
          interval: 1,
          type: "category",
          data: name,
          z: 10,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#00c7ff",
            margin: 5,
            fontSize: 10,
          },
        },
        radiusAxis: {
          min: 0,
          max: 5,
          interval: 1,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#00c7ff",
            fontSize: 16,
          },
          splitLine: {
            lineStyle: {
              color: "#00c7ff",
              width: 1,
              type: "solid",
            },
          },
        },
        // legend: {
        //   show: true,
        //   orient: "vartical",
        //   top: "center",
        //   bottom: "0%",
        //   itemWidth: 16,
        //   itemHeight: 8,
        //   itemGap: 16,
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 12,
        //     fontWeight: 0,
        //   },
        //   data: ["A"],
        // },
        polar: {},
        series: [
          {
            name: "A",
            type: "bar",
            radius: ["20%", "50%"],
            data: [
              {
                value: count[0],
                itemStyle: {
                  normal: {
                    color: "#f54d4d",
                  },
                },
              },
              {
                value: count[1],
                itemStyle: {
                  normal: {
                    color: "#f87544",
                  },
                },
              },
              {
                value: count[2],
                itemStyle: {
                  normal: {
                    color: "#ffae00",
                  },
                },
              },
              {
                value: count[3],
                itemStyle: {
                  normal: {
                    color: "#dcff00",
                  },
                },
              },
              {
                value: count[4],
                itemStyle: {
                  normal: {
                    color: "#25d053",
                  },
                },
              },
            ],
            coordinateSystem: "polar",
          },
        ],
      };
      this.chart.setOption(option);
    },
    getData() {
      collectRiskName().then(({ data }) => {
        this.draw(data);
      });
    },
    fetchData() {
      anomalyList().then(({ data }) => {
        this.tableData = data;
      });
      collectIdType().then((res) => {
        this.descriptions = res.data;
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
  color: red;
}

.text-warning {
  color: orange;
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

.content {
  display: flex;
  justify-content: space-between;
}

.canves {
  display: flex;
  justify-content: space-around;
}
.canves-item1 {
  width: 400px;
  height: 360px;
  padding-top: 20px;
  // border: 1px solid;
}
.canves-item2 {
  margin: 30px;
  width: 270px;
  height: 300px;
  padding: 5px;
  border: 1px solid #b6b6b6;
  border-radius: 10px;
  display: grid;
  grid-auto-columns: repeat(2, 1fr);
  .rate {
    display: flex;
    justify-content: space-around;
    .item {
      font-size: 15px;
      text-align: center;
    }
  }
}
.right {
  width: 450px;
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

.left-title {
  font-size: 16px;
  font-weight: 700;
  padding-top: 8px;
}
.left {
  width: 800px;
}
.container {
  display: flex;
  justify-content: space-evenly;
  .container-item {
    width: 401.6px;
  }
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
    height: 400px;
    overflow: hidden;
  }
}

.hostInformation {
  margin: 10px 0;
  height: 200px;
}

.el-descriptions-item {
  color: #fff;
}
</style>
