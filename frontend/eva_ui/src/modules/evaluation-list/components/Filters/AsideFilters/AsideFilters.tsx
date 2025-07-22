'use client'
import { Capacidades } from './sections'

export const AsideFilters = () => {

  return (
    <>
      <section className="sm:p-4 flex flex-col gap-3 min-w-64 w-64 max-w-64 border-r h-full">
        <main className="flex flex-col gap-2">
          <section>
            <h1 className="text-sm font-bold">
              CAPACIDADES SEGÚN CURSOS
            </h1>
          </section>
          <section>
            <Capacidades />
          </section>
        </main>
      </section>
    </>
  )
}
