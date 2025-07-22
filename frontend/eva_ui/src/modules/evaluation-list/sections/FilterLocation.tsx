/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect, useState } from 'react'
import {
  IDistrict,
  IProvince,
  IRegion,
  useDrelLocation,
} from '../hooks/useLocations'
import { useFilterFromUrl } from '@/modules/core'
import { LocationCombobox } from './ComboBoxFilter'
import { Select } from '@radix-ui/react-select'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const FiltersLocations = () => {
  const {
    getRegion,
    listRegion,
    listProvince,
    getProvince,
    listDistrict,
    getDistrict,
  } = useDrelLocation()
  const { updateFilters } = useFilterFromUrl()

  const regionSelected = 'Loreto'
  const [provinceValue, setProvinceValue] = useState('')
  const [districtValue, setDistrictValue] = useState('')

  useEffect(() => {
    getRegion()
    getProvince(provinceValue)
    if (regionSelected && provinceValue) {
      getDistrict(regionSelected, provinceValue)
    }
  }, [])

  const regionList: IRegion[] =
    listRegion?.filter((r) => r.region && r.region.trim() !== '') || []

  const provinceList: IProvince[] =
    listProvince?.filter((p) => p.province && p.province.trim() !== '') || []
  const districtList: IDistrict[] =
    listDistrict?.filter((d) => d.district && d.district.trim() !== '') || []

  const handleProvinceChange = (currentValue: string) => {
    setProvinceValue(currentValue)
    updateFilters({ province: currentValue, district: '' })
    getDistrict(regionSelected, currentValue)
    setDistrictValue('')
  }

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <main className="py-4 bg-primary w-full">
        <section className="container grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Lista de regiones */}
          <div className="flex gap-4 w-full">
            <div className="text-white w-full max-w-fit">
              <h1 className="text-sm font-bold">GREL </h1>
              <p className="text-xs ">Selecciona una GREL</p>
            </div>
            <div className="w-full">
              <Select value={regionSelected}>
                <SelectTrigger className="w-full min-w-full bg-white h-10">
                  <SelectValue placeholder="Selecciona una GREL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Regiones</SelectLabel>
                    {regionList?.map((province) => (
                      <SelectItem
                        key={province.region}
                        value={province.region}
                      >
                        {province.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Lista de provincias */}
          <div className="flex gap-4 w-full">
            <div className="text-white w-full max-w-fit">
              <h1 className="text-sm font-bold">Provincia</h1>
              <p className="text-xs">Selecciona una provincia</p>
            </div>
            <div className="w-full">
              <Select
                value={provinceValue}
                onValueChange={(value) => handleProvinceChange(value)}
              >
                <SelectTrigger className="w-full min-w-full bg-white h-10">
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Provincias</SelectLabel>
                    {provinceList?.map((province) => (
                      <SelectItem
                        key={province.province}
                        value={province.province}
                      >
                        {province.province}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Lista de distritos */}
          <div className="flex gap-4 w-full">
            <div className="text-white w-full max-w-fit">
              <h1 className="text-sm font-bold">Distrito</h1>
              <p className="text-xs">Selecciona un distrito</p>
            </div>
            <div className="w-full">
              <Select
                value={districtValue}
                onValueChange={(value) => {
                  updateFilters({ district: value })
                  setDistrictValue(value)
                }}
              >
                <SelectTrigger className="w-full min-w-full bg-white h-10">
                  <SelectValue placeholder="Selecciona un distrito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Distritos</SelectLabel>
                    {districtList?.map((district) => (
                      <SelectItem
                        key={district.district}
                        value={district.district}
                      >
                        {district.district}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  )
}
