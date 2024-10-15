"use server";
import { redirect } from "next/navigation";
export const navigate = async (to: string) => {
  redirect(to);
};
