<template>
  <div class="app-contain">
    <div class="card">
      <dv-border-box-12
        ><div class="charts charts1" ref="charts1" id="charts1"></div
      ></dv-border-box-12>
      <dv-border-box-12 style="grid-area: 1/2/2/4">
        <div class="charts charts2" id="charts2"></div>
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="charts charts3" id="charts3"></div>
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="charts charts4" id="charts4">
          <div class="title1" style="color: #fff">最近一天事件</div>
          <div class="canves">
            <div class="left" id="left"></div>
            <div class="right" id="right"></div>
          </div>
        </div>
      </dv-border-box-12>
      <dv-border-box-12>
        <div class="charts charts5" id="charts5">
          <div class="head">
            <div class="title">Top10 设备运行时长</div>
            <div class="nowTime"><i class="el-icon-time"></i>{{ gettime }}</div>
          </div>
          <el-table
            :data="deviceData"
            style="width: 100%"
            class="table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="name" label="设备名称"> </el-table-column>
            <el-table-column
              prop="runTimer"
              label="运行时长/天"
            ></el-table-column>
          </el-table>
          <vue-seamless-scroll
            :data="deviceData"
            class="seamless-warp"
            style="width: 100%"
            :class-option="classOption"
          >
            <el-table
              :data="deviceData"
              style="width: 100%"
              class="table_scroll"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                prop="name"
                label="设备名称"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{
                  scope.row.deviceName
                }}</template></el-table-column
              >
              <el-table-column
                prop="runTimer"
                label="运行时长/天"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.values
                }}</template></el-table-column
              >
            </el-table>
          </vue-seamless-scroll>
        </div></dv-border-box-12
      >
      <dv-border-box-12>
        <div class="charts charts6" id="charts6">
          <div class="head">
            <div class="title">Top10 CPU利用率(高->低)</div>
            <div class="time">
              <el-select
                v-model="value1"
                placeholder="请选择"
                size="mini"
                width="50px"
                filterable
                @change="filterCPU"
              >
                <el-option
                  v-for="item1 in options1"
                  :key="item1.value1"
                  :label="item1.label1"
                  :value="item1.value1"
                ></el-option
              ></el-select>
            </div>
          </div>
          <el-table
            :data="CPUData"
            style="width: 100%"
            class="table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="DeviceName" label="设备名称">
            </el-table-column>
            <el-table-column prop="min" label="最小"> </el-table-column>
            <el-table-column prop="max" label="最大"> </el-table-column>
            <el-table-column prop="avg" label="平均值"> </el-table-column>
          </el-table>
          <vue-seamless-scroll
            :data="CPUData"
            class="seamless-warp"
            style="width: 100%"
            :class-option="classOption"
          >
            <el-table
              :data="CPUData"
              class="table_scroll"
              style="width: 100%"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                prop="DeviceName"
                label="设备名称"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{
                  scope.row.DeviceName
                }}</template>
              </el-table-column>
              <el-table-column
                prop="min"
                label="最小"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.max }}%</template>
              </el-table-column>
              <el-table-column
                prop="max"
                label="最大"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.min }}%</template>
              </el-table-column>
              <el-table-column
                prop="avg"
                label="平均值"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.arg }}%</template>
              </el-table-column>
            </el-table>
          </vue-seamless-scroll>
        </div></dv-border-box-12
      >
      <dv-border-box-12>
        <div class="charts charts7" id="charts7">
          <div class="head">
            <div class="title">Top10 内存利用率(高->低)</div>
            <div class="time">
              <el-select
                v-model="value2"
                placeholder="请选择"
                size="mini"
                width="50px"
                filterable
                @change="filterMemory"
              >
                <el-option
                  v-for="item2 in options2"
                  :key="item2.value2"
                  :label="item2.label2"
                  :value="item2.value2"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="tableData"
            class="table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="name" label="设备名称"> </el-table-column>
            <el-table-column prop="min" label="最小"> </el-table-column>
            <el-table-column prop="max" label="最大"> </el-table-column>
            <el-table-column prop="avg" label="平均值"> </el-table-column>
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
              <el-table-column
                prop="name"
                label="设备名称"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{
                  scope.row.DeviceName
                }}</template>
              </el-table-column>
              <el-table-column
                prop="min"
                label="最小"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.max }}%</template>
              </el-table-column>
              <el-table-column
                prop="max"
                label="最大"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.min }}%</template>
              </el-table-column>
              <el-table-column
                prop="avg"
                label="平均值"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.arg }}%</template>
              </el-table-column>
            </el-table>
          </vue-seamless-scroll>
        </div></dv-border-box-12
      >
      <dv-border-box-12>
        <div class="charts charts8" id="charts8">
          <div class="head">
            <div class="title">Top10 硬盘利用率</div>
            <div class="nowTime"><i class="el-icon-time"></i>{{ gettime }}</div>
          </div>
          <el-table
            :data="hardData"
            style="width: 100%"
            class="table"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="name" label="设备名称"> </el-table-column>
            <el-table-column prop="content" label="目录"> </el-table-column>
            <el-table-column prop="total" label="总容量"> </el-table-column>
            <el-table-column prop="rate" label="利用率"> </el-table-column>
          </el-table>
          <vue-seamless-scroll
            :data="hardData"
            class="seamless-warp"
            style="width: 100%"
            :class-option="classOption"
          >
            <el-table
              :data="hardData"
              style="width: 100%"
              class="table_scroll"
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
            >
              <el-table-column
                prop="name"
                label="设备名称"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{
                  scope.row.deviceName
                }}</template>
              </el-table-column>
              <el-table-column
                prop="content"
                label="目录"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{
                  scope.row.directory
                }}</template>
              </el-table-column>
              <el-table-column
                prop="total"
                label="总容量"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.total }}</template>
              </el-table-column>
              <el-table-column
                prop="rate"
                label="利用率"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.value }}%</template>
              </el-table-column>
            </el-table>
          </vue-seamless-scroll>
        </div></dv-border-box-12
      >
    </div>
  </div>
</template>

<script>
import {
  CPUItem,
  VFSItem,
  MEMItem,
  keyword,
  countType,
  deviceType,
  grade,
} from "@/api/all";
import { eventLine } from "@/api/echarts";
import * as echarts from "echarts";
export default {
  data() {
    return {
      deviceData: [{}],
      gettime: "", //当前时间
      CPUData: [{}],
      tableData: [{}],
      hardData: [{}],
      options1: [
        {
          value1: "-24",
          label1: "近一天",
        },
        {
          value1: "-72",
          label1: "近三天",
        },
        {
          value1: "-168",
          label1: "近一个星期",
        },
        {
          value1: "-720",
          label1: "近一个月",
        },
        {
          value1: "-2160",
          label1: "近三个月",
        },
      ],
      value1: "-24",
      options2: [
        {
          value2: "-24",
          label2: "近一天",
        },
        {
          value2: "-72",
          label2: "近三天",
        },
        {
          value2: "-168",
          label2: "近一个星期",
        },
        {
          value2: "-720",
          label2: "近一个月",
        },
        {
          value2: "-2160",
          label2: "近三个月",
        },
      ],
      value2: "-24",
    };
  },
  mounted() {
    this.heathline();
    this.getDate();
    this.currentTime();
    this.getDevices();
    this.get1();
    this.get2();
  },
  computed: {
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
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
    //绘制健康环境图
    heathline() {
      var myChart1 = echarts.init(document.getElementById("charts1"));
      window.addEventListener("resize", function () {
        myChart1.resize();
      });
      var option;
      option = {
        title: {
          text: "基础环境健康状态",
          x: 5,
          y: 10,
          textStyle: { color: "#fff" },
        },
        series: [
          {
            type: "gauge",
            center: ["60%", "55%"],
            startAngle: 240,
            endAngle: -60,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: "#00beff",
            },
            progress: {
              show: true,
              width: 10,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 10,
              },
            },
            axisTick: {
              distance: -32,
              splitNumber: 10,
              lineStyle: {
                width: 0.5,
                color: "#00bfff",
              },
            },
            splitLine: {
              distance: -36,
              length: 10,
              lineStyle: {
                width: 1,
                color: "#00bfff",
              },
            },
            axisLabel: {
              distance: 15,
              color: "#00bfff",
              fontSize: 10,
            },
            anchor: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "-5%"],
              fontSize: 30,
              fontWeight: "bolder",
              formatter: "{value} 分",
              color: "inherit",
            },
            data: [
              {
                value: Math.floor(Math.random() * 3 + 90),
              },
            ],
          },
        ],
      };

      option && myChart1.setOption(option);
    },
    //绘制事件趋势图
    eventline(datalist) {
      var myChart2 = echarts.init(document.getElementById("charts2"));
      window.addEventListener("resize", function () {
        myChart2.resize();
      });
      var option;
      option = {
        title: {
          x: 5,
          y: 10,
          text: "事件趋势（近七天）",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: datalist.map((item) => item.date),
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        series: [
          {
            data: datalist.map((item) => item.count),
            type: "line",
            areaStyle: {},
            itemStyle: {
              color: "#235791",
            },
          },
        ],
      };

      option && myChart2.setOption(option);
    },
    //获取事件趋势中的数据
    getDate() {
      eventLine().then((res) => {
        this.eventline(res.data);
      });
    },
    //绘制设备数统计
    devicesline(data) {
      var myChart3 = echarts.init(document.getElementById("charts3"));
      window.addEventListener("resize", function () {
        myChart3.resize();
      });
      var option;
      let Y = [];
      data.map((data) => {
        Object.values(data).forEach((key) => {
          Y.push(key);
        });
      });
      var option = {
        title: {
          text: "设备数统计",
          top: "5% ",
          left: "1%",
          textStyle: { color: "#fff" },
        },
        tooltip: {},
        xAxis: {
          data: ["Linux", "Mysql", "Windows", "redis"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
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
        series: [
          {
            name: "设备数",
            type: "bar",
            data: Y,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    // 四个数字分别对应 数组中颜色的开始位置，分别为 右，下，左，上。例如（1,0,0,0 ）代表从右边开始渐
                    // 变。offset取值为0~1，0代表开始时的颜色，1代表结束时的颜色，柱子表现为这两种颜色的渐变。
                    offset: 0,
                    color: "#20a8cc",
                  },
                  {
                    offset: 1,
                    color: "#0082fd",
                  },
                ]),
              },
            },
          },
        ],
      };
      option && myChart3.setOption(option);
    },
    //获取设备数统计的数据
    getDevices() {
      countType().then(({ data }) => {
        this.devicesline(data);
      });
    },
    //绘制类型统计
    dataLine1(data) {
      var myChart = echarts.init(document.getElementById("left"));
      myChart.resize({
        width: 200,
        height: 180,
      });
      var option;
      const result = Object.entries(data[0]).map(([name, value]) => ({
        name,
        value,
      }));
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
          top: "30%",
          left: "left",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 8,
            color: "#fff",
          },
        },
        title: {
          text: "类型统计",
          top: "5%",
          left: "40%",
          textStyle: {
            fontSize: "15px",
            color: "#fff",
          },
        },
        color: ["#01ffff", "#00beff", "#95d4fd", "#e6307a"],
        series: [
          {
            left: "20%",
            type: "pie",
            radius: ["30%", "60%"],
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
            // data:data.forEach()
            data: result,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    //获取类型统计的数据
    get1() {
      deviceType().then(({ data }) => {
        this.dataLine1(data);
        const result = Object.entries(data[0]).map(([name, value]) => ({
          name,
          value,
        }));
        console.log(result);
      });
    },
    //绘制事件等级统计
    dataLine(data) {
      var myChart4 = echarts.init(document.getElementById("right"));
      myChart4.resize({
        width: 200,
        height: 180,
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
            return [p[0] - 35, p[1] + 10];
          },
          textStyle: {
            fontSize: 3, // 字体大小
          },
          extraCssText: "width:100px;height:40px;",
        },
        legend: {
          top: "20%",
          left: "left",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 8,
            color: "#fff",
          },
        },
        title: {
          text: "事件等级统计",
          top: "5%",
          left: "35%",
          textStyle: {
            fontSize: "15px",
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
            left: "20%",
            type: "pie",
            radius: ["30%", "60%"],
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
      option && myChart4.setOption(option);
    },
    //获取事件等级统计的数据
    get2() {
      grade().then(({ data }) => {
        this.dataLine(data);
        let dataList = [];
        for (const key in data) {
          let obj1 = { name: key, value: data[key] };
          dataList.push(obj1);
        }
        console.log(dataList);
      });
    },
    fetchData() {
      const { value1, value2 } = this;
      const params = {
        time1: value1,
        time2: value2,
      };
      CPUItem(params.time1).then((data) => {
        this.CPUData = data.data;
        for (let i of this.CPUData) {
          i.max = i.CpuUseState[0];
          i.min = i.CpuUseState[1];
          i.arg = i.CpuUseState[2];
        }
      });
      MEMItem(params.time2).then((data) => {
        this.tableData = data.data;
        for (let i of this.tableData) {
          console.log(i);
          i.max = i.CpuUseState[0];
          i.min = i.CpuUseState[1];
          i.arg = i.CpuUseState[2];
        }
      });
      VFSItem().then((data) => {
        console.log(data.data);
        this.hardData = data.data;
      });
      keyword().then((data) => {
        console.log(data);
        this.deviceData = data.data;
      });
    },
    filterCPU() {
      this.fetchData();
    },
    filterMemory() {
      console.log(1);
      this.fetchData();
    },
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
  height: 100%;
  overflow: hidden;
  ::v-deep .table_scroll .el-table__header-wrapper {
    display: none;
  }
}
.app-contain {
  width: 100%;
  height: 100%;
  margin: 13px 20px;
  color: #ebeef5;
}
.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 13px;
  width: 97%;
  height: 100%;
  padding: 10px;
  // background-color: #1b1b48;
  border-radius: 15px;
}
.charts {
  height: 200px;
  // box-shadow: 1px 1px 1px 1px #01ffff;
  // border: 1px solid #14c8ff;
  background-color: #081b31;
  border-radius: 10px;
  position: relative;
  overflow: scroll;
  margin: 5px;
}
// .charts2 {
//   grid-area: 1/2/2/4;
// }
.head {
  display: flex;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  margin: 0 10px;
  font-size: 14px;
  font-weight: bold;
  // position: fixed;
}
.head::after {
  content: "";
  width: 100%;
  position: absolute;
  border: 1px solid #ebeef5;
  top: 50px;
  left: 0;
  z-index: 999;
}
.time {
  width: 120px;
  color: #a9a8a8;
  i {
    margin-right: 3px;
  }
}

.nowTime {
  color: #bdbdbd;
}
.el-table::before {
  display: none;
}
.title1 {
  height: 10%;
  margin-top: 3%;
  margin-left: 3%;
  font-size: 18px;
  font-weight: bold;
  color: #515151;
}
.canves {
  display: flex;
}

.left {
  height: 90%;
  width: 50%;
}

.right {
  height: 90%;
  width: 50%;
}
</style>
