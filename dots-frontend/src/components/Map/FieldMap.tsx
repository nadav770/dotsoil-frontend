// dots-frontend/src/components/Map/FieldMap.tsx
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { Field } from '../../api/types';

type Props = { field: Field };

export default function FieldMap({ field }: Props) {
  // Field כולל center עם lat/lng — לא field.lat/field.lng
  const center: [number, number] = [field.center.lat, field.center.lng];

  return (
    <div style={{ height: 320, width: '100%', borderRadius: 12, overflow: 'hidden' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url={import.meta.env.VITE_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {field.sensors.map(s => (
          <CircleMarker
            key={s.id}
            center={[s.lat, s.lng]}
            radius={8}
            pathOptions={{ color: '#1976d2' }}
          >
            <Popup>Sensor {s.id}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
