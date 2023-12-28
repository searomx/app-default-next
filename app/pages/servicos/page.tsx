"use client";
import Header from "@/components/Header";

export default function Servicos() {
  return (
    <main className="flex flex-col min-w-full min-h-screen">
      <Header />
      <div className="flex w-full min-h-[calc(100vh_-_4rem)] justify-center items-center bg-slate-200">
        <h1 className="text-6xl font-bold text-white">SERVIÇOS</h1>
      </div>
    </main>
  );
}
