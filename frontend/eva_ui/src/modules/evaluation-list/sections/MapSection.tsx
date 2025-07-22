'use client'
import { useFilterFromUrl } from '@/modules/core/FilterFromUrl'
import dynamic from 'next/dynamic'

const LoretoMapProvinces = dynamic(
  () => import('@/modules/maps').then((mod) => mod.LoretoMapProvinces),
  { ssr: false }
)

const LoretoMapDistricts = dynamic(
  () => import('@/modules/maps').then((mod) => mod.LoretoMapDistricts),
  { ssr: false }
)

export const MapSection = () => {
  const { getParams } = useFilterFromUrl()
  const distrito = getParams('district', '') !== ''

  return (
    <>
      {!distrito && <LoretoMapProvinces />}
      {distrito && <LoretoMapDistricts />}
    </>
  )
}
