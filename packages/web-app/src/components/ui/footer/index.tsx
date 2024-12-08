// "use client";
import Link from "next/link";
import Image from "next/image";
import { Router } from "@infrastructure";
import { Icons } from "../icons";
import { SignInButton } from "../navbar/SignInButton";

const FooterLink = ({
  children,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link className="hover:opacity-70 p-1 w-max" href={href as any} {...props}>
    {children}
  </Link>
);

const FooterHeading = ({ children }) => (
  <h6 className="p-1 font-bold">{children}</h6>
);
export const Footer = async () => {
  // const session = await getSession();
  // console.log(session);
  // const isAuthenticated = session?.status == "authenticated";
  const isAuthenticated = false; // TODO get server session

  return (
    <footer className="bottom-0">
      <div className="grid grid-cols-16 p-10 gap-y-3">
        <div className="lg:col-span-5 md:col-span-10 col-span-16">
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
        <div className="[&>a]:block lg:col-span-3 lg:col-start-7 md:col-span-5 md:col-start-12 col-span-8">
          <FooterHeading>Browse</FooterHeading>
          <FooterLink href="/home#hero">Home</FooterLink>
          <FooterLink href="/home#how-it-works">How it works</FooterLink>
          <FooterLink href="/home#faqs">FAQ</FooterLink>
        </div>
        <div className="[&>a]:block lg:col-span-3 md:col-span-7 md:col-start-1 col-span-8">
          <FooterHeading>Get started</FooterHeading>
          {isAuthenticated ? (
            <FooterLink href={Router.teacherActivities}>Dashboard</FooterLink>
          ) : (
            <SignInButton />
          )}
        </div>
        <div className="[&>a]:block lg:col-span-3 md:col-span-7 md:col-start-10 col-span-8">
          <FooterHeading>Contact us</FooterHeading>
          <p className="text-text2">
            <Icons.EMAIL size={24} style={{ display: "inline" }} />
            <span className="px-2 inline-block">iago.srm.is@gmail.com</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center p-4">
        <p className="text-text2">
          Made with <span title="love">❤️</span> by{" "}
          <FooterLink
            href="https://www.linkedin.com/in/iago-soriano-roque-monteiro-03ba237a/"
            target="_blank"
          >
            Iago Soriano
          </FooterLink>{" "}
          and{" "}
          <FooterLink
            href="https://www.linkedin.com/in/patricia-rangel-sacramento"
            target="_blank"
          >
            Patrícia Sacramento
          </FooterLink>
        </p>
      </div>
    </footer>
  );
};
