import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import axios from "axios";
import { TsymbolData, TsymbolTradeData } from "@/lib/validators";

export const symbolRouter = createTRPCRouter({
  getSymbolData: protectedProcedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      const { data }: { data: TsymbolTradeData[] } = await axios.get(
        `https://www.bitmex.com/api/v1/trade/bucketed?binSize=1d&partial=false&symbol=${input.symbol}&count=30&reverse=true`,
      );
      console.log({ data });
      return { data };
    }),

  getAllSymbols: protectedProcedure.query(async () => {
    const { data }: { data: TsymbolData[] } = await axios.get(
      `https://www.bitmex.com/api/v1/instrument?columns=symbol&count=1000&reverse=true`,
    );

    return { data };
  }),
});
