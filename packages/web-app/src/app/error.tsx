"use client";
import { Text } from "@components/ui/Typography";

// TODO
export default ({ error, reset }) => (
  <div className="h-full flex flex-col items-center justify-center">
    <Text>Something went wrong: {error}</Text>
  </div>
);
