"use client";
import { Session } from "inspector";
import { Button } from "@/components/ui/button";
import LoginWithGoogle from "@/components/ui/loginWithGoogle";
import { signIn, signOut, useSession } from "next-auth/react";
import SparklesText from "../hero/LandingSparkles";

export default function Landing({ session }: { session?: any }) {
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
