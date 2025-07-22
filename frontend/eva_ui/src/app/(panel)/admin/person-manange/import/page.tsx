import { PersonsImport } from '@/modules/admin'
import { Suspense } from 'react'

export default async function ImportPage() {
  return <Suspense fallback={<div className='container p-6'>Loading...</div>}><PersonsImport /></Suspense>
}
