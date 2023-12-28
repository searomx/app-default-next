import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

interface DadosTokenProps {
  id: string;
  token: string;
}

export const POST = async (req: Request, res: Response) => {
  const { token }: DadosTokenProps = await req.json();
  try {
    const tokenauth = await prisma.token.create({
      data: {
        token,
      },
    });
    return NextResponse.json({ message: "dados:", tokenauth }, { status: 201 });
  } catch (error) {
    console.log("Ocorreu o erro: ", error);
  }
};
