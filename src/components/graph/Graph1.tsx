import { Card, CardContent } from "@/components/ui/card";
import GraphPage from "./GraphPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  data: any;
  dataUnrefined: any;
}) {
if(data.length,dataUnrefined.length){
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"></div>
            <Card className="">
              <GraphPage
                data={JSON.stringify(data)}
                symbol={dataUnrefined[0].symbol}
              ></GraphPage>
            </Card>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardContent className="p-10 text-sm h-[40rem] overflow-auto">
                <div className="flex text-xl justify-center items-center">
                  {dataUnrefined[0].symbol}
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {dataUnrefined.map((d: any, index: number) => {
                    return (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>
                          {getFormattedDate(new Date(d.timestamp))}
                        </AccordionTrigger>
                        <AccordionContent>
                          {Object.keys(d).map((key) => {
                            return (
                              <div>
                                {key.toUpperCase()} : {d[key]}
                              </div>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
  }
  else{
    return <div>No data found</div>
  }
}
