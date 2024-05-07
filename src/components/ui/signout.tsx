"use client";
import { signOut } from "next-auth/react";
import { Button } from "./button";

export default function Signout() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
