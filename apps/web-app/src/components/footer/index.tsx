// "use client";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@components";
import { useSession } from "next-auth/react";

const FooterLink = ({ href, children }) => (
  <Link className="text-text2 hover:opacity-70 p-1 w-max" href={href}>
    {children}
  </Link>
);
const FooterHeading = ({ children }) => (
  <h6 className="text-text2 p-1 font-bold">{children}</h6>
);
export const Footer = () => {
  const session = useSession();
  const isAuthenticated = session.status == "authenticated";

  return (
    <footer className="absolute top-full w-full">
      <div className="bg-surface1 grid grid-cols-16 p-10 gap-y-3">
        <div className="lg:col-span-5 md:col-span-10 col-span-12">
          <Image
            className="m-2"
            src="https://picsum.photos/50/50"
            width={50}
            height={50}
            alt="logo"
          />
          <FooterHeading>Edu-platform</FooterHeading>
          <p className="p-2 text-text2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Praesentium officia quasi est repudiandae et reprehenderit soluta
            odit cumque maxime repellendus
          </p>
        </div>
        <div className="[&>a]:block lg:col-span-3 lg:col-start-7 md:col-span-5 md:col-start-12 col-span-4">
          <FooterHeading>Navegação</FooterHeading>
          <FooterLink href="/">Home</FooterLink>
          {isAuthenticated && (
            <FooterLink href="/dashboard">Minha área</FooterLink>
          )}
          <FooterLink href="/faq">Como funciona</FooterLink>
          {!isAuthenticated && (
            <>
              <FooterLink href="/auth/sign-in">Entrar</FooterLink>
              <FooterLink href="/auth/sign-up">Cadastrar</FooterLink>
            </>
          )}
        </div>
        <div className="[&>a]:block lg:col-span-3 md:col-span-7 md:col-start-1 col-span-8">
          <FooterHeading>Comece a usar</FooterHeading>
          <FooterLink href="/new-activity">Criar atividade</FooterLink>
        </div>
        <div className="[&>a]:block lg:col-span-3 md:col-span-7 md:col-start-10 col-span-8">
          <FooterHeading>Contato</FooterHeading>
          <p className="text-text2">
            <Icons.EMAIL size={24} style={{ display: "inline" }} />
            <span className="px-2 inline-block">iago.srm.is@gmail.com</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between p-4 bg-surface4">
        <p className="text-text2">Copyright</p>
        <FooterLink href="/privacy-policy">Política de Privacidade</FooterLink>
      </div>
    </footer>
  );
};
