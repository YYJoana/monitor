<template>
  <!-- 对话框 -->
  <div class="dialogContainer" ref="dialogContainer">
    <div class="dialogHeader">
      <div class="title">{{ rowData.deviceName }}</div>
      <div class="cancelBtn" @click="cancelBtnHeader">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="content">
      <div class="indicate">
        <ul>
          <li>
            <el-button type="text" @click="overviewHandle"
              >总<br />览</el-button
            >
            <span
              class="triangle_border_left"
              ref="triangle_border_left1"
              style="top: 17%"
            ></span>
          </li>
          <li>
            <el-button type="text" @click="targetbtnhandle"
              >指<br />标</el-button
            >
            <span
              class="triangle_border_left"
              ref="triangle_border_left2"
              style="display: none; top: 42%"
            ></span>
          </li>
          <li>
            <el-button type="text" @click="triggerbtnhandle"
              >触<br />发<br />器
            </el-button>
            <span
              class="triangle_border_left"
              ref="triangle_border_left3"
              style="display: none; top: 75%"
            ></span>
          </li>
        </ul>
      </div>
      <div
        class="right-container right-container1"
        id="rightContainer1"
        v-show="isshowcontainer1"
      >
        <div ref="charts1">
          <div class="description">
            <div class="descform">
              <p class="descItem">状态:</p>
              <p v-if="openData.state == 1">监控中</p>
              <p v-else>未监控</p>
              <p class="descItem">ip:</p>
              <p>{{ openData.Ip ? openData.Ip : "暂无数据" }}</p>
              <p class="descItem">设备名:</p>
              <p>
                {{ openData.deviceName ? openData.deviceName : "暂无数据" }}
              </p>
              <p class="descItem">CPU核数:</p>
              <p>{{ openData.CPU ? openData.CPU : "暂无数据" }}</p>
              <p class="descItem">内存总大小:</p>
              <p>{{ openData.mem ? openData.mem : "暂无数据" }}</p>
              <p class="descItem">硬盘总大小:</p>
              <p>
                {{ openData.vfs ? openData.vfs : "暂无数据" }}
              </p>
              <p class="descItem">设备运行时长:</p>
              <p>{{ openData.time ? openData.time : "暂无数据" }}</p>
              <p class="descItem">事件总大小:</p>
              <p>{{ openData.date ? openData.date : "暂无数据" }}</p>
            </div>
          </div>
          <div class="canves">
            <dv-border-box-7 style="grid-area: 1/1/2/3">
              <div
                class="canves1"
                id="canves1"
                style="width: 100%; height: 200px"
              ></div
            ></dv-border-box-7>
            <dv-border-box-7>
              <div class="canves2" id="canves2"></div
            ></dv-border-box-7>
            <dv-border-box-7>
              <div class="canves3" id="canves3"></div
            ></dv-border-box-7>
          </div>
        </div>
        <div class="chart2" ref="charts2">
          <div class="description">
            <div class="descform">
              <p class="descItem">Redis版本:</p>
              <p>{{ this.data.version ? this.data.version : "暂无数据" }}</p>
              <p class="descItem">Redis模式:</p>
              <p>{{ this.data.mode ? this.data.mode : "暂无数据" }}</p>
              <p class="descItem">正常运行时间:</p>
              <p>{{ this.data.uptime ? this.data.uptime : "暂无数据" }}</p>
              <p class="descItem">总系统内存:</p>
              <p>{{ this.data.memory ? this.data.memory : "暂无数据" }}</p>
              <p class="descItem">操作系统:</p>
              <p>{{ this.data.os ? this.data.os : "暂无数据" }}</p>
              <p class="descItem">gcc版本:</p>
              <p>{{ this.data.gcc ? this.data.gcc : "暂无数据" }}</p>
            </div>
          </div>
          <div class="canves">
            <dv-border-box-7 style="grid-area: 1/1/2/3">
              <div
                class="canves1"
                id="canves4"
                style="width: 100%; height: 200px"
              ></div
            ></dv-border-box-7>
            <dv-border-box-7>
              <div class="canves2" id="canves5"></div
            ></dv-border-box-7>
            <dv-border-box-7>
              <div class="canves3" id="canves6"></div
            ></dv-border-box-7>
          </div>
        </div>
        <div class="chart3" ref="charts3">
          <div class="description">
            <div class="descform">
              <p class="descItem">最大连接大小:</p>
              <p>{{ this.form.size ? this.form.size : "暂无数据" }}</p>
              <p class="descItem">MySQL版本信息:</p>
              <p>{{ this.form.version ? this.form.version : "暂无数据" }}</p>
              <p class="descItem">正常运行时间:</p>
              <p>{{ this.form.uptime ? this.form.uptime : "暂无数据" }}</p>
              <p class="descItem">正在运行的线程数:</p>
              <p>{{ this.form.threads ? this.form.threads : "暂无数据" }}</p>
              <p class="descItem">最大连接数:</p>
              <p>
                {{ this.form.connections ? this.form.connections : "暂无数据" }}
              </p>
              <p class="descItem">慢查询数量:</p>
              <p>{{ this.form.queries ? this.form.queries : "暂无数据" }}</p>
            </div>
          </div>
          <div class="canves">
            <dv-border-box-7 style="grid-area: 1/1/2/3">
              <div
                class="canves1"
                id="canves7"
                style="width: 100%; height: 200px"
              ></div
            ></dv-border-box-7>
            <dv-border-box-7>
              <div class="canves2" id="canves8"></div
            ></dv-border-box-7>
            <dv-border-box-7>
              <div class="canves3" id="canves9"></div
            ></dv-border-box-7>
          </div>
        </div>
      </div>
      <div
        class="right-container right-container2"
        id="rightContainer2"
        v-show="isshowcontainer2"
      >
        <div class="description2">
          <div class="applications">
            <div class="title">应用集:</div>
            <a
              v-for="(item, index) in applications"
              :key="index"
              ref="activeColor"
              :class="{ activeColor: colorIndex === index }"
              @click="searchHandle(item, index)"
            >
              {{ item.name }}({{ item.total }})
            </a>
          </div>
          <div class="app-table">
            <el-table
              v-loading="listLoading"
              ref="multipleTable"
              :data="applicationsData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              element-loading-spinner="el-icon-loading"
              element-loading-text="加载中"
              element-loading-background="#061125"
            >
              <el-table-column
                prop="Name"
                label="名称"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.itemName }}
                </template>
              </el-table-column>
              <el-table-column
                prop="keyWord"
                label="关键字"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.keyWord }}
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="最新数据"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope"
                  >{{ scope.row.values === -1 ? "-" : scope.row.values }}
                </template>
              </el-table-column>
              <el-table-column
                prop="application"
                label="最新时间"
                align="center"
                :show-overflow-tooltip="true"
                ><template slot-scope="scope">{{
                  scope.row.updateTime
                }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pager"
              style="margin-top: 30px"
              background
              :page-size="pageSize"
              :page-sizes="[5, 10, 20]"
              layout="prev, pager, next,total,->,jumper"
              :total="count"
              :current-page.sync="pagerCurrentPage"
              @size-change="sizeChange"
              @current-change="currentChange"
              @prev-click="prevClick"
              @next-click="nextClick"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div
        class="right-container right-container3"
        id="rightContainer3"
        v-show="isshowcontainer3"
      >
        <div class="description2">
          <el-table
            v-loading="listLoading"
            ref="multipleTable"
            :data="triggerData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            element-loading-spinner="el-icon-loading"
            element-loading-text="加载中"
            element-loading-background="#061125"
          >
            <el-table-column
              prop="triggerName"
              label="触发器名称"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.triggerName }}
              </template>
            </el-table-column>
            <el-table-column
              prop="triggerExpress"
              label="表达式"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{ scope.row.triggerExpress }}
              </template>
            </el-table-column>
            <el-table-column
              prop="triggerSeverity"
              label="级别"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{
                  scope.row.triggerSeverity === "1"
                    ? "未分类"
                    : scope.row.triggerSeverity === "2"
                    ? "正常"
                    : scope.row.triggerSeverity === "3"
                    ? "警告"
                    : scope.row.triggerSeverity === "4"
                    ? "一般严重"
                    : scope.row.triggerSeverity === "5"
                    ? "严重"
                    : "灾难"
                }}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pager"
            style="margin-top: 30px"
            background
            :page-size="eachPage"
            :page-sizes="[5, 10, 20]"
            layout="prev, pager, next,total,->,jumper"
            :total="count"
            :current-page.sync="pagerPageNum"
            @size-change="sizeChangehandle"
            @current-change="currentChangehandle"
            @prev-click="prevClickhandle"
            @next-click="nextClickhandle"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  trigger,
  Applications,
  ApplicationsList,
  totalDisk,
  CpuUsed,
  count,
  RedisItems,
  numItems,
  RedisCount,
  historykeyword,
  mysqlHistory,
} from "@/api/popup";
export default {
  name: "Child",
  props: ["openData", "rowData"],
  data() {
    return {
      applicationsData: [{}],
      listLoading: false,
      applications: [{}],
      triggerData: [],
      isshowcontainer1: true,
      isshowcontainer2: false,
      isshowcontainer3: false,
      eachPage: 8, //每一页显示的条数
      pageSize: 7, //每一页显示的条数
      PageNum: 1,
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      totalCount: 0,
      pagerCurrentPage: 1, //分页栏当前页面
      pagerPageNum: 1,
      colorIndex: "",
      data: {
        version: "",
        mode: "",
        uptime: "",
        memory: "",
        os: "",
        gcc: "",
      },
      form: {
        size: "",
        version: "",
        uptime: "",
        threads: "",
        connections: "",
        queries: "",
      },
    };
  },
  methods: {
    //CPU核心数
    eventline1(data) {
      var myChart1 = echarts.init(document.getElementById("canves1"));
      var option;
      myChart1.resize({
        width: 750,
        height: 200,
      });
      const times = data.MEM.concat(data.CPU).map((entry) => entry.updateTime);
      // 按时间升序排序
      times.sort();

      // 创建空数组
      let a = [];
      let b = [];

      // 遍历数组并将数据点与该时间戳的索引匹配
      times.forEach((time, index) => {
        // 根据时间戳查找 MEM 数组中的数据点
        const memEntry = data.MEM.find((entry) => entry.updateTime === time);
        // 如果找到了，则将值添加到 a 中；否则添加 0
        if (memEntry) {
          a.push(memEntry.valus);
        } else {
          a.push(0);
        }

        // 根据时间戳查找 CPU 数组中的数据点
        const cpuEntry = data.CPU.find((entry) => entry.updateTime === time);
        // 如果找到了，则将值添加到 b 中；否则添加 0
        if (cpuEntry) {
          b.push(cpuEntry.valus);
        } else {
          b.push(0);
        }
      });
      option = {
        title: {
          text: "指标趋势",
          left: "center",
          textStyle: { color: "#fff" },
        },
        grid: {
          bottom: 80,
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
          iconStyle: {
            borderColor: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#505765",
            },
          },
        },
        legend: {
          data: ["MEM", "CPU"],
          textStyle: { color: "#fff" },
          left: 10,
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: false },
            // prettier-ignore
            data:times,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "MEM(个)",
            nameTextStyle: {
              color: "#fff",
            },
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
          {
            name: "CPU(个)",
            nameTextStyle: {
              color: "#fff",
            },
            nameLocation: "start",
            alignTicks: true,
            type: "value",
            inverse: true,
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
        ],
        series: [
          {
            name: "MEM",
            type: "line",
            areaStyle: {},
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              data: [
                [
                  {
                    xAxis: "2023/3/20\n7:00",
                  },
                  {
                    xAxis: "2023/4/20\n7:00",
                  },
                ],
              ],
            },
            // prettier-ignore
            data: a,
          },
          {
            name: "CPU",
            type: "line",
            yAxisIndex: 1,
            areaStyle: {},
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              data: [
                [
                  {
                    xAxis: "2023/3/20\n7:00",
                  },
                  {
                    xAxis: "2023/4/20\n7:00",
                  },
                ],
              ],
            },
            // prettier-ignore
            data:b,
          },
        ],
      };

      option && myChart1.setOption(option);
    },
    getDate1(id) {
      // console.log(id);
      CpuUsed(id).then(({ data }) => {
        this.eventline1(data);
      });
    },
    //磁盘总大小
    eventline(data) {
      var myChart2 = echarts.init(document.getElementById("canves2"));
      myChart2.resize({
        width: 350,
        height: 200,
      });
      const keys = ["磁盘总大小", "使用率", "使用大小", "剩余大小"];
      const values = Object.values(data[0].diskInfo).map((value) =>
        parseFloat(value.toFixed(2))
      );
      var option;
      if (data === []) {
        //暂无数据
        option = {
          title: {
            text: "暂无数据",
            x: "center",
            y: "center",
            textStyle: {
              fontSize: 14,
              fontWeight: "normal",
            },
          },
        };
      } else {
        option = {
          legend: {
            top: "5%",
            right: "5%",
          },
          title: {
            text: "磁盘信息",
            top: "5%",
            left: "3%",
            textStyle: {
              fontSize: "17px",
              color: "#fff",
            },
          },
          tooltip: {},
          xAxis: {
            type: "category",
            data: keys,
            axisLabel: {
              textStyle: {
                fontSize: "10",
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
              data: values,
              type: "bar",
            },
          ],
        };
      }

      option && myChart2.setOption(option);
    },
    getDate(id) {
      totalDisk(id).then(({ data }) => {
        this.eventline(data);
      });
    },
    //类型统计
    event(datalist) {
      var myChart3 = echarts.init(document.getElementById("canves3"));
      myChart3.resize({
        width: 400,
        height: 200,
      });
      var option;
      const result = Object.entries(datalist[0]).map(([name, value]) => ({
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
          top: "20%",
          left: "5%",
          orient: "vertical",
          itemWidth: 15,
          itemHeight: 15,
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        title: {
          text: "类型统计",
          top: "5%",
          left: "45%",
          textStyle: {
            fontSize: 17,
            color: "#fff",
          },
        },
        color: [
          "#01ffff",
          "#00beff",
          "#95d4fd",
          "#e6307a",
          "#225690",
          "#203270",
        ],
        series: [
          {
            left: "10%",
            top: "10%",
            type: "pie",
            radius: ["35%", "80%"],
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

      option && myChart3.setOption(option);
    },
    getEvent(id) {
      count(id).then(({ data }) => {
        this.event(data);
      });
    },
    //Redis内存消耗峰值
    TopLine(data) {
      var canves4 = echarts.init(document.getElementById("canves4"));
      canves4.resize({
        width: 750,
        height: 200,
      });
      var option;
      // 按照 updateTime 进行排序
      const sortedData = data.sort((a, b) =>
        a.updateTime.localeCompare(b.updateTime)
      );

      // 获取每个 updateTime 对应的 valus 值
      const values = sortedData.map((item) => item.valus);

      // 获取每个 updateTime 值并按顺序存储到一个数组中
      const updateTimes = sortedData.map((item) => item.updateTime);
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
          text: "Redis集群节点内存消耗峰值",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: updateTimes,
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
            data: values,
          },
        ],
      };
      option && canves4.setOption(option);
    },
    getTopLine(id) {
      numItems(id, "used_memory_peak").then(({ data }) => {
        this.TopLine(data);
      });
    },
    //Redis数据集所在内存大小
    dataset(data) {
      var canves5 = echarts.init(document.getElementById("canves5"));
      canves5.resize({
        width: 400,
        height: 200,
      });
      var option;
      // 按照 updateTime 进行排序
      const sortedData = data.sort((a, b) =>
        a.updateTime.localeCompare(b.updateTime)
      );

      // 获取每个 updateTime 对应的 valus 值
      const values = sortedData.map((item) => item.valus);

      // 获取每个 updateTime 值并按顺序存储到一个数组中
      const updateTimes = sortedData.map((item) => item.updateTime);
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
          text: "Redis集群节点内存消耗峰值",
          textStyle: { color: "#fff" },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: updateTimes,
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
            data: values,
          },
        ],
      };
      option && canves5.setOption(option);
    },
    getDateset(id) {
      numItems(id, "used_memory_dataset").then(({ data }) => {
        this.dataset(data);
      });
    },
    //事件明细
    eventLine(data) {
      var canves6 = echarts.init(document.getElementById("canves6"));
      canves6.resize({
        width: 350,
        height: 180,
      });
      var option;
      const result = Object.keys(data[0]).map((key) => ({
        value: data[0][key],
        name: key,
      }));
      console.log(result);
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
        title: {
          text: "类型统计",
          top: "5%",
          left: "center",
          textStyle: {
            fontSize: 17,
            color: "#fff",
          },
        },
        legend: {
          top: "20%",
          left: "5%",
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
            left: "10%",
            top: "20%",
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
            data: result,
          },
        ],
      };

      option && canves6.setOption(option);
    },
    getCount(id) {
      RedisCount(id).then(({ data }) => {
        console.log(data);
        this.eventLine(data);
      });
    },
    //mysql折线图
    Line(data) {
      var myChart1 = echarts.init(document.getElementById("canves7"));
      var option;
      myChart1.resize({
        width: 750,
        height: 200,
      });
      const times = data.bytes_received
        .concat(data.bytes_sent)
        .map((entry) => entry.updateTime);
      // 按时间升序排序
      times.sort();

      // 创建空数组
      let a = [];
      let b = [];

      // 遍历数组并将数据点与该时间戳的索引匹配
      times.forEach((time, index) => {
        // 根据时间戳查找 MEM 数组中的数据点
        const memEntry = data.bytes_received.find(
          (entry) => entry.updateTime === time
        );
        // 如果找到了，则将值添加到 a 中；否则添加 0
        if (memEntry) {
          a.push(memEntry.valus);
        } else {
          a.push(0);
        }

        // 根据时间戳查找 CPU 数组中的数据点
        const cpuEntry = data.bytes_sent.find(
          (entry) => entry.updateTime === time
        );
        // 如果找到了，则将值添加到 b 中；否则添加 0
        if (cpuEntry) {
          b.push(cpuEntry.valus);
        } else {
          b.push(0);
        }
      });
      option = {
        title: {
          text: "流量详情",
          left: "center",
          textStyle: { color: "#fff" },
        },
        grid: {
          bottom: 80,
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {},
          },
          iconStyle: {
            borderColor: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#505765",
            },
          },
        },
        legend: {
          data: ["接受", "发送"],
          textStyle: { color: "#fff" },
          left: 10,
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 100,
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: false },
            // prettier-ignore
            data:times,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            name: "接受",
            nameTextStyle: {
              color: "#fff",
            },
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
          {
            name: "接收",
            nameTextStyle: {
              color: "#fff",
            },
            nameLocation: "start",
            alignTicks: true,
            type: "value",
            inverse: true,
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
        ],
        series: [
          {
            name: "接受",
            type: "line",
            areaStyle: {},
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              data: [
                [
                  {
                    xAxis: "2023/3/20\n7:00",
                  },
                  {
                    xAxis: "2023/4/20\n7:00",
                  },
                ],
              ],
            },
            // prettier-ignore
            data: a,
          },
          {
            name: "发送",
            type: "line",
            yAxisIndex: 1,
            areaStyle: {},
            lineStyle: {
              width: 1,
            },
            emphasis: {
              focus: "series",
            },
            markArea: {
              silent: true,
              itemStyle: {
                opacity: 0.3,
              },
              data: [
                [
                  {
                    xAxis: "2023/3/20\n7:00",
                  },
                  {
                    xAxis: "2023/4/20\n7:00",
                  },
                ],
              ],
            },
            // prettier-ignore
            data:b,
          },
        ],
      };

      option && myChart1.setOption(option);
    },
    getBytes(id) {
      mysqlHistory(id).then(({ data }) => {
        this.Line(data);
        console.log(data);
      });
    },
    //mysql的柱状图
    mysqlLine(data) {
      var myChart2 = echarts.init(document.getElementById("canves8"));
      myChart2.resize({
        width: 380,
        height: 200,
      });
      const keys = ["threads_running", "threads_connected", "threads_created"];
      const values = [];
      for (const key in data) {
        values.push(data[key]);
      }
      var option;
      option = {
        legend: {
          top: "5%",
          right: "5%",
        },
        title: {
          text: "Mysql线程详情",
          top: "5%",
          left: "2%",
          textStyle: {
            fontSize: "17px",
            color: "#fff",
          },
        },
        tooltip: {},
        xAxis: {
          type: "category",
          data: keys,
          axisLabel: {
            textStyle: {
              fontSize: "8",
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: "8",
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
            data: values,
            type: "bar",
          },
        ],
      };

      option && myChart2.setOption(option);
    },
    getmysql(id) {
      historykeyword(id).then(({ data }) => {
        this.mysqlLine(data);
      });
    },
    //mysql事件明细
    eventMysqlLine(data) {
      var canves6 = echarts.init(document.getElementById("canves9"));
      canves6.resize({
        width: 350,
        height: 180,
      });
      var option;
      const result = Object.keys(data[0]).map((key) => ({
        value: data[0][key],
        name: key,
      }));
      console.log(result);
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
        title: {
          text: "类型统计",
          top: "5%",
          left: "center",
          textStyle: {
            fontSize: 17,
            color: "#fff",
          },
        },
        legend: {
          top: "20%",
          left: "5%",
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
            left: "10%",
            top: "20%",
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
            data: result,
          },
        ],
      };

      option && canves6.setOption(option);
    },
    getMysqlCount(id) {
      RedisCount(id).then(({ data }) => {
        this.eventMysqlLine(data);
      });
    },
    sizeChange(pagerSize) {
      this.eachPage = parseInt(pagerSize);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
    },
    currentChange(currentPage) {
      this.currentPage = parseInt(currentPage);
      this.targetbtnhandle();
    },
    //上一页
    prevClick() {
      this.currentPage -= 1;
    },
    //下一页
    nextClick() {
      this.currentPage += 1;
    },
    sizeChangehandle(pagerSize) {
      this.eachPage = parseInt(pagerSize);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
    },
    currentChangehandle(currentPage) {
      this.currentPage = parseInt(currentPage);
      this.triggerbtnhandle();
      s;
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
    handleSelectionChange() {},
    //x按钮
    cancelBtnHeader() {
      this.$emit("cancel");
    },
    //总览
    overviewHandle(deviceType, id) {
      this.isshowcontainer1 = true;
      this.isshowcontainer2 = false;
      this.isshowcontainer3 = false;
      this.$refs.triangle_border_left1.style.display = "block";
      this.$refs.triangle_border_left2.style.display = "none";
      this.$refs.triangle_border_left3.style.display = "none";
      if (
        (deviceType === 1 || deviceType === 2) &&
        deviceType !== 3 &&
        deviceType !== 4
      ) {
        this.$refs.triangle_border_left1.style.top = "17%";
        this.$refs.triangle_border_left2.style.top = "42%";
        this.$refs.charts1.style.display = "grid";
        this.$refs.charts2.style.display = "none";
        this.$refs.charts3.style.display = "none";
        this.getDate(id);
        this.getDate1(id);
        this.getEvent(id);
      } else if (
        deviceType === 3 &&
        deviceType !== 4 &&
        deviceType !== 1 &&
        deviceType !== 2
      ) {
        this.$refs.triangle_border_left1.style.top = "19%";
        this.$refs.triangle_border_left2.style.top = "43%";
        this.$refs.charts1.style.display = "none";
        this.$refs.charts2.style.display = "grid";
        this.$refs.charts3.style.display = "none";
        RedisItems(id, "redis_version").then(({ data }) => {
          this.data.version = data.value;
        });
        RedisItems(id, "redis_mode").then(({ data }) => {
          this.data.mode = data.value;
        });
        RedisItems(id, "uptime").then(({ data }) => {
          this.data.uptime = data.value;
        });
        RedisItems(id, "total_system_memory").then(({ data }) => {
          this.data.memory = data.value;
        });
        RedisItems(id, "os").then(({ data }) => {
          this.data.os = data.value;
        });
        RedisItems(id, "gcc_version").then(({ data }) => {
          this.data.gcc = data.value;
        });
        this.getTopLine(id);
        this.getDateset(id);
        this.getCount(id);
      } else if (
        deviceType === 4 &&
        deviceType !== 3 &&
        deviceType !== 1 &&
        deviceType !== 2
      ) {
        this.$refs.triangle_border_left1.style.top = "19%";
        this.$refs.triangle_border_left2.style.top = "43%";
        this.$refs.charts1.style.display = "none";
        this.$refs.charts2.style.display = "none";
        this.$refs.charts3.style.display = "grid";
        RedisItems(id, "sql_max_join_size").then(({ data }) => {
          this.form.size = data.value;
        });
        RedisItems(id, "version").then(({ data }) => {
          this.form.version = data.value;
        });
        RedisItems(id, "uptime").then(({ data }) => {
          this.form.uptime = data.value;
        });
        RedisItems(id, "threads_running").then(({ data }) => {
          this.form.threads = data.value;
        });
        RedisItems(id, "max_connections").then(({ data }) => {
          this.form.connections = data.value;
        });
        RedisItems(id, "slow_queries").then(({ data }) => {
          this.form.queries = data.value;
        });
        this.getBytes(id);
        this.getmysql(id);
        this.getMysqlCount(id);
      }
    },
    //分页集
    searchHandle(item, index) {
      this.colorIndex = index;
      const { currentPage, pageSize } = this;
      const params = {
        pageNum: currentPage,
        pageSize: pageSize,
        hostId: this.rowData.id,
        applicationId: item.applicationId,
      };
      Applications(
        params.pageSize,
        params.pageNum,
        params.hostId,
        params.applicationId
      ).then(({ data }) => {
        this.listLoading = false;
        this.applicationsData = data.rows;
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.pageSize);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
        }
      });
    },
    //指标
    targetbtnhandle() {
      this.listLoading = true;
      this.isshowcontainer1 = false;
      this.isshowcontainer2 = true;
      this.isshowcontainer3 = false;
      this.$refs.triangle_border_left1.style.display = "none";
      this.$refs.triangle_border_left2.style.display = "block";
      this.$refs.triangle_border_left3.style.display = "none";
      const { currentPage, pageSize } = this;
      const params = {
        pageNum: currentPage,
        pageSize: pageSize,
        hostId: this.rowData.id,
      };
      this.colorIndex = 0;
      Applications(params.pageSize, params.pageNum, params.hostId, -1).then(
        ({ data }) => {
          this.listLoading = false;
          this.applicationsData = data.rows;
          this.count = data.total;
          this.totalCount = data.total;
          this.totalPage = Math.ceil(this.count / this.pageSize);
          if (this.currentPage > this.totalPage) {
            this.currentPage = this.totalPage;
          }
        }
      );
      ApplicationsList(this.rowData.id).then(({ data }) => {
        this.listLoading = false;
        this.applications = data;
        for (var i of this.applications) {
          i.name = i.applicationsInfo.applicationName;
          i.applicationId = i.applicationsInfo.applicationId;
        }
      });
    },
    //触发器
    triggerbtnhandle() {
      this.listLoading = true;
      this.dialogFormVisible = true;
      this.isshowcontainer1 = false;
      this.isshowcontainer2 = false;
      this.isshowcontainer3 = true;
      this.$refs.triangle_border_left1.style.display = "none";
      this.$refs.triangle_border_left2.style.display = "none";
      this.$refs.triangle_border_left3.style.display = "block";
      const { currentPage, eachPage } = this;
      const params = {
        pageNum: currentPage,
        pageSize: eachPage,
      };
      trigger(params.pageSize, params.pageNum, this.rowData.id).then(
        ({ data }) => {
          this.listLoading = false;
          this.triggerData = data.rows;
          this.count = data.total;
          this.totalPage = Math.ceil(this.count / this.eachPage);
          if (this.currentPage > this.totalPage) {
            this.currentPage = this.totalPage;
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
/* 对话框 */
.dialogContainer {
  width: 70%;
  // border: 1px solid black;
  z-index: 999;
  margin: 40px 10%;
  background: #061125;
}
.dialogContainer .dialogHeader {
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  background: #162d47;
  color: #fff;
  padding: 0 10px;
}
.cancelBtn {
  margin-left: auto;
  color: #fff;
  cursor: pointer;
}
.cancelBtn:hover {
  color: #a8b7ca;
}

.indicate {
  width: 10%;
  position: relative;
  color: #fff;
}
ul {
  margin: 0;
  padding: 0;
}
.indicate li {
  list-style: none;
  margin: 100px 0;
  text-align: center;
  color: #fff !important;
}
.dialogContainer .content {
  display: flex;
  background: #061125;
}

.right-container {
  width: 90%;
  height: 100%;
  margin-bottom: 10px;
  overflow: scroll;
  background: #061125;
}
.description {
  width: 100%;
  background-color: #081b31;
  // border-bottom: 1px solid #f0f8ff;
}
.descform {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 0 auto;
}

.indicate::after {
  content: "";
  height: 100%;
  position: absolute;
  border: 1px solid #fff;
  top: 0;
  left: 100%;
  z-index: 999;
}
.descItem {
  margin-left: 10%;
  margin-bottom: 5px;
}

.canves {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px auto;
  gap: 10px;
}
.canves1 {
  width: 100%;
  height: 200px;
  margin: 0 auto;
  grid-area: 1/1/2/3;
  background-color: #081b31;
}
.canves2 {
  width: 100%;
  height: 200px;
  margin: 0px auto;
  background-color: #081b31;
}
.canves3 {
  width: 100%;
  height: 200px;
  margin: 0 auto;
  background-color: #081b31;
}
.triangle_border_left {
  width: 0;
  height: 0;
  border-width: 15px 15px 15px 0;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  position: absolute;
  // top: 10%;
  right: 0;
}

.description2 {
  margin: 40px 10px;
}
.table {
  width: 100%;
  max-width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}
.thead {
  background-color: #e0eaf9;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.row-table-box table > tbody > tr > td {
  font-size: 12px;
  vertical-align: middle;
}
.row-table-box {
  /* margin: 15px 0px; */
  border: 1px #eee solid;
  text-align: center;
}
tr {
  height: 30px;
  line-height: 30px;
}
.applications {
  display: grid;
  grid-template-rows: 30px 30px;
  grid-template-columns: repeat(8, 1fr);
  a {
    margin-left: 7px;
  }
}

.activeColor {
  color: #01ffff;
}

.app-table {
  margin: 30px 0;
}
</style>
