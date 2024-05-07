"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function SymbolSearch({ symbolData }: { symbolData: string[] }) {
  const router = useRouter();
  const [symbols, setSymbols] = useState<string[]>(symbolData);
  const [open, setOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  return (

    <div className="flex  justify-center items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] text-white text-center justify-start"
          >
            {selectedSymbol ? <>{selectedSymbol}</> : <>+ Set Symbol</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput
              onChangeCapture={(e:any) => {
                setSymbols((prev) => {
                  const newNames = symbolData.filter((s) => {
                    if (
                      s.startsWith(
                        (e.target as HTMLInputElement).value.toUpperCase(),
                      ) ||
                      s
                        .slice(1)
                        .startsWith(
                          (e.target as HTMLInputElement).value.toUpperCase(),
                        )
                    ) {
                      return true;
                    }
                  });
                  return newNames;
                });
              }}
              placeholder="Select Symbol..."
            />
            <CommandList>
              <CommandEmpty>No results Found</CommandEmpty>
              <CommandGroup>
                {symbols.map((symbol, index) => {
                  return (
                    index < 10 && (
                      <CommandItem
                        key={index}
                        value={symbol}
                        onSelect={(value:string) => {
                          setSelectedSymbol(
                            symbols.find((priority) => priority === value) ||
                              null,
                          );
                          setOpen(false);
                          router.push(`/graph?symbol=${value}`);
                        }}
                      >
                        <span>{symbol}</span>
                      </CommandItem>
                    )
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
