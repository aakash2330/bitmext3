import axios from "axios";

export async function POST(request: Request) {
  const body =await  request.json();
  const { data } = await axios.get(
    `https://www.bitmex.com/api/v1/trade/bucketed?binSize=1d&partial=false&symbol=${body.symbol}&count=30&reverse=true`,
  );
  return Response.json({ data });
}
