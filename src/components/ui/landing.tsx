"use client";
import { Button } from "@/components/ui/button";
import LoginWithGoogle from "@/components/ui/loginWithGoogle";
import { signIn, signOut, useSession } from "next-auth/react";
import SparklesText from "../hero/LandingSparkles";
import { Session } from "next-auth";
import { ComboBoxResponsive } from "../form/symbolPopover";

export default function Landing({ session }: { session: Session | null }) {
  return (
    <div>
      <SparklesText session={session}></SparklesText>
      {!(session == null) ? (
        ""
      ) : (
        <div className="flex items-center justify-center ">
          <LoginWithGoogle></LoginWithGoogle>
        </div>
      )}
    </div>
  );
}
