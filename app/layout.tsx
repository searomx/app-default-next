import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DadosClienteProvider } from "./data/context/DadosClienteContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CNPJ-MUV",
  description: "Gerar Dados Clientes com base no CNPJ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="pt-br">
      <body className={inter.className}>
        <DadosClienteProvider>
          {children}
        </DadosClienteProvider>

      </body>
    </html>

  );
}