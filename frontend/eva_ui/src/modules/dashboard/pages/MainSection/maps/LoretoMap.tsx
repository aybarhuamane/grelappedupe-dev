// components/LoretoMap.js
'use client'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import type { GeoJsonObject } from 'geojson'

import { useRouter } from 'next/navigation'

type ProvinceProperties = {
  name: string
  // Agrega aquí cualquier otra propiedad específica de la provincia
}

type ProvinceFeature = {
  type: 'Feature'
  properties: ProvinceProperties
  geometry: GeoJsonObject
}

export const LoretoMap = () => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null)

  const router = useRouter()

  useEffect(() => {
    fetch('/loreto.geojson')
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
  }, [])

  const style = (feature: any) => {
    return {
      fillColor: '#216869',
      weight: 2,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    }
  }

  const onEachFeature = (feature: ProvinceFeature, layer: any) => {
    // layer.bindPopup(feature.properties.name)
    layer.on({
      click: (event: any) => {
        const selectedProvince: string = feature.properties.name
        if (selectedProvince) {
          handleMapClick(selectedProvince)
        }
        // Aquí puedes realizar cualquier otra acción con la provincia seleccionada
      },
    })
    // layer.on('mouseover', (e: any) => {
    //   layer.openPopup()
    // })
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
    }
  }

  const handleMapClick = (value: string) => {
    // router.push(`?province=${value}`)
  }

  return (
    <MapContainer
      style={{ width: '80%', height: '450px' }}
      center={[-3.7437, -73.2516]}
      zoom={6.2}
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
