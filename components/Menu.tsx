"use client";

import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <div className="flex w-full h-15 p-1 bg-slate-300  items-center m-1">
      <ul className="flex gap-5 cursor-pointer">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pages/servicos">Serviços</Link>
        </li>
      </ul>
    </div>
  );
}
