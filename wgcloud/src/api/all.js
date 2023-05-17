import request from "@/utils/request";

//cpu利用率
export function CPUItem(time = -2000) {
  return request({
    url: "/wgcloud/api/itemInfo/listCPUItem",
    method: "get",
    params: {
      time,
    },
  });
}

//内存利用率
export function MEMItem(time = -2000) {
  return request({
    url: "/wgcloud/api/itemInfo/listMEMItem",
    method: "get",
    params: {
      time,
    },
  });
}

//硬盘利用率
export function VFSItem(time = -2000) {
  return request({
    url: "/wgcloud/api/itemInfo/listVFSItem",
    method: "get",
    params: {
      time,
    },
  });
}

//设备运行时长
export function keyword(keyword = "uptime") {
  return request({
    url: `/wgcloud/api/itemInfo/keyword/${keyword}`,
    method: "get",
    params: {
      keyword,
    },
  });
}

//设备数统计
export function countType() {
  return request({
    url: `/wgcloud/api/device/countType`,
    method: "get",
  });
}

//事件类型统计
export function deviceType() {
  return request({
    url: `/wgcloud/api/device/countType`,
    method: "get",
  });
}

//事件等级统计
export function grade() {
  return request({
    url: `/wgcloud/api/logInfo/grade`,
    method: "get",
  });
}
