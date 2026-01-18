import Link from "next/link";

export default function ZonePage({
  params,
}: {
  params: { serial: string };
}) {
  const serial = decodeURIComponent(params.serial);

  const demo = {
    location: "Al Ain Oasis",
    lastUpdated: "Just now",
    airTemp: 44,
    soilMoisture: 34,
    humidity: 25,
    solarKw: 0.9,
    wind: 8,
    cooling: true,
    irrigation: true,
  };

  return (
    <main className="min-h-screen bg-[#E9DCC7] p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1C1F1E]">
              Zone Dashboard
            </h1>
            <p className="mt-1 text-[#2E6B4F] font-semibold">
              Serial: <span className="text-[#1C1F1E]">{serial}</span>
            </p>
            <p className="text-sm text-[#5E5E5E] font-medium mt-1">
              Location: {demo.location} • Last updated: {demo.lastUpdated}
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] px-4 py-2 font-bold text-[#1C1F1E] hover:opacity-95"
          >
            ← Change serial
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Air Temperature" value={`${demo.airTemp} °C`} />
          <Card title="Soil Moisture" value={`${demo.soilMoisture} %`} />
          <Card title="Humidity" value={`${demo.humidity} %`} />
          <Card title="Solar Output" value={`${demo.solarKw} kW`} />
          <Card title="Wind" value={`${demo.wind} km/h`} />

          <div className="rounded-3xl bg-[#F7F5F0] p-5 shadow border border-[#E2D6C2]">
            <p className="text-sm font-extrabold text-[#6B3F2A]">
              System Status
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold text-[#1C1F1E]">Cooling</span>
              <StatusPill on={demo.cooling} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold text-[#1C1F1E]">Irrigation</span>
              <StatusPill on={demo.irrigation} />
            </div>

            <div className="mt-5 rounded-2xl bg-[#E9DCC7] border border-[#E2D6C2] p-4">
              <p className="font-extrabold text-[#1C1F1E]">Recommendation</p>
              <p className="mt-1 text-sm font-semibold text-[#2E6B4F]">
                Water early morning + evening to reduce evaporation.
              </p>
              <p className="mt-2 text-xs font-medium text-[#5E5E5E]">
                Next step: connect real sensor data by serial.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3 flex-wrap">
          <Link
            href={`/heritage?serial=${encodeURIComponent(serial)}`}
            className="rounded-2xl bg-[#2E6B4F] px-4 py-3 font-extrabold text-white hover:opacity-95"
          >
            UAE Palm Heritage →
          </Link>
          <Link
            href={`/history/${encodeURIComponent(serial)}`}
            className="rounded-2xl bg-[#F7F5F0] border border-[#E2D6C2] px-4 py-3 font-extrabold text-[#1C1F1E] hover:opacity-95"
          >
            View History →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[#F7F5F0] p-5 shadow border border-[#E2D6C2]">
      <p className="text-sm font-extrabold text-[#6B3F2A]">{title}</p>
      <p className="mt-2 text-3xl font-black text-[#1C1F1E]">{value}</p>
    </div>
  );
}

function StatusPill({ on }: { on: boolean }) {
  return (
    <span
      className={
        "rounded-full px-3 py-1 text-sm font-extrabold " +
        (on
          ? "bg-[#2E6B4F] text-white"
          : "bg-[#E9DCC7] text-[#1C1F1E] border border-[#E2D6C2]")
      }
    >
      {on ? "ON" : "OFF"}
    </span>
  );
}
