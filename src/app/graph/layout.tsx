import SymbolSearch from "@/components/form/symbolForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Signout from "@/components/ui/signout";
import { getServerAuthSession } from "@/lib/auth";
import { api } from "@/trpc/server";
import axios from "axios";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await api.symbol.getAllSymbols();
  const symbolData = data.data.map((s: any) => {
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
          <Card className="flex w-[50%] items-center justify-center bg-gradient-to-r from-purple-300 to-[#4299e1] p-7">
            <SymbolSearch symbolData={symbolData}></SymbolSearch>
          </Card>
        </div>
        {children}
      </div>
    </div>
  );
}
