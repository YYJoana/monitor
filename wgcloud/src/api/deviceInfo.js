import request from "@/utils/request";

//获取表格数据
export function deviceInfo(pageSize = 5, pageNum = 1) {
  return request({
    url: "/wgcloud/api/device/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
    },
  });
}

//删除主机数据
export function deleteHost(data) {
  return request({
    url: "/wgcloud/api/device/delete",
    method: "Post",
    data,
  });
}

//编辑主机数据
export function editHost(data) {
  return request({
    url: "/wgcloud/api/device/update",
    method: "Post",
    data,
  });
}

//根据id查找主机
export function findHost(id) {
  return request({
    url: `/wgcloud/api/device/${id}`,
    method: "get",
  });
}

//添加主机
export function addHost(data) {
  return request({
    url: "/wgcloud/api/device/insert",
    method: "post",
    data,
  });
}

//导出
export function deviceExport() {
  return request({
    url: "/wgcloud/api/device/export",
    method: "get",
    responseType: "blob",
  });
}

export function ces() {
  return request({
    url: `/wgcloud/api/device/ces`,
    method: "get",
  });
}
