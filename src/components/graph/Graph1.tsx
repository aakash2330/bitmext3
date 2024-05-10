"use client";
import { Card, CardContent } from "@/components/ui/card";
import GraphPage from "./GraphPage";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TsymbolData,
  TsymbolTradeData,
  TupdatedTradeData,
} from "@/lib/validators";
import { useRecoilState } from "recoil";
import { symbolAtom } from "@/atoms/symbolAtom";
import useRefinedTradeWSdata from "@/app/test/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OHLDdata from "../ui/OHLCdata";

export function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}
export default function Graph1({
  data,
  dataUnrefined,
}: {
  data: TupdatedTradeData[];
  dataUnrefined: TsymbolTradeData[];
}) {
  const tradeData = useRefinedTradeWSdata();
  const [symbolData, setSymbolData] = useRecoilState(symbolAtom);
  if ((data.length, dataUnrefined.length)) {
    return (
      <div className="flex w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"></div>
              <Card className="">
                <GraphPage
                  data={JSON.stringify(data)}
                  symbol={dataUnrefined[0]?.symbol ?? "S"}
                ></GraphPage>
              </Card>
            </div>
            <div>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="flex items-center justify-center">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="live">Live</TabsTrigger>
                </TabsList>
                <TabsContent
                  className="h-[40rem] overflow-auto p-6 text-sm"
                  value="details"
                >
                  <CardContent>
                    <div className="grid gap-3">
                      <div className="font-semibold">{symbolData.symbol}</div>
                      <ul className="grid gap-3">
                        {Object.keys(symbolData).map((key, index) => {
                          return (
                            <li
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <span className="text-muted-foreground">
                                {key}
                              </span>
                              <span>
                                {symbolData[key as keyof TsymbolData]}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </CardContent>
                </TabsContent >
                <TabsContent className="h-[40rem] overflow-auto p-6 text-sm" value="live">
                  <Table>
                    <TableCaption>Live</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>TimeStamp</TableHead>
                        <TableHead>Open</TableHead>
                        <TableHead>High</TableHead>
                        <TableHead>Low</TableHead>
                        <TableHead>Close</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tradeData.map((t: any, index: number) => {
                        return (
                          <TableRow key={index}>
                            <OHLDdata  data={t}></OHLDdata>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    );
  } else {
    return <div>No data found</div>;
  }
}
