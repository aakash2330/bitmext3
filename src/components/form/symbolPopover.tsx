"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";

export function ComboBoxResponsive({ symbolData }: { symbolData: string[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null,
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            symbolData={symbolData}
            setSelectedStatus={setSelectedStatus}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            symbolData={symbolData}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  symbolData,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: string | null) => void;
  symbolData: string[];
}) {
  const router = useRouter();
  const [symbols, setSymbols] = React.useState<string[]>(symbolData);
  const [selectedSymbol, setSelectedSymbol] = React.useState<string | null>(
    null,
  );
  return (
    <Command>
      <CommandInput
        onChangeCapture={(e: any) => {
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
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {symbols.map((symbol, index) => {
            return (
              index < 10 && (
                <CommandItem
                  key={index}
                  value={symbol}
                  onSelect={(value: string) => {
                    setSelectedStatus(
                      symbols.find((priority) => priority === value) || null,
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
  );
}
