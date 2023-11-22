"use client";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import Image from "next/image";

const Page = () => {
  const session = useSession();
  const user = session.data?.user;
  if (user)
    return (
      <div className="p-20 text-center">
        <Image
          className="mx-auto"
          alt={"Imagem de perfil"}
          src={user?.image || "/assets/images/generic_profile.svg"}
          width={150}
          height={150}
        />
        <p className="my-5">{user?.name}</p>
        <p className="my-5">{user?.email}</p>
      </div>
    );
  return <h4>You're not signed in</h4>;
};

export default Page;
