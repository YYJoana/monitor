// humburger index.vue
<template>
  <div style="display: flex">
    <img
      src="@/assets/404_images/header.png"
      alt=""
      style="margin: 5px; height: 40px"
    />
    <div class="nabar-title">信息系统智能监控管理平台</div>
    <!-- <div class="time">{{ formatDate(item.createDate, true) }}</div> -->

    <!-- <div class="admin">
      <i class="el-icon-user-solid" />
    </div> -->
  </div>
</template>

<script>
// import { formatDate } from "@/utils";
export default {
  name: "Hamburger",
  data() {
    return {
      img: [{ img: require("@/assets/404_images/111.jpg") }],
    };
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    },
    // formatDate,
  },
};
</script>
<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  margin-top: 18px;
  width: 16px;
  color: #fff;
  height: 16px;
  margin-left: 6px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
.nabar-title {
  text-align: center;
  height: 100%;
  width: 100%;
  line-height: 54px;
  color: #fff;
  font-weight: 600;
  vertical-align: middle;
}

.admin {
  margin-right: 30px;
  line-height: 54px;
}
</style>
