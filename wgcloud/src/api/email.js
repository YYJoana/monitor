import request from "@/utils/request";

//获取表格数据
export function email() {
  return request({
    url: "/wgcloud/api/mailSet/list",
    method: "get",
  });
}

//添加
export function addEmail(data) {
  return request({
    url: "/wgcloud/api/mailSet/save",
    method: "post",
    data,
  });
}

//测试
export function testEmail(data) {
  return request({
    url: "/wgcloud/api/mailSet/test",
    method: "post",
    data,
  });
}

//删除邮件
export function deleteEmail(ids) {
  return request({
    url: "/wgcloud/api/mailSet/delete",
    method: "delete",
    data: {
      ids,
    },
  });
}

//修改邮件
export function editEmail(data) {
  return request({
    url: "/wgcloud/api/mailSet/update",
    method: "put",
    data,
  });
}

//根据id查找信息
export function viewMail(id) {
  return request({
    url: `/wgcloud/api/mailSet/${id}`,
    method: "get",
    params: {
      id,
    },
  });
}
