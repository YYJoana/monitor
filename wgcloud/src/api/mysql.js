import request from "@/utils/request";

//运行时长
export function DbValues(keyword, type) {
  return request({
    url: `/wgcloud/api/dbInfo/DbValues/${type}/${keyword}`,
    method: "get",
    params: {
      type,
      keyword,
    },
  });
}

//查询最大最小值
export function historyValues(keyword) {
  return request({
    url: `/wgcloud/api/dbInfo/historyValues/${keyword}`,
    method: "get",
    params: {
      keyword,
    },
  });
}

//流量
export function flowMaxMin() {
  return request({
    url: "/wgcloud/api/dbInfo/flowMaxMin",
    method: "get",
  });
}

//事件统计
export function eventLogInfo() {
  return request({
    url: "/wgcloud/api/dbInfo/logInfo",
    method: "get",
  });
}

//查mysql类型所有主机
export function deviceDrip() {
  return request({
    url: "/wgcloud/api/dbInfo/device",
    method: "get",
  });
}

//查mysql类型所有主机
export function deviceId(id) {
  return request({
    url: `/wgcloud/api/dbInfo/device/${id}`,
    method: "get",
    params: {
      id,
    },
  });
}
