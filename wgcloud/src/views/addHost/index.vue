<template>
  <div class="app-container">
    <div class="card">
      <div class="header">
        <div class="title"><i class="el-icon-s-platform"></i>主机管理</div>
      </div>
      <div class="container">
        <div class="block">设备名:</div>
        <el-input type="deviceName" v-model="form.deviceName"></el-input>
        <div class="block">ip地址:</div>
        <el-input type="deviceIp" v-model="form.deviceIp"></el-input>
        <div class="block">类型:</div>
        <el-input type="deviceType" v-model="form.deviceType"> </el-input>
        <div class="block">区域:</div>
        <el-input type="region" v-model="form.region"></el-input>
        <div class="block">状态:</div>
        <el-input type="state" v-model="form.state"></el-input>
        <div class="block">监控类型:</div>
        <el-select
          type="monitoringType"
          v-model="form.select"
          placeholder="请选择"
        >
          <el-option label="Agent" value="Agent"></el-option>
          <el-option label="SSH" value="SSH"></el-option>
        </el-select>
        <div class="block">代理:</div>
        <el-input type="proxy" v-model="form.proxy"></el-input>
      </div>
      <div>
        <el-button
          type="primary"
          style="margin-top: 15px"
          @click="addHostHandle"
          >编辑主机</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { addHost } from "@/api/deviceInfo";
export default {
  data() {
    return {
      form: {
        deviceName: "",
        deviceIp: "",
        deviceType: "",
        proxy: "",
        region: "",
        monitoringType: "",
        select: "",
        state: "",
      },
    };
  },
  methods: {
    addHostHandle() {
      let obj = {
        deviceName: this.form.deviceName,
        deviceIp: this.form.deviceIp,
        deviceType: this.form.deviceType,
        proxy: this.form.proxy,
        monitoringType: this.form.select,
        region: this.form.region,
        state: this.form.state,
      };
      if (
        obj.deviceName &&
        obj.deviceIp &&
        obj.deviceType &&
        obj.proxy &&
        obj.monitoringType &&
        obj.region &&
        obj.state
      ) {
        addHost(obj).then((res) => {
          console.log(res);
          this.$router.push({ path: "hostManager", name: "hostManager" });
        });
      } else {
        this.$message({
          offset: 100,
          type: "error",
          message: "请填写要输入的内容",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  padding: 40px 20px;
}
.card {
  width: 100%;
  padding-bottom: 30px;
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

.block {
  margin: 15px 30px;
  font-weight: 100;
}

.el-input,
.el-select {
  margin-left: 30px;
  width: 50%;
}

.el-button {
  margin-left: 30px;
}
</style>
