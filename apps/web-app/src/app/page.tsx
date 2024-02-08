import { redirect } from "next/navigation";

export default async ({ children }) => {
  redirect("/home");
};
