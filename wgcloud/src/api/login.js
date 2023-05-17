import request from "@/utils/request";

//获取表格数据
export function logInfo(
  pageSize = 5,
  pageNum = 1,
  hostType,
  severity,
  startDate,
  endDate
) {
  return request({
    url: "/wgcloud/api/logInfo/list",
    method: "get",
    params: {
      pageSize,
      pageNum,
      hostType,
      severity,
      startDate,
      endDate,
    },
  });
}

//根据id查找信息
export function viewLogInfo(id) {
  return request({
    url: `/wgcloud/api/logInfo/${id}`,
    method: "get",
    params: {
      id,
    },
  });
}
