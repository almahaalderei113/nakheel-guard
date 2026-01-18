import Image from "next/image";
import Link from "next/link";

export default function HeritagePage() {
  return (
    <main className="min-h-screen bg-[#E9DCC7]">
      {/* HERO (oasis-path.jpg) */}
      <div className="relative h-[360px] w-full">
        <Image
          src="/heritage/oasis-path.jpg"
          alt="Al Ain oasis palm pathway"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute bottom-8 left-6 right-6 mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Nakheel Guard
          </h1>
          <p className="mt-2 text-white/90 font-semibold max-w-xl">
            Solar-powered intelligence to protect UAE palm trees and reduce water
            waste — inspired by heritage, built for the future.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-3xl bg-[#F7F5F0] p-6 md:p-8 shadow border border-[#E2D6C2]">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#1C1F1E]">
            Palm Trees: A Symbol of UAE Culture
          </h2>

          <p className="mt-4 text-[#1C1F1E] font-medium leading-relaxed">
            Date palms represent resilience, generosity, and life in the desert.
            In places like Al Ain Oasis, palms connect the UAE’s past to its
            sustainable future through agriculture, shade, and community.
          </p>

          {/* IMAGE + TEXT (emirati-palm.jpg) */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 items-center">
            <div className="relative h-[340px] rounded-2xl overflow-hidden">
              <Image
                src="/heritage/emirati-palm.jpg"
                alt="UAE palm heritage scene"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#1C1F1E]">
                How Nakheel Guard honors heritage
              </h3>
              <p className="mt-3 text-[#1C1F1E] font-medium leading-relaxed">
                Inspired by desert-smart irrigation traditions, Nakheel Guard
                uses real sensor readings and solar power to decide when to cool
                palms and when to irrigate — reducing evaporation and protecting
                palms during extreme heat.
              </p>

              <ul className="mt-4 space-y-2 text-sm font-semibold text-[#2E6B4F]">
                <li>• Each zone has a serial number</li>
                <li>• You enter only the serial — no manual data</li>
                <li>• The dashboard loads live sensor readings automatically</li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl bg-[#2E6B4F] px-5 py-3 font-extrabold text-white hover:opacity-95"
            >
              Enter Zone Serial →
            </Link>

            <Link
              href="/zone/NG-AIN-001"
              className="rounded-2xl bg-[#E9DCC7] border border-[#E2D6C2] px-5 py-3 font-extrabold text-[#1C1F1E] hover:opacity-95"
            >
              View Demo Zone →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center font-extrabold text-[#2E6B4F]">
          🇦🇪 Real images • UAE heritage • Smart protection
        </p>
      </div>
    </main>
  );
}
