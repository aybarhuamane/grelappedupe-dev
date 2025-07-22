'use client'
import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

interface IMapSectionProps {
  data: {
    lat: number
    lng: number
  }
}

export const MapSection = (props: IMapSectionProps) => {
  const { data } = props
  const { lat, lng } = data

  const customIcon = useMemo(
    () =>
      L.divIcon({
        className: 'custom-marker bg-red-500 rounded-full', // Clase CSS para estilos
        iconSize: [10, 10], // Tamaño del icono
        iconAnchor: [5, 5], // Ancla para centrar el puntito
      }),
    []
  )

  return (
    <MapContainer
      style={{ width: '100%', height: '350px' }}
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      markerZoomAnimation={true}
    >
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {lat && lng && (
        <Marker
          position={[lat, lng]}
          icon={customIcon}
        >
          <Popup>
            Selected Location: [{lat}, {lng}]
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
