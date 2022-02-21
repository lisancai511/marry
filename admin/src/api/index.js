import request from "@/utils/request";

export function getRoutes() {
  return request({
    url: "/role/auth/tree",
    method: "get",
  });
}
