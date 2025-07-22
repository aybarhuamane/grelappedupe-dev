'use client'
import { HeaderSection } from '@/modules/core'
import { FrmDocenteEditorPersonal } from '@/modules/director'
import { Suspense } from 'react'

export default function Create() {
  return (
    <main>
      <HeaderSection
        title="Agregar docente"
        subtitle="Complete los campos para añadir un nuevo docente"
        disableAddButton
        showBackButton
      />
      <Suspense fallback={<div>Loading...</div>}>
        <FrmDocenteEditorPersonal />
      </Suspense>
    </main>
  )
}
