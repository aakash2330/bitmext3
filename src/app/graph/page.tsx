import SymbolSearch from "@/components/form/symbolForm";
import Graph1 from "@/components/graph/Graph1";
import GraphPage from "@/components/graph/GraphPage";
import { GetFormattedDate } from "@/lib/date";
import { TupdatedTradeData } from "@/lib/validators";
import { api } from "@/trpc/server";
import axios from "axios";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (searchParams.symbol) {
    const { data } = await api.symbol.getSymbolData({
      symbol: searchParams.symbol as string,
    });
    const updatedData: TupdatedTradeData[] = data.map((s) => {
      return [
        JSON.stringify(GetFormattedDate(new Date(s.timestamp))),
        s.open,
        s.close,
        s.low,
        s.high,
      ];
    });
    console.log({ updatedData });
    return (
      <div key={Math.random()}>
        <Graph1 dataUnrefined={data} data={updatedData}></Graph1>
      </div>
    );
  }
}
