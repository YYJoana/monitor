import request from "@/utils/request";

//redis设备健康状态
export function redisHealthy() {
  return request({
    url: "/wgcloud/api/redis/redisHealthy",
    method: "get",
  });
}

//查询redis类型的日志
export function redisLogin() {
  return request({
    url: "/wgcloud/api/redis/logInfo",
    method: "get",
  });
}

//事件明细
export function logDetails() {
  return request({
    url: "/wgcloud/api/redis/logDetails",
    method: "get",
  });
}

//查询历史值
export function history(keyword, id) {
  return request({
    url: `/wgcloud/api/redis/history/${keyword}/${id}`,
    method: "get",
    params: {
      id,
      keyword,
    },
  });
}

//根据类型和key值查找值
export function redisValues(keyword, type) {
  return request({
    url: `/wgcloud/api/redis/redisValues/${type}/${keyword}`,
    method: "get",
    params: {
      type,
      keyword,
    },
  });
}
