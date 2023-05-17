import request from "@/utils/request";

//获取表格数据
export function telnetport(pageSize = 5, pageNum = 1, ip, telnetIp) {
  return request({
    url: "/wgcloud/api/telnetport/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
      ip,
      telnetIp,
    },
  });
}

//删除主机数据
export function deletePort(data) {
  return request({
    url: "/wgcloud/api/telnetport/delete",
    method: "Post",
    data,
  });
}

//添加端口
export function addPort(data) {
  return request({
    url: "/wgcloud/api/telnetport/save",
    method: "post",
    data,
  });
}

//编辑端口
export function editPort(data) {
  return request({
    url: "/wgcloud/api/telnetport/update",
    method: "Post",
    data,
  });
}

//修改监控状态
export function editMonitorState(state, id) {
  return request({
    url: "/wgcloud/api/telnetport/monitorState",
    method: "post",
    state,
    id,
  });
}
