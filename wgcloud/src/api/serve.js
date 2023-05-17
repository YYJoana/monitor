import request from "@/utils/request";

//获取表格数据
export function serveList(pageSize = 5, pageNum = 1, code, appName) {
  return request({
    url: "/wgcloud/api/heathMonitor/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
      code,
      appName,
    },
  });
}

//修改监控数据
export function editServe(data) {
  return request({
    url: "/wgcloud/api/heathMonitor/update",
    method: "put",
    data,
  });
}

//删除
export function deleteServe(id) {
  return request({
    url: "/wgcloud/api/heathMonitor/delete",
    method: "delete",
    data: {
      ids: id,
    },
  });
}

//添加
export function addServe(data) {
  return request({
    url: "/wgcloud/api/heathMonitor/save",
    method: "post",
    data,
  });
}
