import request from "@/utils/request";

//风险率和可疑率
export function anomalyDetection() {
  return request({
    url: "/wgcloud/api/anomalyDetection/collectType",
    method: "get",
  });
}

//查询异常信息
export function anomalyList() {
  return request({
    url: "/wgcloud/api/anomalyDetection/list",
    method: "get",
  });
}

//收集文件RiskName
export function collectRiskName() {
  return request({
    url: "/wgcloud/api/anomalyDetection/collectRiskName",
    method: "get",
  });
}

//安全信息主机类
export function collectIdType() {
  return request({
    url: "/wgcloud/api/anomalyDetection/collectIdType",
    method: "get",
  });
}
