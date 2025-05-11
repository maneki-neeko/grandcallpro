import { useState } from "react";
import { ArrowUpDown, FileChartColumn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRangePicker } from "../components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";

const Reports = () => {
  const [reportType, setReportType] = useState("missed-calls");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [department, setDepartment] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>();
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  // Mock data for reports
  const reportData = {
    "missed-calls": [
      { ramal: "348", total: 45, percentage: "15%", avgResponseTime: "25s" },
      { ramal: "270", total: 32, percentage: "12%", avgResponseTime: "18s" },
      { ramal: "204", total: 28, percentage: "10%", avgResponseTime: "30s" },
    ],
    "least-answering": [
      { ramal: "222", total: 15, percentage: "5%", avgResponseTime: "45s" },
      { ramal: "311", total: 18, percentage: "6%", avgResponseTime: "38s" },
      { ramal: "204", total: 22, percentage: "8%", avgResponseTime: "28s" },
    ],
    "slow-response": [
      { ramal: "270", avgResponseTime: "35s", total: 42, percentage: "14%" },
      { ramal: "348", avgResponseTime: "32s", total: 38, percentage: "13%" },
      { ramal: "222", avgResponseTime: "30s", total: 25, percentage: "9%" },
    ],
    "most-calls": [
      { ramal: "270", total: 150, percentage: "25%", avgResponseTime: "15s" },
      { ramal: "348", total: 120, percentage: "20%", avgResponseTime: "18s" },
      { ramal: "204", total: 90, percentage: "15%", avgResponseTime: "22s" },
    ],
    "longest-calls": [
      { ramal: "222", avgDuration: "15m", total: 45, percentage: "12%" },
      { ramal: "270", avgDuration: "12m", total: 38, percentage: "10%" },
      { ramal: "348", avgDuration: "10m", total: 42, percentage: "11%" },
    ],
    "peak-hours": [
      { hour: "09:00", total: 85, percentage: "15%", avgDuration: "5m" },
      { hour: "10:00", total: 92, percentage: "16%", avgDuration: "4m" },
      { hour: "11:00", total: 78, percentage: "14%", avgDuration: "6m" },
    ],
  };

  const reportTitles = {
    "missed-calls": "Ramais com Mais Chamadas Perdidas",
    "least-answering": "Ramais que Menos Atendem",
    "slow-response": "Ramais com Maior Tempo de Resposta",
    "most-calls": "Ramais com Maior Volume de Chamadas",
    "longest-calls": "Ramais com Maior Duração Média",
    "peak-hours": "Horários com Maior Volume de Chamadas",
  };

  const departments = [
    "Todos",
    "Depto. Financeiro",
    "Depto. Administrativo",
    "Depto. Comercial",
    "Depto. TI",
    "Depto. Saúde",
  ];

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Main content */}
      <div className="flex-1 p-8 w-full">
        <header className="flex justify-between items-center mb-6 py-1">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">Relatórios</h1>
            <FileChartColumn className="text-primary h-6 w-6" />
          </div>
        </header>

        <div className="grid gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Relatório</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="missed-calls">
                        Chamadas Perdidas
                      </SelectItem>
                      <SelectItem value="least-answering">
                        Menor Taxa de Atendimento
                      </SelectItem>
                      <SelectItem value="slow-response">
                        Tempo de Resposta
                      </SelectItem>
                      <SelectItem value="most-calls">
                        Volume de Chamadas
                      </SelectItem>
                      <SelectItem value="longest-calls">
                        Duração das Chamadas
                      </SelectItem>
                      <SelectItem value="peak-hours">
                        Horários de Pico
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Departamento</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Período</Label>
                  <DateRangePicker
                    date={dateRange}
                    onDateChange={handleDateRangeChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duração Mínima (segundos)</Label>
                  <Input
                    type="number"
                    value={minDuration}
                    onChange={(e) => setMinDuration(e.target.value)}
                    placeholder="Ex: 30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Duração Máxima (segundos)</Label>
                  <Input
                    type="number"
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    placeholder="Ex: 300"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    className="w-full"
                    onClick={() => console.log("Aplicar filtros")}
                  >
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  {reportTitles[reportType as keyof typeof reportTitles]}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSort}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {sortOrder === "asc" ? "Crescente" : "Decrescente"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ramal</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Porcentagem</TableHead>
                    <TableHead>Tempo Médio de Resposta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData[reportType as keyof typeof reportData]
                    .sort((a, b) => {
                      const compareValue = sortOrder === "asc" ? 1 : -1;
                      return a.total > b.total ? compareValue : -compareValue;
                    })
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.ramal}
                        </TableCell>
                        <TableCell>{item.total}</TableCell>
                        <TableCell>{item.percentage}</TableCell>
                        <TableCell>
                          {item.avgResponseTime || item.avgDuration || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
