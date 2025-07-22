type ResultType = {
  name: string
  [key: string]: number | string
}

export function converData(data: any[]): ResultType[] {
  // Orden deseado de los logros
  const logroOrden = ['Previo Inicio', 'Inicio', 'Proceso', 'Satisfactorio']

  // Recorrer el curso para extraer las competencias
  return data.flatMap((curso) =>
    curso.competencia.flatMap((competencia: any) =>
      competencia.capacidades.map((capacidad: any) => {
        // Crear el objeto base con el nombre de la capacidad
        const result: ResultType = {
          name: capacidad.capacidad, // Se usará el nombre de la capacidad
        }

        // Agrupar y sumar las notas por nombre de logro
        capacidad.logros.forEach((logro: any) => {
          const logroNombre = logro.logro
          if (!result[logroNombre]) {
            // Si no existe la clave, inicializarla con el valor actual
            result[logroNombre] = logro.valor
          } else {
            // Si ya existe, sumar el valor al existente
            result[logroNombre] = (result[logroNombre] as number) + logro.valor
          }
        })

        // Crear un nuevo objeto ordenado
        const orderedResult: ResultType = {
          name: result.name,
        }

        // Añadir las claves en el orden deseado
        logroOrden.forEach((logro) => {
          if (result[logro] !== undefined) {
            orderedResult[logro] = result[logro]
          }
        })

        return orderedResult
      })
    )
  )
}

export function extraerKeys(data: ResultType[]): string[] {
  const keys = Object?.keys(data[0])
  return keys.filter((key) => key !== 'name')
}

export function extraerNames(data: ResultType[]): string[] {
  return data.map((d) => d.name)
}
