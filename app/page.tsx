"use client";
import Conteudo from "@/components/Conteudo";
import Header from "@/components/Header";
import HeaderContainer from "@/components/HeaderContainer";
import CompleteString from "@/lib/utils/CompleteString";
import { useDisclosure, } from "@chakra-ui/react";
import Papa from "papaparse";
import { useState } from "react";
import { api } from "./services/server";
import showToast from "@/lib/utils/showToast";

type TCnpj = {
  id: number;
  cnpj: string;
};
type TDadosCliente = {
  id: number;
  nome: string;
  cnpj: string;
};


export default function Home() {
  const { isOpen: isVisible, onClose, onOpen, } = useDisclosure({ defaultIsOpen: false });


  return (
    <main>
      <Header />
      <HeaderContainer />
      <Conteudo />
    </main>
  );
}
