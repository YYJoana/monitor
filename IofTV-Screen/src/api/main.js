import request from "./request";

//设备总览
export async function countType() {
  return await request.get("/wgcloud/api/device/countType");
}

//设备指标趋势
export async function totalMEM() {
  return await request.get("/wgcloud/api/history/totalMEM");
}

//文件检测异常类别总览
export async function collectDeviceType() {
  return await request.get("/wgcloud/api/anomalyDetection/collectDeviceType");
}

//告警列表
export function deviceInfo(
  pageSize = 20,
  pageNum = 1,
  hostType,
  severity,
  startDate,
  endDate
) {
  return request({
    url: "/wgcloud/api/logInfo/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
      hostType,
      severity,
      startDate,
      endDate,
    },
  });
}

//设备运行时长
export async function uptime() {
  return await request.get("/wgcloud/api/itemInfo/keyword/uptime");
}

//事件等级
export async function grade() {
  return await request.get("/wgcloud/api/logInfo/grade/screen");
}
