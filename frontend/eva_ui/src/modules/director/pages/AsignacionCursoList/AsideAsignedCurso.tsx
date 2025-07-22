const steps = [
  {
    title: 'Seleccionar docente',
    description: 'Seleccionar docente para asignar curso',
  },
  {
    title: 'Seleccionar curso',
    description: 'Seleccionar curso para asignar docente',
  },
  {
    title: 'Seleccionar grado',
    description: 'Seleccionar grado para asignar curso',
  },
]

export const AsideAsignedCurso = () => {
  return (
    <main className="flex flex-col gap-2 bg-white rounded-md p-4">
      <header className="flex flex-col gap-1">
        <h2 className="font-bold">Para la creación de evaluaciones</h2>
        <p className="text-gray-500 text-sm">
          Para la asignación de cursos a docentes, se requiere
        </p>
      </header>
      <section>
        <ul className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <li
              key={index}
              className="flex gap-2"
            >
              <div className="rounded-full border py-1 px-3 h-fit">
                <span className="text-xs text-gray-500 font-bold">
                  {index + 1}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <p className="text-gray-500 text-xs">
          La asignación de cursos a docentes es necesaria para la creación de
          evaluaciones, esta relación creará una evaluación por cada curso
          asignado.
        </p>
      </footer>
    </main>
  )
}
