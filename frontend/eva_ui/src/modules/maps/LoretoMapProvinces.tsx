// components/LoretoMap.js
'use client'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import type { GeoJsonObject } from 'geojson'

import { useSearchParams } from 'next/navigation'
import { useFilterFromUrl } from '../core/FilterFromUrl'
// import { capitalizeFirstWordWithSpace, removeAccents } from '@/utils'

type ProvinceProperties = {
  name: string
  // Agrega aquí cualquier otra propiedad específica de la provincia
}

type ProvinceFeature = {
  type: 'Feature'
  properties: ProvinceProperties
  geometry: GeoJsonObject
}

export const LoretoMapProvinces = () => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null)
  const { updateFilter } = useFilterFromUrl()

  const searchParams = useSearchParams()

  const selectedProvince = searchParams.get('province')

  useEffect(() => {
    fetch('/loreto-provincias.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
  }, [])

  const getColor = (district: string) => {
    if (district === selectedProvince) {
      return '#216869'
    }

    return '#bee3db'
  }

  const style = (feature: any) => {
    return {
      fillColor: getColor(feature.properties.name),
      weight: 2,
      color: 'white',
      dashArray: '3',
      fillOpacity: 1,
    }
  }

  const onEachFeature = (feature: ProvinceFeature, layer: any) => {
    layer.on({
      click: (event: any) => {
        const selectedProvince: string = feature.properties.name
        if (selectedProvince) {
          handleMapClick(selectedProvince)
        } else {
          handleMapClick('')
        }
        // Aquí puedes realizar cualquier otra acción con la provincia seleccionada
      },
    })

    //al hacer hover que se marque los bordes
    if (typeof layer.setStyle === 'function') {
      layer.on('mouseover', (e: any) => {
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        })
      })
      //al quitar el hover que se quite el marcado
      layer.on('mouseout', (e: any) => {
        layer.setStyle({
          weight: 2,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
        })
      })

      layer.on('mouseover', function (e: any) {
        layer.bindPopup(feature.properties.name).openPopup()
      })
      layer.on('mouseout', function (e: any) {
        layer.closePopup()
      })
    }
  }

  const handleMapClick = (value: string) => {
    if (value === selectedProvince) {
      updateFilter('province', '')
    } else {
      updateFilter('province', value)
    }
  }

  return (
    <MapContainer
      style={{ width: '100%', height: '400px' }}
      center={[-3.7437, -73.2516]}
      zoom={6}
      scrollWheelZoom={false}
      // markerZoomAnimation={true}
    >
      <TileLayer
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={style}
          onEachFeature={onEachFeature}

          // markersInheritOptions={true}
        />
      )}
    </MapContainer>
  )
}
