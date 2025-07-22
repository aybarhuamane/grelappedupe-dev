import { fetchCore } from "@/api/core";
import { apiUrl } from "@/config";
import { dashboardCollege, detailDashboard } from "@/types";

const apiBase = apiUrl.evaluacion;
const apiBaseInstitucionEvaluated = apiUrl.evaluacion.listInstitutionEvaluated;

export async function fetchDashboardTeacher(
  filters: dashboardCollege.IDashboardTeacherFilter
) {
  const { competencia_id, grado_id, periodo_id, colegio_id, curso_id } =
    filters;

  const params = new URLSearchParams();
  if (colegio_id) params.append("colegio_id", colegio_id.toString());
  if (curso_id) params.append("curso_id", curso_id.toString());
  if (competencia_id)
    params.append("competencia_id", competencia_id.toString());
  if (grado_id) params.append("grado_id", grado_id.toString());
  if (periodo_id) params.append("periodo_id", periodo_id.toString());

  const response = await fetchCore(
    `${apiBase.dashboardSchool}?${params.toString()}`,
    {
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 180 }, // Revalidate every 3 minutes
    }
  );

  return response;
}

export async function fetchDirectorResumeDashboard(
  filters: dashboardCollege.IDashboardTeacherFilter
) {
  const { competencia_id, grado_id, periodo_id, colegio_id, curso_id } =
    filters;

  const params = new URLSearchParams();
  if (colegio_id) params.append("colegio_id", colegio_id.toString());
  if (curso_id) params.append("curso_id", curso_id.toString());
  if (competencia_id)
    params.append("competencia_id", competencia_id.toString());
  if (grado_id) params.append("grado_id", grado_id.toString());
  if (periodo_id) params.append("periodo_id", periodo_id.toString());

  const response = await fetchCore(
    `${apiBase.dashboardDirectorSchool}?${params.toString()}`,
    {
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 180 }, // Revalidate every 3 minutes
    }
  );

  return response;
}

export async function fetchTeacherAssignmentDashboard(
  filters: dashboardCollege.IResumeResponseDashboardFilter
) {
  const { course_assignment_id, competence_id } = filters;

  const params = new URLSearchParams();
  if (course_assignment_id)
    params.append("course_assignment_id", course_assignment_id.toString());
  if (competence_id) params.append("competence_id", competence_id.toString());

  const response = await fetchCore(
    `${apiBase.dashboardTeacherAssignment}?${params.toString()}`,
    {
      method: "GET",
      cache: "force-cache",
      next: { revalidate: 180 }, // Revalidate every 3 minutes
    }
  );

  return response;
}

export async function fetchInstitutionEvaluated(
  filter: detailDashboard.IInsitutionEvaluatedFilter
) {
  const {
    colegio_id,
    curso_id,
    competencia_id,
    grado_id,
    period_id,
    page,
    page_size,
    codigo_local,
    codigo_modular,
    colegio_nombre,
    distrito,
    drel,
    evaluacion,
    ugel,
  } = filter;

  const params = new URLSearchParams();

  if (colegio_id) params.append("colegio_id", colegio_id.toString());
  if (curso_id) params.append("curso_id", curso_id.toString());
  if (competencia_id)
    params.append("competencia_id", competencia_id.toString());
  if (grado_id) params.append("grado_id", grado_id.toString());
  if (page) params.append("page", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (codigo_local) params.append("codigo_local", codigo_local);
  if (codigo_modular) params.append("codigo_modular", codigo_modular);
  if (colegio_nombre) params.append("colegio_nombre", colegio_nombre);
  if (distrito) params.append("distrito", distrito);
  if (drel) params.append("drel", drel);
  if (ugel) params.append("ugel", ugel);
  if (evaluacion !== "all") params.append("evaluacion", evaluacion);

  const url = `${apiBaseInstitucionEvaluated}?${params.toString()}`;

  const response = await fetchCore(url, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });
  return response;
}

export async function fetchEvaluationHeader() {
  const response = await fetchCore(`${apiBase.newdetaildashboard}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });

  return response;
}

export async function fetchDashboard(query: detailDashboard.IDashboardFilter) {
  const {
    curso_id,
    competencia_id,
    drel,
    ugel,
    distrito,
    codigo_local,
    period_id,
  } = query;

  const params = new URLSearchParams();

  if (curso_id) params.append("curso_id", curso_id.toString());
  if (competencia_id)
    params.append("competencia_id", competencia_id.toString());
  if (drel) params.append("drel", drel);
  if (ugel) params.append("ugel", ugel);
  if (distrito) params.append("distrito", distrito);
  if (codigo_local) params.append("codigo_local", codigo_local);
  if (period_id) params.append("period_id", period_id.toString());

  const url = `${apiBase.dashboard}?${params.toString()}`;

  const response = await fetchCore(`${url}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });

  return response;
}

export async function fetchNewDashboard(
  query: detailDashboard.IDashboardFilter
) {
  const {
    curso_id,
    competencia_id,
    drel,
    ugel,
    distrito,
    codigo_local,
    period_id,
  } = query;

  const params = new URLSearchParams();

  if (curso_id) params.append("curso_id", curso_id.toString());
  if (competencia_id)
    params.append("competencia_id", competencia_id.toString());
  if (drel) params.append("drel", drel);
  if (ugel) params.append("ugel", ugel);
  if (distrito) params.append("distrito", distrito);
  if (codigo_local) params.append("codigo_local", codigo_local);
  if (period_id) params.append("period_id", period_id.toString());
  if (period_id) params.append("period_id", period_id.toString());

  const url = `${apiBase.newdashboard}?${params.toString()}`;

  const response = await fetchCore(`${url}`, {
    method: "GET",
    cache: "force-cache",
    next: { revalidate: 180 }, // Revalidate every 3 minutes
  });

  return response;
}

export async function fetchExport(query: detailDashboard.IDashboardFilter) {
  const {
    curso_id,
    competencia_id,
    drel,
    ugel,
    distrito,
    codigo_local,
    period_id,
    evaluacion,
  } = query;

  const params = new URLSearchParams();

  if (curso_id) params.append("curso_id", curso_id.toString());
  if (competencia_id)
    params.append("competencia_id", competencia_id.toString());
  if (drel) params.append("drel", drel);
  if (ugel) params.append("ugel", ugel);
  if (distrito) params.append("distrito", distrito);
  if (codigo_local) params.append("codigo_local", codigo_local);
  if (period_id) params.append("period_id", period_id.toString());
  if (period_id) params.append("period_id", period_id.toString());
  if (evaluacion !== "all") params.append("evaluacion", String(evaluacion));

  const url = `${apiBase.exportInstitutesEvaluates}?${params.toString()}`;

  const response = await fetchCore(`${url}`, {
    method: "GET",
  });

  return response;
}
