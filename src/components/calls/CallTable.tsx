import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { CallStatusBadge } from './CallStatusBadge';
import ExtensionHoverCard, { DepartmentInfo } from './ExtensionHoverCard';

// Type for call data
export interface CallRecord {
  origem: string;
  destino: string;
  data: string;
  desfecho: string;
  duracao: string;
}

interface CallTableProps {
  calls: CallRecord[];
  extensionInfo: Record<string, DepartmentInfo>;
}

const CallTable: React.FC<CallTableProps> = ({ calls, extensionInfo }) => {
  return (
    <Card className="w-full max-w-5xl bg-card-custom">
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-28">
                Origem <span className="text-gray-400">↑</span>
              </TableHead>
              <TableHead className="text-center w-28">
                Destino <span className="text-gray-400">↑</span>
              </TableHead>
              <TableHead className="text-center w-40">
                Data e Hora <span className="text-gray-400">↓</span>
              </TableHead>
              <TableHead className="text-center w-32">
                Desfecho <span className="text-gray-400">↑</span>
              </TableHead>
              <TableHead className="text-center w-28">
                Duração <span className="text-gray-400">↑</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">
                  <ExtensionHoverCard extension={call.origem} info={extensionInfo[call.origem]} />
                </TableCell>
                <TableCell className="text-center">
                  <ExtensionHoverCard extension={call.destino} info={extensionInfo[call.destino]} />
                </TableCell>
                <TableCell className="text-center">{call.data}</TableCell>
                <TableCell className="text-center">
                  <CallStatusBadge status={call.desfecho} />
                </TableCell>
                <TableCell className="text-center">{call.duracao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CallTable;
