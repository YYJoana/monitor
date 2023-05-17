<template>
  <div class="app-container">
    <div class="card">
      <dv-border-box-6>
        <div class="charts charts1" id="charts1">
          <div class="item-title">
            设备健康状态
            <div class="time"><i class="el-icon-time"></i>{{ gettime }}</div>
          </div>
          <div style="display: inline-block; width: 100%">
            <el-table
              :data="healthData"
              style="width: 100%"
              empty-text="暂无数据"
              class="table"
            >
              <el-table-column prop="name" label="设备名称" align="center"
                ><template slot-scope="scope">{{
                  scope.row.deviceName
                }}</template>
              </el-table-column>
              <el-table-column prop="heathState" label="健康状态" align="center"
                ><template slot-scope="scope">
                  <i
                    :class="{
                      'el-icon-circle': scope.row.redisHealthy === 1,
                      'el-icon-circle-plus': scope.row.redisHealthy === 0,
                    }" /></template
              ></el-table-column>
            </el-table>
            <div @click="handleClick($event)">
              <vue-seamless-scroll
                :data="healthData"
                class="seamless-warp"
                style="width: 100%; height: 100px"
                :class-option="classOption"
              >
                <el-table
                  :data="healthData"
                  style="width: 100%"
                  empty-text="暂无数据"
                  class="table_scroll"
                >
                  <el-table-column prop="name" label="设备名称" align="center"
                    ><template slot-scope="scope"
                      ><span
                        @click="deviceHandle(scope.row)"
                        style="cursor: pointer"
                        :data-obj="JSON.stringify(healthData)"
                        :id="scope.row.deviceId"
                        >{{ scope.row.deviceName }}
                      </span></template
                    >
                  </el-table-column>
                  <el-table-column
                    prop="heathState"
                    label="健康状态"
                    align="center"
                    ><template slot-scope="scope">
                      <i
                        :class="{
                          'el-icon-circle': scope.row.redisHealthy === 1,
                          'el-icon-circle-plus': scope.row.redisHealthy === 0,
                        }" /></template
                  ></el-table-column>
                </el-table>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </dv-border-box-6>
      <dv-border-box-6>
        <div class="charts charts2" id="charts2">
          <div class="item-title">
            运行时长(天)
            <div class="time"><i class="el-icon-time"></i>{{ gettime }}</div>
          </div>
          <el-table :data="timeData" style="width: 100%">
            <el-table-column
              prop="name"
              label="设备名称"
              align="center"
              :show-overflow-tooltip="true"
              ><template slot-scope="scope">{{
                scope.row.name
              }}</template></el-table-column
            >
            <el-table-column
              prop="IP"
              label="IP"
              align="center"
              :show-overflow-tooltip="true"
              ><template slot-scope="scope">{{
                scope.row.deviceIp
              }}</template></el-table-column
            >
            <el-table-column
              prop="值"
              label="值"
              align="center"
              :show-overflow-tooltip="true"
              ><template slot-scope="scope">{{
                scope.row.value
              }}</template></el-table-column
            >
          </el-table>
        </div>
      </dv-border-box-6>
      <dv-border-box-6>
        <div class="charts charts3">
          <div class="item-title">事件统计</div>
          <div id="charts3"></div>
        </div>
      </dv-border-box-6>
      <dv-border-box-6>
        <div class="charts charts4">
          <!-- <div class="title2">Redis连接的客户端数</div> -->
          <div id="charts4"></div>
        </div>
      </dv-border-box-6>
      <dv-border-box-6>
        <div class="charts charts5">
          <div class="item-title">Redis所占用CPU资源</div>
          <div id="charts5">
            <el-table :data="cpuData" style="width: 100%">
              <el-table-column
                prop="name"
                label="设备名称"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.name
                }}</template></el-table-column
              >
              <el-table-column
                prop="IP"
                label="IP"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.deviceIp
                }}</template></el-table-column
              >
              <el-table-column
                prop="值"
                label="值"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.value
                }}</template></el-table-column
              >
            </el-table>
          </div>
        </div>
      </dv-border-box-6>
      <dv-border-box-6>
        <div class="charts charts6">
          <!-- <div class="title2">Redis数量集所占内存大小</div> -->
          <div id="charts6"></div>
        </div>
      </dv-border-box-6>
      <dv-border-box-6>
        <div class="charts charts7">
          <!-- <div class="title2">Redis内存消耗峰值</div> -->
          <div id="charts7"></div>
        </div>
      </dv-border-box-6>
      <dv-border-box-6 style="grid-area: 2/3/4/4">
        <div class="charts charts8">
          <div class="item-title">事件明细</div>
          <div id="charts8">
            <el-table :data="eventData" style="width: 100%">
              <el-table-column
                prop="time"
                label="时间"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.updateTime
                }}</template></el-table-column
              >
              <el-table-column
                prop="name"
                label="设备名"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.hostName
                }}</template></el-table-column
              >
              <!-- <el-table-column
                prop="state"
                label="状态"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.state === 1 ? "正常" : "失败"
                }}</template></el-table-column
              > -->
              <el-table-column
                prop="desc"
                label="描述"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.infoContent
                }}</template></el-table-column
              >
            </el-table>
          </div>
        </div>
      </dv-border-box-6>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  redisHealthy,
  redisLogin,
  logDetails,
  history,
  redisValues,
} from "@/api/redis";
export default {
  data() {
    return {
      healthData: [{}],
      eventData: [{}],
      timeData: [{}],
      cpuData: [{}],
      data: [{}],
      gettime: "", //当前时间
    };
  },
  mounted() {
    this.currentTime();
    this.getDate();
    // this.customLine();
    this.getCustom();
    // this.dataLine();
    this.get();
    // this.topLine();
    this.getTop();
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
    //获取当前时间
    getTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      var mm =
        new Date().getMonth() > 9
          ? new Date().getMonth() + 1
          : new Date().getMonth() == 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1);
      var dd =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      this.getTime();
    },
    //绘制事件统计
    eventLine(data) {
      var myChart1 = echarts.init(document.getElementById("charts3"));
      myChart1.resize({
        width: 400,
        height: 150,
      });
      var option;
      let dataList = [];
      for (const key in data) {
        let obj1 = { name: key, value: data[key] };
        dataList.push(obj1);
      }
      option = {
        tooltip: {
          trigger: "item",
          position: function (p) {
            //其中p为当前鼠标的位置
            return [p[0] + 35, p[1] - 10];
          },
          textStyle: {
            fontSize: 3, // 字体大小
          },
          extraCssText: "width:120px;height:40px;",
        },
        legend: {
          top: "10%",
          left: "10%",
          orient: "vertical",
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        color: [
          "#95d4fd",
          "#00beff",
          "#225690",
          "#203270",
          "#e6307a",
          "#ed6942",
        ],
        series: [
          {
            left: "15%",
            // top: "10%",
            type: "pie",
            radius: ["35%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 10,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: dataList,
          },
        ],
      };

      option && myChart1.setOption(option);
    },
    //获取事件统计数据
    getDate() {
      redisLogin().then(({ data }) => {
        this.eventLine(data);
      });
    },
    //绘制Redis连接的客户端数
    customLine(data) {
      var myChart2 = echarts.init(document.getElementById("charts4"));
      myChart2.resize({
        width: 415,
        height: 200,
      });
      var option;
      const arr = data[Object.keys(data)];
      arr.sort((a, b) => new Date(a.updateTime) - new Date(b.updateTime));
      let updateTime = [];
      let value = [];
      arr.forEach((obj) => {
        updateTime.push(obj.updateTime);
        value.push(obj.valus);
      });
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          top: "5%",
          text: "Redis连接的客户端数",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: updateTime,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "10px",
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "10px",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#102b4b"],
              width: 1,
              type: "solid",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        grid: { left: "15%" },
        series: [
          {
            left: "30%",
            name: "客户端数",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#235791",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0d9cbc",
                },
                {
                  offset: 1,
                  color: "#235791",
                },
              ]),
            },
            data: value,
          },
        ],
      };
      option && myChart2.setOption(option);
    },
    getCustom() {
      redisHealthy().then(({ data }) => {
        console.log(data[0].deviceId);
        history("connected_clients", data[0].deviceId).then(({ data }) => {
          console.log(Object.keys(data));
          this.customLine(data);
        });
      });
    },
    //绘制Redis数量集所占内存大小
    dataLine(data) {
      var myChart6 = echarts.init(document.getElementById("charts6"));
      myChart6.resize({
        width: 415,
        height: 200,
      });
      var option;
      const arr = data[Object.keys(data)];
      arr.sort((a, b) => new Date(a.updateTime) - new Date(b.updateTime));
      let updateTime = [];
      let value = [];
      arr.forEach((obj) => {
        updateTime.push(obj.updateTime);
        value.push(obj.valus);
      });
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          top: "5%",
          text: "Redis数量集所占内存大小",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: updateTime,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "10px",
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "10px",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#102b4b"],
              width: 1,
              type: "solid",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 40,
            end: 60,
          },
          {
            start: 40,
            end: 60,
          },
        ],
        grid: { left: "15%" },
        series: [
          {
            name: "内存大小",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#235791",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0d9cbc",
                },
                {
                  offset: 1,
                  color: "#235791",
                },
              ]),
            },
            data: value,
          },
        ],
      };
      option && myChart6.setOption(option);
    },
    get() {
      redisHealthy().then(({ data }) => {
        console.log(data[0].deviceId);
        history("used_memory_dataset", data[0].deviceId).then(({ data }) => {
          this.dataLine(data);
        });
      });
    },
    //绘制Redis内存消耗峰值
    topLine(data) {
      var myChart7 = echarts.init(document.getElementById("charts7"));
      myChart7.resize({
        width: 415,
        height: 200,
      });
      var option;
      const arr = data[Object.keys(data)];
      arr.sort((a, b) => new Date(a.updateTime) - new Date(b.updateTime));
      let updateTime = [];
      let value = [];
      arr.forEach((obj) => {
        updateTime.push(obj.updateTime);
        value.push(obj.valus);
      });
      option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          top: "5%",
          text: "Redis内存消耗峰值",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: updateTime,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "10px",
            },
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "10px",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#102b4b"],
              width: 1,
              type: "solid",
            },
          },
        },
        grid: { left: "15%" },
        dataZoom: [
          {
            type: "inside",
            start: 40,
            end: 60,
          },
          {
            start: 40,
            end: 60,
          },
        ],
        series: [
          {
            name: "内存消耗峰值",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#235791",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#0d9cbc",
                },
                {
                  offset: 1,
                  color: "#235791",
                },
              ]),
            },
            data: value,
          },
        ],
      };
      option && myChart7.setOption(option);
    },
    getTop() {
      redisHealthy().then(({ data }) => {
        console.log(data[0].deviceId);
        history("used_memory_peak", data[0].deviceId).then(({ data }) => {
          this.topLine(data);
        });
      });
    },
    fetchData() {
      redisHealthy().then(({ data }) => {
        this.healthData = data;
      });
      logDetails().then(({ data }) => {
        this.eventData = data;
      });
      redisValues("uptime", "3").then(({ data }) => {
        this.timeData = data;
        for (const i of data) {
          i.name = i.deviceInfo.deviceName;
          i.deviceIp = i.deviceInfo.deviceIp;
        }
      });
      redisValues("used_cpu_sys", "3").then(({ data }) => {
        this.cpuData = data;
        for (const i of data) {
          i.name = i.deviceInfo.deviceName;
          i.deviceIp = i.deviceInfo.deviceIp;
        }
      });
    },
    handleClick($event) {
      const obj = JSON.parse($event.target.dataset.obj);
      let deviceId = $event.target.id;
      console.log(deviceId);
      history("used_memory_peak", deviceId).then(({ data }) => {
        this.topLine(data);
      });
      history("used_memory_dataset", deviceId).then(({ data }) => {
        this.dataLine(data);
      });
      history("connected_clients", deviceId).then(({ data }) => {
        this.customLine(data);
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
  height: 180px;
  overflow: hidden;
  ::v-deep .table_scroll .el-table__header-wrapper {
    display: none;
  }
}

.el-icon-circle {
  width: 12px;
  height: 12px;
  background: #01b0ff;
  border-radius: 50%;
}
.el-icon-circle-plus {
  width: 12px;
  height: 12px;
  background: #ed6942;
  border-radius: 50%;
}
.app-contain {
  width: 100%;
  height: 100%;
  margin: 1px 20px;
  color: #ebeef5;
}

.time {
  color: #a9a8a8;
  i {
    margin-right: 3px;
  }
}
.card {
  width: 100%;
  height: 100%;
  // padding: 10px;
  // background-color: #081b31;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  // margin: 0 10px;
}
.canves {
  position: relative;
}
.canves::after {
  border: 1px solid #dddbdb;
  content: "";
  left: 350px;
  top: 10px;
  height: 90%;
  position: absolute;
}
.content {
  position: relative;
  width: 25%;
}
.content::after {
  border: 1px solid #dddbdb;
  content: "";
  left: 100%;
  top: 10px;
  height: 90%;
  position: absolute;
}
.table {
  width: 47%;
}
.charts {
  background-color: #081b31;
  // box-shadow: 1px 1px 1px 1px #bdbdbd;
  margin: 5px;
  height: 100%;
  border-radius: 10px;
}

.charts8 {
  grid-area: 2/3/4/4;
  height: 97%;
}

.charts1,
.charts2,
.charts3,
.charts4,
.charts5,
.charts6,
.charts7 {
  height: 200px;
  position: relative;
}

.item-title {
  height: 20%;
  background: #111e2f;
  color: #fff;
  border-bottom: 1px solid #1b384a;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
}

.title2 {
  height: 20%;
  padding: 15px 10px;
  z-index: -20;
}
.charts8 .item-title {
  height: 10%;
}
</style>
