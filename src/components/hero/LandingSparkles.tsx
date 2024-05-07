"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import Link from "next/link";
import { CircleChevronRightIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "next-auth";

export default function SparklesText({ session }: { session: Session | null }) {
  const { toast } = useToast();
  return (
    <div className="flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      <h1 className="hover:pointer relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-5xl">
        <Link
          onClick={() => {
            if (session == null) {
              toast({
                title: "Please Login Before Continuing",
              });
            }
          }}
          href={"/graph"}
          className="flex items-center justify-center gap-2"
        >
          <div>TRADEX</div>
          <CircleChevronRightIcon></CircleChevronRightIcon>
        </Link>
      </h1>
      <div className="relative h-40 w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-100 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-200 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-100 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
