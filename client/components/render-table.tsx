import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Creator } from "@/utils/types";

interface P {
  renderData: Creator[];
}

export const RenderTable = ({ renderData }: P) => {
  if (!renderData.length) {
    return (
      <p className="py-3 space-y-5 text-semibold text-lg">
        You&apos;ve yet to add data to this table.
      </p>
    );
  }

  const columns = Object.keys(renderData[0]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {renderData.map((row, index) => (
          <TableRow key={index}>
            {Object.values(row).map((value, valueIndex) => (
              <TableCell key={`${index}-${valueIndex}`}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
