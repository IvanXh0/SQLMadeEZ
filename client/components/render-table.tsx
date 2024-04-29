import { Creator } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface P {
  renderData: Creator[];
}

export const RenderTable = ({ renderData }: P) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(renderData[0]).map((key) => (
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
