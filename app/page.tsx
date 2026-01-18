"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [serial, setSerial] = useState("");
  const router = useRouter();

  function go() {
    const s = serial.trim();
    if (!s) return;
    router.push(`/zone/${encodeURIComponent(s)}`);
  }

  return (
    <main className="min-h-screen bg-[#E9DCC7] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-[#F7F5F0] p-8 shadow-xl border border-[#E2D6C2]">
        <h1 className="text-3xl font-extrabold text-[#1C1F1E] text-center">
          Nakheel Guard 🌴
        </h1>
        <p className="mt-3 text-center text-[#2E6B4F] font-semibold">
          Enter Zone Serial Number
        </p>

        <div className="mt-7">
          <label className="block text-sm font-bold text-[#6B3F2A] mb-2">
            Zone Serial
          </label>
          <input
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="e.g. NG-AIN-001"
            className="w-full rounded-2xl border border-[#E2D6C2] bg-white px-4 py-3 text-center font-semibold text-[#1C1F1E] outline-none focus:ring-2 focus:ring-[#2AA6A1]"
          />
          <p className="mt-2 text-xs text-[#5E5E5E] font-medium text-center">
            Your sensor data loads automatically after you enter the serial.
          </p>
        </div>

        <button
          onClick={go}
          className="mt-5 w-full rounded-2xl bg-[#2E6B4F] py-3 font-extrabold text-white hover:opacity-95 active:opacity-90"
        >
          Access Zone
        </button>

        <div className="mt-6 text-center text-xs font-semibold text-[#2E6B4F]">
          🇦🇪 Built for UAE palms • Solar cooling • Water-smart irrigation
        </div>
      </div>
    </main>
  );
}
