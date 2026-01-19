"use client";

import { useEffect, useMemo, useState } from "react";

type ZonePageProps = {
  params: { serial: string };
};

type DemoData = {
  location: string;
  lastUpdated: string;
  airTemp: number;
  soilMoisture: number;
  humidity: number;
  solarKw: number;
  wind: number;
  cooling: boolean;
  irrigation: boolean;
  ph: number;
  salinity: number;
};

function rand(min: number, max: number) {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10;
}

function buildRandomDemo(): DemoData {
  const airTemp = Math.round(rand(34, 48));
  const humidity = Math.round(rand(15, 55));
  const soilMoisture = Math.round(rand(10, 55));
  const solarKw = rand(0.2, 1.3);
  const wind = Math.round(rand(0, 18));
  const ph = rand(6.5, 8.3);
  const salinity = rand(0.5, 5.5);

  // Simple “AI” decisions (demo logic)
  const cooling = airTemp >= 42 || (airTemp >= 39 && humidity >= 40);
  const irrigation = soilMoisture <= 25;

  return {
    location: "Al Ain Oasis",
    lastUpdated: "Just now",
    airTemp,
    soilMoisture,
    humidity,
    solarKw,
    wind,
    cooling,
    irrigation,
    ph,
    salinity,
  };
}

export default function ZonePage({ params }: ZonePageProps) {
  const serial = useMemo(() => decodeURIComponent(params.serial), [params.serial]);

  // Important: start with null to avoid hydration mismatch,
  // then randomize on client once page loads.
  const [demo, setDemo] = useState<DemoData | null>(null);

  useEffect(() => {
    setDemo(buildRandomDemo());
  }, []);

  if (!demo) {
    return (
      <main className="min-h-screen bg-[#E9DCC7] p-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-extrabold text-[#1C1F1E]">Zone Dashboard</h1>
          <p className="mt-2 text-[#5E5E5E]">Loading sensor data…</p>
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

  return (
    <main className="min-h-screen bg-[#E9DCC7] pb-24 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1C1F1E]">Zone Dashboard</h1>
            <p className="mt-1 text-[#5E5E5E]">
              Serial: <span className="font-semibold text-[#1C1F1E]">{serial}</span>
            </p>
            <p className="mt-1 text-sm text-[#5E5E5E]">
              Location: {demo.location} • Last updated: {demo.lastUpdated}
            </p>
          </div>

          <button
            onClick={() => setDemo(buildRandomDemo())}
            className="rounded-xl border border-[#E2D6C2] bg-white px-4 py-2 font-semibold text-[#1C1F1E] hover:bg-[#F7F5F0]"
          >
            Refresh Data
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-[#E2D6C2] bg-white p-5">
          <p className="text-sm font-semibold text-[#5E5E5E]">AI Status</p>
          <p className="mt-1 text-2xl font-extrabold text-[#1C1F1E]">{aiStatus}</p>
          <p className="mt-2 text-sm text-[#5E5E5E]">
            Demo simulation: values randomize on load and when you press Refresh.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card label="Air Temperature" value={`${demo.airTemp}°C`} />
          <Card label="Humidity" value={`${demo.humidity}%`} />
          <Card label="Soil Moisture" value={`${demo.soilMoisture}%`} />
          <Card label="Solar Power" value={`${demo.solarKw} kW`} />
          <Card label="Wind" value={`${demo.wind} km/h`} />
          <Card label="Soil pH" value={`${demo.ph}`} />
          <Card label="Soil Salinity" value={`${demo.salinity} dS/m`} />
          <div className="rounded-2xl border border-[#E2D6C2] bg-white p-4">
            <p className="text-sm font-semibold text-[#5E5E5E]">Systems</p>
            <div className="mt-3 grid grid-cols-1 gap-3">
              <SystemPill label="Cooling" on={demo.cooling} />
              <SystemPill label="Irrigation" on={demo.irrigation} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E2D6C2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <a
            href={`/zone/${encodeURIComponent(serial)}`}
            className="flex-1 text-center font-bold text-[#1C1F1E]"
          >
            Dashboard
          </a>

          <a
            href="/heritage"
            className="flex-1 text-center font-semibold text-[#5E5E5E] hover:text-[#1C1F1E]"
          >
            Heritage
          </a>

          <a
            href={`/history/${encodeURIComponent(serial)}`}
            className="flex-1 text-center font-semibold text-[#5E5E5E] hover:text-[#1C1F1E]"
          >
            History
          </a>
        </div>
      </nav>
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
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] px-3 py-2">
      <span className="font-semibold text-[#1C1F1E]">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-xs font-bold ${
          on ? "bg-[#D9F2E4] text-[#1C1F1E]" : "bg-[#F1EDE5] text-[#5E5E5E]"
        }`}
      >
        {on ? "ON" : "OFF"}
      </span>
    </div>
  );
}
