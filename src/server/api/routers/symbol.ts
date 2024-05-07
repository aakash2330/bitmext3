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
      const { data } = await axios.post(
        `${process.env.NEXTAUTH_URL}/api/instrument`,
        {
          symbol: input.symbol,
        },
      );
      return { data };
    }),

  getAllSymbols: publicProcedure.query(async () => {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/symbols`);
    return { data };
  }),
});
