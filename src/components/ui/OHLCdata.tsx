import { TableCell } from "./table";

export default function OHLDdata({ data }: { data: any }) {
  return (
    <>
      {data.map((d: string, i: number) => {
        return <TableCell key={i}>{d}</TableCell>;
      })}
    </>
  );
}
