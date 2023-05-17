<!--
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-center.vue
-->
<template>
  <Echart
    id="leftCenter"
    :options="options"
    class="left_center_inner"
    v-if="pageflag"
    ref="charts"
  />
  <Reacquire v-else @onclick="getData" style="line-height: 200px">
    重新获取
  </Reacquire>
</template>

<script>
import { countType } from "@/api/main";
import { currentGET } from "api/modules";
export default {
  data() {
    return {
      options: {},
      countUserNumData: {
        lockNum: 0,
        onlineNum: 0,
        offlineNum: 0,
        totalNum: 0,
      },
      pageflag: true,
      timer: null,
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    getData() {
      this.pageflag = true;
      // this.pageflag =false
      countType().then((res) => {
        this.countUserNumData = res;
        this.$nextTick(() => {
          this.init();
        });
        //只打印一次
        // if (!this.timer) {
        //   console.log("设备总览", res);
        // }
        // if (res.success) {
        //   this.countUserNumData = res.data;
        //   this.$nextTick(() => {
        //     this.init();
        //   });
        // } else {
        //   this.pageflag = false;
        //   this.$Message({
        //     text: res.msg,
        //     type: "warning",
        //   });
        // }
      });
    },
    //轮询
    switper() {
      if (this.timer) {
        return;
      }
      let looper = (a) => {
        this.getData();
      };
      this.timer = setInterval(
        looper,
        this.$store.state.setting.echartsAutoTime
      );
      let myChart = this.$refs.charts.chart;
      myChart.on("mouseover", (params) => {
        this.clearData();
      });
      myChart.on("mouseout", (params) => {
        this.timer = setInterval(
          looper,
          this.$store.state.setting.echartsAutoTime
        );
      });
    },
    init() {
      let total = this.countUserNumData.totalNum;
      let colors = ["#ECA444", "#33A1DB", "#56B557", "#01ffff"];
      let piedata = {
        name: "用户总览",
        type: "pie",
        radius: ["42%", "65%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 2,
        },

        color: colors,
        data: [
          {
            value: this.countUserNumData[0].linux,
            name: "linux",
            label: {
              shadowColor: colors[0],
            },
          },
          {
            value: this.countUserNumData[0].mysql,
            name: "mysql",
            label: {
              shadowColor: colors[2],
            },
          },
          {
            value: this.countUserNumData[0].windows,
            name: "windows",
            label: {
              shadowColor: colors[1],
            },
          },
          {
            value: this.countUserNumData[0].redis,
            name: "redis",
            label: {
              shadowColor: colors[0],
            },
          },
        ],
      };
      this.options = {
        title: {
          // zlevel: 0,
          text: "设备数",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              value: {
                color: "#ffffff",
                fontSize: 24,
                fontWeight: "bold",
                lineHeight: 20,
              },
              name: {
                color: "#ffffff",
                lineHeight: 20,
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        legend: {
          show: false,
          top: "top",
          left: "center",
        },
        grid: { top: "5px" },
        series: [
          //展示圆点
          {
            ...piedata,
            tooltip: { show: true },
            label: {
              formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
              //   position: "outside",
              rich: {
                b: {
                  color: "#fff",
                  fontSize: 12,
                  lineHeight: 26,
                },
                c: {
                  color: "#31ABE3",
                  fontSize: 14,
                },
                per: {
                  color: "#31ABE3",
                  fontSize: 14,
                },
              },
            },
            labelLine: {
              length: 20, // 第一段线 长度
              length2: 36, // 第二段线 长度
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          {
            ...piedata,
            tooltip: { show: true },
            itemStyle: {},
            label: {
              backgroundColor: "inherit", //圆点颜色，auto：映射的系列色
              height: 0,
              width: 0,
              lineHeight: 0,
              borderRadius: 2.5,
              shadowBlur: 8,
              shadowColor: "auto",
              padding: [2.5, -2.5, 2.5, -2.5],
            },
            labelLine: {
              length: 20, // 第一段线 长度
              length2: 36, // 第二段线 长度
              show: false,
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
