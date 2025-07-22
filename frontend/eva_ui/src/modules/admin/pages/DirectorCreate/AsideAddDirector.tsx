const steps = [
    {
      title: 'Seleccionar una persona',
      description: 'Seleccionar una persona para asignar como director',
    },
    {
      title: 'De no existir, crear una persona',
      description: 'Crear una persona si no existe en el sistema',
    },
    {
      title: 'Verificar la persona',
      description: 'Verificar que la persona seleccionada sea la correcta',
    },
  ]

  export const AsideAddDirector = () => {
    return (
      <main className="flex flex-col gap-2 bg-white rounded-md px-4">
        <header className="flex flex-col gap-1">
          <h2 className="font-bold">Para crear un nuevo director</h2>
          <p className="text-gray-500 text-sm">
            Para la creación de un director, se requiere
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
            La creación de un director es necesaria para la administración de la plataforma.
          </p>
        </footer>
      </main>
    )
  }
