import request from "@/utils/request";

export function dbInfo(pageSize = 5, pageNum = 1) {
  return request({
    url: "/wgcloud/api/dbInfo/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
    },
  });
}

//删除数据
export function deleteDbInfo(data) {
  return request({
    url: "/wgcloud/api/dbInfo/delete",
    method: "Post",
    data,
  });
}

//添加
export function addDbInfo(data) {
  return request({
    url: "/wgcloud/api/dbInfo/saveDbInfo",
    method: "post",
    data,
  });
}
