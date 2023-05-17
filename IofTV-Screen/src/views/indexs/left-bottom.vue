<template>
  <div class="center_bottom">
    <Echart
      :options="options"
      id="bottomLeftChart"
      class="echarts_bottom"
    ></Echart>
  </div>
</template>

<script>
import { collectDeviceType } from "@/api/main";
import { currentGET } from "api";
import { graphic } from "echarts";
export default {
  data() {
    return {
      options: {},
    };
  },
  props: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pageflag = true;
      collectDeviceType().then((res) => {
        this.init(res);
        console.log(res);
      });
      // currentGET("big6", { companyName: this.companyName }).then((res) => {
      //   console.log("安装计划", res);
      //   if (res.success) {
      //     this.init(res.data);
      //   } else {
      //     this.pageflag = false;
      //     this.$Message({
      //       text: res.msg,
      //       type: "warning",
      //     });
      //   }
      // });
    },
    init(data) {
      const risks = data.map(({ risk }) => risk);
      const suspicious = data.map(({ suspicious }) => suspicious);
      const deviceNames = data.map(({ deviceName }) => deviceName);

      this.options = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["风险", "可疑"],
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: true,
          feature: {
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data:deviceNames,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "风险",
            type: "bar",
            data: risks,
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "可疑",
            type: "bar",
            data: suspicious,
            markPoint: {
              data: [
                { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.center_bottom {
  width: 100%;
  height: 100%;

  .echarts_bottom {
    width: 100%;
    height: 100%;
  }
}
</style>
