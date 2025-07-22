'use client'

import { Suspense } from 'react'
import { PersonTable } from '../tablePerson/PersonTable'

export const ListPerson = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <PersonTable />
        </Suspense>
    </div>
  )
}
