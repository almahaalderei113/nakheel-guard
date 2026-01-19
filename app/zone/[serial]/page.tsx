"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type DemoData = {
  location: string;
  lastUpdated: string;
  airTemp: number;
  soilMoisture: number;
  humidity: number;
  solarKw: number;
  wind: number;
  soilPH: number;
  salinityEC: number;
  cooling: boolean;
  irrigation: boolean;
};

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 2) {
  const n = Math.random() * (max - min) + min;
  return +n.toFixed(decimals);
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildRandomDemo(): DemoData {
  const location = pick([
    "Al Ain Oasis",
    "Liwa Date Farms",
    "Al Dhafra",
    "Al Foah",
    "Al Jimi Agricultural Area",
  ]);

  const airTemp = randInt(35, 50); // °C
  const soilMoisture = randInt(15, 65); // %
  const humidity = randInt(15, 60); // %
  const solarKw = randFloat(0.2, 1.8, 2); // kW
  const wind = randInt(0, 18); // km/h
  const soilPH = randFloat(6.6, 9.2, 1); // pH
  const salinityEC = randFloat(1.0, 10.0, 1); // dS/m

  const cooling = airTemp >= 46 && solarKw >= 0.6;
  const irrigation = soilMoisture <= 28 || (salinityEC >= 7.5 && soilMoisture <= 35);

  return {
    location,
    lastUpdated: "Just now",
    airTemp,
    soilMoisture,
    humidity,
    solarKw,
    wind,
    soilPH,
    salinityEC,
    cooling,
    irrigation,
  };
}

export default function ZonePage() {
  const routeParams = useParams<{ serial: string }>();
  const serial = decodeURIComponent(routeParams?.serial ?? "unknown");

  // ✅ Hydration-safe: start with null, fill after mount
  const [demo, setDemo] = useState<DemoData | null>(null);

  useEffect(() => {
    // Runs only in browser after hydration
    setDemo(buildRandomDemo());
  }, []);

  if (!demo) {
    return (
      <main className="min-h-screen bg-[#E9DCC7] p-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-extrabold text-[#1C1F1E]">Zone Dashboard</h1>
          <p className="mt-2 text-[#5E5E5E]">Loading sensor data…</p>

          <div className="mt-6 rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] p-5">
            <p className="text-sm font-semibold text-[#5E5E5E]">Serial</p>
            <p className="mt-1 text-xl font-extrabold text-[#1C1F1E]">{serial}</p>
          </div>
        </div>
      </main>
    );
  }

  const aiStatus =
    demo.cooling && demo.irrigation
      ? "Cooling + Irrigation Activated"
      : demo.cooling
      ? "Cooling Activated"
      : demo.irrigation
      ? "Irrigation Activated"
      : "Normal";

  const phLabel =
    demo.soilPH < 6.5 ? "Acidic (risk)" : demo.soilPH <= 7.8 ? "Near optimal" : "Alkaline";

  const salinityLabel =
    demo.salinityEC < 2
      ? "Low"
      : demo.salinityEC < 4
      ? "Moderate"
      : demo.salinityEC < 8
      ? "High"
      : "Very high";

  return (
    <main className="min-h-screen bg-[#E9DCC7] p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1C1F1E]">Zone Dashboard</h1>

            <p className="mt-1 font-semibold text-[#2E6B4F]">
              Serial: <span className="text-[#1C1F1E]">{serial}</span>
            </p>

            <p className="mt-1 text-sm font-medium text-[#5E5E5E]">
              Location: <span className="text-[#1C1F1E]">{demo.location}</span> • Last updated:{" "}
              <span className="text-[#1C1F1E]">{demo.lastUpdated}</span>
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] px-4 py-2 font-bold text-[#1C1F1E]"
          >
            Change serial
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] p-5">
          <p className="text-sm font-semibold text-[#5E5E5E]">AI Status</p>
          <p className="mt-1 text-xl font-extrabold text-[#1C1F1E]">{aiStatus}</p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card label="Air Temperature" value={`${demo.airTemp}°C`} />
            <Card label="Soil Moisture" value={`${demo.soilMoisture}%`} />
            <Card label="Humidity" value={`${demo.humidity}%`} />
            <Card label="Solar Output" value={`${demo.solarKw} kW`} />
            <Card label="Wind" value={`${demo.wind} km/h`} />

            <div className="rounded-2xl border border-[#E2D6C2] bg-white p-4">
              <p className="text-sm font-semibold text-[#5E5E5E]">Soil pH</p>
              <p className="mt-1 text-2xl font-extrabold text-[#1C1F1E]">{demo.soilPH}</p>
              <p className="mt-1 text-xs font-semibold text-[#5E5E5E]">{phLabel}</p>
            </div>

            <div className="rounded-2xl border border-[#E2D6C2] bg-white p-4">
              <p className="text-sm font-semibold text-[#5E5E5E]">Salinity (EC)</p>
              <p className="mt-1 text-2xl font-extrabold text-[#1C1F1E]">
                {demo.salinityEC} dS/m
              </p>
              <p className="mt-1 text-xs font-semibold text-[#5E5E5E]">{salinityLabel}</p>
            </div>

            <div className="rounded-2xl border border-[#E2D6C2] bg-white p-4 sm:col-span-2">
              <p className="text-sm font-semibold text-[#5E5E5E]">Systems</p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SystemPill label="Cooling" on={demo.cooling} />
                <SystemPill label="Irrigation" on={demo.irrigation} />
              </div>

              <p className="mt-3 text-xs text-[#5E5E5E]">
                Note: Values randomize after load each time the page is opened/refreshed (demo
                simulation).
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E2D6C2] bg-white p-4">
      <p className="text-sm font-semibold text-[#5E5E5E]">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-[#1C1F1E]">{value}</p>
    </div>
  );
}

function SystemPill({ label, on }: { label: string; on: boolean }) {
  const pillClass = on
    ? "bg-[#D9F2E4] text-[#2E6B4F]"
    : "bg-[#F1EDE5] text-[#5E5E5E]";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] px-4 py-3">
      <span className="font-semibold text-[#1C1F1E]">{label}</span>
      <span className={`rounded-full px-3 py-1 text-sm font-bold ${pillClass}`}>
        {on ? "ON" : "OFF"}
      </span>
    </div>
  );
}
