// import React from "react";
// import { Logo } from "./components";
// import { UserNavigation } from "./big-screen/UserNavigation";
// import { getServerSession } from "next-auth";
// import { SignInButton } from "./big-screen/SignInButton";

// export const BigScreenNavbar = async () => {
//   const session = await getServerSession();

//   const isAuthenticated = !!session?.user;

//   console.log({ session });

//   return (
//     <>
//       <nav className="max-w-full h-[5rem]">
//         <ul className="h-full flex flex-row justify-between overflow-x-hidden">
//           <li className="flex items-center">
//             <Logo />
//           </li>
//           <div className="flex flex-row w-full justify-start"></div>
//           <div className="flex">
//             {isAuthenticated ? (
//               <UserNavigation />
//             ) : (
//               <div className="p-3">
//                 <SignInButton />
//               </div>
//             )}
//           </div>
//         </ul>
//       </nav>
//     </>
//   );
// };
