/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { dashboardData } from '@/types'
import { useLocationContext } from '@/modules/dashboard'
import { renderOptionsDistrito, renderOptionsProvincia } from './functions'

export const LocationsFilters = () => {
  const { listLocation, selectedValues, functions } = useLocationContext()

  const regionList: dashboardData.IRegion[] = listLocation.listDrel
  const provinceList: dashboardData.IProvince[] = listLocation.listUgel
  const districtList: dashboardData.IDistrict[] = listLocation.listDistrito

  const regionSelected = selectedValues.drel
  const provinceValue = selectedValues.province
  const districtValue = selectedValues.district

  const handleRegionChange = functions?.handleRegionChange
  const handleProvinceChange = functions?.handleProvinceChange
  const handleDistrictChange = functions?.handleDistritoChange

  const optionsDistrict = renderOptionsDistrito(districtList)
  const optionsProvince = renderOptionsProvincia(provinceList)

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
              <Select
                value={regionSelected}
                onValueChange={(value) => {
                  handleRegionChange && handleRegionChange(value)
                }}
              >
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
                onValueChange={(value) => {
                  handleProvinceChange && handleProvinceChange(value)
                }}
              >
                <SelectTrigger className="w-full min-w-full bg-white h-10">
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Provincias</SelectLabel>
                    {optionsProvince?.map((province) => (
                      <SelectItem
                        key={province.key}
                        value={province.key}
                      >
                        {province.label}
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
                  handleDistrictChange && handleDistrictChange(value)
                }}
              >
                <SelectTrigger className="w-full min-w-full bg-white h-10">
                  <SelectValue placeholder="Selecciona un distrito" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Distritos</SelectLabel>
                    {optionsDistrict?.map((district) => (
                      <SelectItem
                        key={district.key}
                        value={district.key}
                      >
                        {district.label}
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

// <main className="py-6 p-2 bg-success-800 w-full sticky top-20 z-50">
// </main>
