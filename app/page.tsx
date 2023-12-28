"use client";
import Conteudo from "@/components/Conteudo";
import Header from "@/components/Header";
import HeaderContainer from "@/components/HeaderContainer";

export default function Home() {
  return (
    <main className="flex flex-col min-w-full min-h-screen">
      <Header />
      <div className="flex flex-col w-full min-h-[calc(100vh_-_4rem)] bg-slate-200">
        <HeaderContainer />
        <Conteudo />
      </div>
    </main>
  );
}