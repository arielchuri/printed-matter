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
        "flex flex-wrap items-center justify-between px-4 py-2 bg-[#FFFFFF] border border-[#222D2C] font-mono text-xs text-[#222D2C]",
        className
      )}
      style={{ borderRadius: 0, boxShadow: "1px 1px 1px 0 rgba(128, 128, 128, 0.25)" }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-bold text-[#1A66A6] uppercase tracking-wider">LOC</span>
        <span>{location.placeName}</span>
        <span className="text-[#5B6360]">{location.lat}, {location.lon}</span>
        {location.elevation && <span className="text-[#5B6360]">ELEV: {location.elevation}</span>}
      </div>

      <div className="flex items-center gap-4 border-l border-[#222D2C]/20 pl-4 mt-1 sm:mt-0 flex-wrap">
        <span className="font-bold text-[#D35B50] uppercase tracking-wider">CAM</span>
        {camera.altitude && <span>ALT: {camera.altitude}</span>}
        {camera.facing && <span className="text-[#5B6360]">HDG: {camera.facing}</span>}
        {camera.zoom && <span className="text-[#5B6360]">Z: {camera.zoom}</span>}
        {camera.solarClock && <span className="font-bold text-[#222D2C] bg-[#DFDDD7] px-1.5 py-0.5">{camera.solarClock}</span>}
      </div>
    </div>
  );
};
