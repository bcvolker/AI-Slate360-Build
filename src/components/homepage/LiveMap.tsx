"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import L from "leaflet";
import { useEffect, useState } from "react";

export default function LiveMap() {
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Fix Leaflet icon issue in Next.js (client-side only)
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    setCustomIcon(icon);
  }, []);

  if (!customIcon) return <div className="w-full h-full bg-slate-200 animate-pulse" />;

  return (
    <MapContainer 
      center={CEO_UPLOADS.mapConfig.center} 
      zoom={CEO_UPLOADS.mapConfig.zoom} 
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={CEO_UPLOADS.mapConfig.center} icon={customIcon}>
        <Popup>
          Active Mission Zone <br /> Austin, TX
        </Popup>
      </Marker>
    </MapContainer>
  );
}
