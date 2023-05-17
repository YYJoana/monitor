import request from "@/utils/request";

export function flowList() {
  return request({
    url: "/wgcloud/api/flow/list",
    method: "get",
  });
}
