import React from "react";
import { clsx } from "clsx";

export interface DataReadoutProps {
  location?: {
    lat: number | string;
    lon: number | string;
    elevation?: number | string;
    placeName?: string;
  };
  camera?: {
    altitude?: number | string;
    facing?: string;
    declination?: number | string;
    zoom?: number | string;
    solarClock?: string;
  };
  className?: string;
}

export const DataReadout: React.FC<DataReadoutProps> = ({
  location = { lat: "0.0236° N", lon: "37.9062° E", elevation: "1,240m", placeName: "Kenya — Turkana" },
  camera = { altitude: "128.4km", facing: "034° NNE", declination: "45°", zoom: "8.4", solarClock: "14:22 UTC" },
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-between px-4 py-2 bg-[var(--white)] font-mono text-xs text-[var(--text)]",
        className
      )}
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-bold text-[var(--primary-500)] uppercase tracking-wider">LOC</span>
        <span>{location.placeName}</span>
        <span className="text-[var(--text-muted)]">{location.lat}, {location.lon}</span>
        {location.elevation && <span className="text-[var(--text-muted)]">ELEV: {location.elevation}</span>}
      </div>

      <div className="flex items-center gap-4 border-l border-[var(--border-gray)]/20 pl-4 mt-1 sm:mt-0 flex-wrap">
        <span className="font-bold text-[var(--secondary-color)] uppercase tracking-wider">CAM</span>
        {camera.altitude && <span>ALT: {camera.altitude}</span>}
        {camera.facing && <span className="text-[var(--text-muted)]">HDG: {camera.facing}</span>}
        {camera.zoom && <span className="text-[var(--text-muted)]">Z: {camera.zoom}</span>}
        {camera.solarClock && <span className="font-bold text-[var(--text)] bg-[var(--gray-100)] px-1.5 py-0.5">{camera.solarClock}</span>}
      </div>
    </div>
  );
};
