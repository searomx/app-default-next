import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { api } from "@/lib/api";
import { Base } from "@prisma/client";
import TableCnpjBase from "@/components/TableCnpjBase";

type TBase = {
  cnpj?: string[];
}
export async function POST(req: NextRequest, resp: NextResponse) {
  const cnpj = await req.json();
  if (cnpj) {
    for (let i = 0; i < cnpj.length; i++) {
      let cnpjx = cnpj[i];
      const res = await prisma.base.findFirst({
        where: {
          cnpj: cnpjx,
        },
      });
      if (!res) {
        const res = await prisma.base.create({
          data: {
            cnpj: cnpjx,
          },
        });
      } else {
        return NextResponse.json({ message: `cnpj` }, { status: 201 });
      }
    }
  }
  return NextResponse.json({ cnpj }, { status: 200 });

}
