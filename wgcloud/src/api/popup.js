import request from "@/utils/request";

//弹出框中触发器
export function trigger(pageSize = 5, pageNum = 1, id) {
  return request({
    url: `/wgcloud/api/device/listTrigger/${id}`,
    method: "get",
    params: {
      pageSize,
      pageNum,
    },
  });
}

//设备总揽
export function Overview(id) {
  return request({
    url: `/wgcloud/api/device/Overview/${id}`,
    method: "get",
  });
}

//查找所有的应用集
export function ApplicationsList(hostId) {
  return request({
    url: `/wgcloud/api/Applications/list/${hostId}`,
    method: "get",
  });
}

//查找全部应用集数据
export function Applications(pageSize = 5, pageNum = 1, hostId, applicationId) {
  return request({
    url: "/wgcloud/api/Applications/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
      hostId,
      applicationId,
    },
  });
}

//总览中根据ID查找磁盘利用率
export function totalDisk(id) {
  return request({
    url: `/wgcloud/api/device/totalDisk/${id}`,
    method: "get",
  });
}

//总览中根据ID查找CPU的核心数
export function CpuUsed(id) {
  return request({
    url: `/wgcloud/api/device/CpuUsed/${id}`,
    method: "get",
  });
}

//总览中根据ID查找事件数量
export function count(hostId) {
  return request({
    url: `/wgcloud/api/logInfo/count/${hostId}`,
    method: "get",
  });
}

//Redis
export function numItems(hostId, keyword) {
  return request({
    url: `/wgcloud/api/itemInfo/numItems/${hostId}/${keyword}`,
    method: "get",
  });
}

export function RedisItems(hostId, keyword) {
  return request({
    url: `/wgcloud/api/itemInfo/item/${hostId}/${keyword}`,
    method: "get",
  });
}

export function RedisCount(hostId) {
  return request({
    url: `/wgcloud/api/logInfo/count/${hostId}`,
    method: "get",
  });
}

export function historykeyword(id) {
  return request({
    url: `/wgcloud/api/dbInfo/historykeyword/${id}`,
    method: "get",
  });
}

export function mysqlHistory(id) {
  return request({
    url: `/wgcloud/api/dbInfo/history/${id}`,
    method: "get",
  });
}
