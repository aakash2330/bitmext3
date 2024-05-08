import SymbolSearch from "@/components/form/symbolForm";
import { ComboBoxResponsive } from "@/components/form/symbolPopover";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Signout from "@/components/ui/signout";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import axios from "axios";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await api.symbol.getAllSymbols();
  const symbolData = data.map((s) => {
    return s.symbol;
  });
  const session = await getServerAuthSession();
  return (
    <div>
      <nav className="flex items-center justify-end">
        {session != null && <Signout></Signout>}
      </nav>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center p-7">
          <Card className="flex w-[100%] items-center justify-center bg-gradient-to-r from-purple-300 to-[#4299e1] p-7 sm:w-[50%]">
            <ComboBoxResponsive symbolData={symbolData}></ComboBoxResponsive>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
}
