import axios from "axios";

export async function GET(request: Request) {
  const { data } = await axios.get(
    `https://www.bitmex.com/api/v1/instrument?columns=symbol&count=1000&reverse=true`,
  );
  return Response.json({ data });
}

// const { data } = await axios.get( `https://www.bitmex.com/api/v1/trade/bucketed?binSize=1d&partial=false&symbol=${body.symbol}&count=2&reverse=true`,);
