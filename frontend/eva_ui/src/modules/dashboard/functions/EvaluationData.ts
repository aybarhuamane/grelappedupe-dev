type ResultType = {
    name: string
    [key: string]: number | string
  }

type EvaluacionData = {
    curso: string;
    competencia: {
      id: number;
      competencia: string;
      capacidades: {
        id: number;
        capacidad: string;
        logros: {
          id: number;
          logro: string;
          valor: number;
        }[];
      }[];
    }[];
  }[];

  export const transformDataForChart = (evaluacionData: EvaluacionData, cursoId: string, competenciaId?: string) => {
    // Filtrar los datos por curso y competencia
    const cursoData = evaluacionData.find(curso => curso.curso === cursoId);

    if (!cursoData) {
      return { legends: [], names: [], data: [] };
    }

    let legends: string[] = [];
    let names: string[] = [];
    let data: ResultType[] = [];

    // Si seleccionamos competencia, extraemos capacidades
    if (competenciaId) {
      const competenciaData = cursoData.competencia.find(comp => comp.id === Number(competenciaId));
      if (competenciaData) {
        names = competenciaData.capacidades.map(cap => cap.capacidad);
        legends = competenciaData.capacidades[0]?.logros.map(logro => logro.logro) || [];

        data = competenciaData.capacidades.map(capacidad => {
          const result: ResultType = { name: capacidad.capacidad };
          capacidad.logros.forEach(logro => {
            result[logro.logro] = logro.valor;
          });
          return result;
        });
      }
    } else {
      // Caso donde se muestra por competencias
      names = cursoData.competencia.map(comp => comp.competencia);
      legends = cursoData.competencia[0]?.capacidades[0]?.logros.map(logro => logro.logro) || [];

      data = cursoData.competencia.map(competencia => {
        const result: ResultType = { name: competencia.competencia };
        competencia.capacidades.forEach(capacidad => {
          capacidad.logros.forEach(logro => {
            result[logro.logro] = Number(result[logro.logro] || 0) + logro.valor;
          });
        });
        return result;
      });
    }

    return { legends, names, data };
  };
