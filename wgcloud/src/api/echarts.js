import request from "@/utils/request";

//事件趋势图表数据
export function eventLine() {
  return request({
    url: "/wgcloud/api/logInfo/collect",
    method: "get",
  });
}
