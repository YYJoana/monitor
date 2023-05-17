import request from "@/utils/request";

export function dbTable(pageSize = 5, pageNum = 1) {
  return request({
    url: "/wgcloud/api/dbTable/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
    },
  });
}

//删除数据
export function deleteTable(data) {
  return request({
    url: "/wgcloud/api/dbTable/delete",
    method: "Post",
    data,
  });
}

//添加
export function addTableHost(data) {
  return request({
    url: "/wgcloud/api/dbTable/save",
    method: "post",
    data,
  });
}
