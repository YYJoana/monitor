<template>
  <div class="app-container">
    <div class="card">
      <dv-border-box-7>
      <div class="header charts">
        <!-- <dv-border-box-12 style="grid-area: 1/1/2/3"> -->
        <div class="canves" id="canves"></div>
        <div class="content">
          <el-descriptions title="主机信息" style="color: #fff;" class="descriptions">
            <el-descriptions-item label="id">{{
             descriptions.id
            }}</el-descriptions-item>
            <el-descriptions-item label="主机IP">{{
              descriptions.deviceIp
            }}</el-descriptions-item>
            <el-descriptions-item label="主机名称">{{
              descriptions.deviceName
            }}</el-descriptions-item>
            <el-descriptions-item label="设备类型">{{
              descriptions.deviceType
            }} </el-descriptions-item>
            <el-descriptions-item label="区域">{{
              descriptions.region
            }} </el-descriptions-item>
            <el-descriptions-item label="监控类型">{{
              descriptions.monitoringType
            }} </el-descriptions-item>
            <el-descriptions-item label="代理">{{
              descriptions.proxy
            }} </el-descriptions-item>
            <el-descriptions-item label="状态">{{
              descriptions.state
            }} </el-descriptions-item>
            <el-descriptions-item label="用户名"> {{
              descriptions.userName
            }}</el-descriptions-item>
            <el-descriptions-item label="更新时间"> {{
              descriptions.updateTime
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      <!-- </dv-border-box-12> -->
      </div></dv-border-box-7>
      <div class="bottom">
      <dv-border-box-7>
        <div class="charts charts1" id="charts1">
        <div class="head">
          <div class="title">Top5 运行时长(高->低)</div>
          <div class="time"><i class="el-icon-time"></i>{{ gettime }}</div>
        </div>
        <el-table :data="runData" style="width: 100%" empty-text="暂无数据">
          <el-table-column
            prop="name"
            label="设备名称"
            align="center"
          ><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>
          <el-table-column
            prop="runTimer"
            label="运行时长/天"
            align="center"
          ><template slot-scope="scope">{{ scope.row.value }}</template></el-table-column></el-table-column>
        </el-table>
      </div></dv-border-box-7>
    <dv-border-box-7>
      <div class="charts charts2" id="charts2">
        <div class="head">
          <div class="title">Top5 流量(高->低)</div>
          <div class="time"><i class="el-icon-time"></i>{{ gettime }}</div>
        </div>
        <el-table :data="flowData" style="width: 100%" empty-text="暂无数据">
          <el-table-column
            prop="name"
            label="设备名称"
            align="center"
          ><template slot-scope="scope">{{ scope.row.deviceName }}</template></el-table-column>
          <el-table-column
            prop="rate"
            label="接收速率"
            align="center"
          ><template slot-scope="scope">{{ scope.row.bytes_received}}</template></el-table-column>
          <el-table-column
            prop="sendRate"
            label="发送速率"
            align="center"
          ><template slot-scope="scope">{{ scope.row.bytes_sent}}</template></el-table-column>
        </el-table>
      </div>
    </dv-border-box-7>
  <dv-border-box-7>
      <div class="charts charts3" id="charts3">
        <div class="head">
          <div class="title">Top5 Aborted connects(高->低)</div>
          <div class="time"><i class="el-icon-time"></i>{{ gettime }}</div>
        </div>
        <el-table :data="connectsData" style="width: 100%">
          <el-table-column
            prop="name"
            label="设备名称"
            align="center"
          ><template slot-scope="scope">{{ scope.row.deviceName }}</template></el-table-column>
          <el-table-column
            prop="min"
            label="最小"
            align="center"
          ><template slot-scope="scope">{{ scope.row.min }}</template></el-table-column>
          <el-table-column
            prop="max"
            label="最大"
            align="center"
          ><template slot-scope="scope">{{ scope.row.max }}</template></el-table-column>
          <el-table-column
            prop="arg"
            label="平均值"
            align="center"
          ><template slot-scope="scope">{{ scope.row.arg }}</template></el-table-column>
        </el-table>
      </div>
    </dv-border-box-7>
  <dv-border-box-7>
      <div class="charts charts4" id="charts4">
        <div class="head">
          <div class="title">Top5 慢查询数量(高->低)</div>
          <div class="time"><i class="el-icon-time"></i>{{ gettime }}</div>
        </div>
        <el-table :data="countData" style="width: 100%">
          <el-table-column
            prop="name"
            label="设备名称"
            align="center"
          ><template slot-scope="scope">{{ scope.row.deviceName }}</template></el-table-column>
          <el-table-column
            prop="min"
            label="最小"
            align="center"
          ><template slot-scope="scope">{{ scope.row.min }}</template></el-table-column>
          <el-table-column
            prop="max"
            label="最大"
            align="center"
          ><template slot-scope="scope">{{ scope.row.max }}</template></el-table-column>
          <el-table-column
            prop="arg"
            label="平均值"
            align="center"
          ><template slot-scope="scope">{{ scope.row.arg }}</template></el-table-column>
        </el-table>
      </div></dv-border-box-7>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  DbValues,
  historyValues,
  flowMaxMin,
  eventLogInfo,
  deviceDrip,
  deviceId,
} from "@/api/mysql";
export default {
  data() {
    return {
      descriptions: {
        id:"",
        deviceIp:'',
        deviceType:'',
        deviceName:'',
        monitoringType:'',
        port:'',
        proxy:'',
        region:'',
        state:'',
        updateTime:'',
        userName:'',
      } ,
      listLoading: false,
      gettime: "", //当前时间
      tableData: [{}],
      runData: [{}],
      flowData: [{}],
      connectsData: [],
      countData: [],
  
    };
  },
  mounted() {
    this.currentTime();
    // this.eventLine();
    this.getDate();
  },
  created() {
    this.fetchData();
  },
  methods: {
    eventLine(data) {
      var myChart1 = echarts.init(document.getElementById("canves"));
      myChart1.resize({
        width: 350,
        height: 240,
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
          top: "20%",
          left: "5%",
          orient: "vertical",
          itemWidth: 15,
          itemHeight: 15,
          textStyle: {
            fontSize: 12,
            color:"#fff"
          },
        },
        title: {
          text: "类型统计",
          top: "5%",
          left: "5%",
          textStyle: {
            fontSize: 17,
            color:'#fff'
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
            data: dataList,
          },
        ],
      };


      option && myChart1.setOption(option);
    },
    getDate(){
  eventLogInfo().then(({data})=>{
    this.eventLine(data);
  })
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
    fetchData() {
      DbValues("uptime", "4").then(({data}) => {
        this.runData=data;
        for (const i of data) {
          i.name = i.deviceInfo.deviceName;
        }
      });
      historyValues('aborted_clients').then(({data}) => {
        this.connectsData=data;
        for (let i of this.connectsData) {
          i.max = i.aborted_clients[0];
          i.min = i.aborted_clients[1];
          i.arg = i.aborted_clients[2].toFixed(2);
        }
      });
      historyValues('slow_queries').then(({data}) => {
        this.countData=data;
        for (let i of this.countData) {
          i.max = i.slow_queries[0];
          i.min = i.slow_queries[1];
          i.arg = i.slow_queries[2].toFixed(2);
        }
      });
      deviceDrip().then(res => {
      const data = res.data;
      const arr = data;
      const newObj = arr[0];
        this.descriptions={
          id: newObj.id?newObj.id:'暂无数据',
          deviceIp:newObj.deviceIp?newObj.deviceIp:'暂无数据',
          deviceName:newObj.deviceName?newObj.deviceName:'暂无数据',
          deviceType:newObj.deviceType===1?'Linux':newObj.deviceType===2?'Windows':newObj.deviceType===3?'Redis':newObj.deviceType===4?'Mysql':'未分类',
          region:newObj.region?newObj.region:'暂无数据',
          monitoringType:newObj.monitoringType===1?'监控中':'未监控',
          proxy:newObj.proxy?newObj.proxy:'暂无数据',
          state:newObj.state===1?'正常':'失败',
          userName:newObj.userName?newObj.userName:'暂无数据',
          updateTime:newObj.updateTime?newObj.updateTime:'暂无数据'
        }
      });
      flowMaxMin().then(({data}) => {
        this.flowData=data;
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
.app-contain {
  width: 100%;
  height: 100%;
  margin: 1px 10px;
  color: #fff;
}
.card {
  width: 100%;
  height: 100%;
  padding: 10px;
  // background-color: #081b31;
  border-radius: 15px;
}

.bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.time {
  width: 150px;
  color: #a9a8a8;
  i {
    margin-right: 3px;
  }
}

.descriptions {
  padding: 20px;
  width: 100%;
}
.header {
  width: 100%;
  height: 240px;
  // border: 1px solid;
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 100%;
  gap: 30px;
  // margin: 10px;
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
  width: 100%;
}
// .content::after {
//   border: 1px solid #dddbdb;
//   content: "";
//   left: 100%;
//   top: 10px;
//   height: 90%;
//   position: absolute;
// }
.charts {
  background-color: #081b31;
  // box-shadow: 1px 1px 1px 1px #bdbdbd;
  // margin: 5px;
 
}
.charts1,
.charts2,
.charts3,
.charts4 {
  height: 200px;
  position: relative;
}
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
.title{
  color: #fff;
}
</style>
