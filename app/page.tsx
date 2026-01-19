"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [serial, setSerial] = useState("");

  function go() {
    const s = serial.trim();
    if (!s) return;
    router.push(`/zone/${encodeURIComponent(s)}`);
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/palm-bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur rounded-2xl p-6 w-full max-w-sm shadow-xl border border-[#E2D6C2]">
        <h1 className="text-2xl font-extrabold text-[#1C1F1E] text-center">
          Enter Zone Serial
        </h1>

        <p className="mt-2 text-sm text-[#5E5E5E] text-center">
          AI Solar Cooling & Irrigation for Palm Trees (UAE)
        </p>

        <input
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") go();
          }}
          type="text"
          placeholder="e.g. ZONE-001"
          className="mt-6 w-full rounded-xl border border-[#E2D6C2] px-4 py-3 text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#F7F5F0] bg-white"
        />

        <button
          onClick={go}
          className="mt-4 w-full rounded-xl bg-[#F7F5F0] py-3 font-bold text-[#1C1F1E] hover:bg-[#EDE8DF]"
        >
          Enter Zone
        </button>

        <p className="mt-3 text-xs text-[#5E5E5E] text-center">
          Tip: type a serial and press Enter.
        </p>
      </div>
    </main>
  );
}
