import request from "@/utils/request";

//获取表格数据
export function monitorItem(pageSize = 5, pageNum = 1) {
  return request({
    url: "/wgcloud/api/monitorItem/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
    },
  });
}

//添加主机
export function addMonitor(data) {
  return request({
    url: "/wgcloud/api/monitorItem/save",
    method: "post",
    data,
  });
}

//删除监控数据
export function deleteMonitor(id) {
  return request({
    url: "/wgcloud/api/monitorItem/delete",
    method: "delete",
    data: {
      ids: id,
    },
  });
}

//修改监控数据
export function editMonitor(data) {
  return request({
    url: "/wgcloud/api/monitorItem/update",
    method: "put",
    data,
  });
}
