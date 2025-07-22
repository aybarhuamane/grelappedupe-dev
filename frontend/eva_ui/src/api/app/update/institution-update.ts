"use server";

import { apiUrl } from "@/config";
import { fetchCore } from "@/api/core";

const url = apiUrl.evaluacion.updateInstitutionData;

export const updateInstitutionData = async () => {
  const response = await fetchCore(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const updateRegionalData = async () => {
  const response = await fetchCore(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};
