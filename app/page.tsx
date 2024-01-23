"use client";
import Conteudo from "@/components/Conteudo";
import Header from "@/components/Header";
import HeaderContainer from "@/components/HeaderContainer";
import { useDisclosure, } from "@chakra-ui/react";

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
