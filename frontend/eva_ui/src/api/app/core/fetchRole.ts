import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";

const apiBase = apiUrl.account.groups;

export async function fetchRoleList() {
  const response = await fetchCore(`${apiBase}`, {
    method: "GET",
  });
  return response;
}
