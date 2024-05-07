import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import axios from "axios";

export const symbolRouter = createTRPCRouter({
  getSymbolData: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .query(async ({ input }) => {
      const { data } = await axios.get(
        `https://www.bitmex.com/api/v1/trade/bucketed?binSize=1d&partial=false&symbol=${input.symbol}&count=30&reverse=true`,
      );
      return { data };
    }),

  getAllSymbols: publicProcedure.query(async () => {
    const { data } = await axios.get(
      `https://www.bitmex.com/api/v1/instrument?columns=symbol&count=1000&reverse=true`,
    );
    return { data };
  }),
});
