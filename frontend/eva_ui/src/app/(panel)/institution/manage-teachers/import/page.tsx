import { DocentesImport } from '@/modules/director'
import { Suspense } from 'react'

export default async function ImportPage() {
  return <Suspense fallback={<div>Loading...</div>}><DocentesImport /></Suspense>
}
