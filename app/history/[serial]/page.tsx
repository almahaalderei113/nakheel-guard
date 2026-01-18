import Link from "next/link";

export default function HistoryPage({ params }: { params: { serial: string } }) {
  const serial = decodeURIComponent(params.serial);

  // ✅ Demo logs for now (Step 6 will make these real from Firebase)
  const logs = [
    {
      time: "Today • 05:30",
      title: "Irrigation Activated",
      detail: "Recommended split watering to reduce evaporation.",
      status: "Success",
    },
    {
      time: "Today • 12:10",
      title: "Cooling Triggered",
      detail: "Heat stress detected, solar available.",
      status: "Active",
    },
    {
      time: "Yesterday • 18:50",
      title: "Irrigation Activated",
      detail: "Moisture dropped below target threshold.",
      status: "Success",
    },
  ];

  return (
    <main className="min-h-screen bg-[#E9DCC7] p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1C1F1E]">Zone History</h1>
            <p className="mt-1 text-[#2E6B4F] font-semibold">
              Serial: <span className="text-[#1C1F1E]">{serial}</span>
            </p>
            <p className="text-sm text-[#5E5E5E] font-medium mt-1">
              Demo logs now • Next step: real logs from sensor database
            </p>
          </div>

          <Link
            href={`/zone/${encodeURIComponent(serial)}`}
            className="rounded-2xl border border-[#E2D6C2] bg-[#F7F5F0] px-4 py-2 font-bold text-[#1C1F1E] hover:opacity-95"
          >
            ← Back to dashboard
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          {logs.map((l, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#F7F5F0] p-5 shadow border border-[#E2D6C2]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-[#6B3F2A]">{l.time}</p>
                  <p className="mt-1 text-lg font-black text-[#1C1F1E]">{l.title}</p>
                  <p className="mt-2 text-sm font-medium text-[#1C1F1E] leading-relaxed">
                    {l.detail}
                  </p>
                </div>

                <span
                  className={
                    "rounded-full px-3 py-1 text-sm font-extrabold " +
                    (l.status === "Success"
                      ? "bg-[#2E6B4F] text-white"
                      : "bg-[#E9DCC7] text-[#1C1F1E] border border-[#E2D6C2]")
                  }
                >
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/heritage"
            className="rounded-2xl bg-[#2E6B4F] px-5 py-3 font-extrabold text-white hover:opacity-95"
          >
            UAE Palm Heritage →
          </Link>
          <Link
            href="/"
            className="rounded-2xl bg-[#F7F5F0] border border-[#E2D6C2] px-5 py-3 font-extrabold text-[#1C1F1E] hover:opacity-95"
          >
            Change Serial →
          </Link>
        </div>
      </div>
    </main>
  );
}
