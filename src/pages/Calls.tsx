import { useState } from "react";
import { Phone } from "lucide-react";
import CallFilters from "@/components/calls/CallFilters";
import CallTable from "@/components/calls/CallTable";
import PaginationControls from "@/components/calls/PaginationControls";
import { callData, extensionInfo } from "@/data/callsData";

type CallStatus = "answered" | "not-answered";

const Calls = () => {
  const [filterOrigin, setFilterOrigin] = useState(true);
  const [filterDestination, setFilterDestination] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<CallStatus | "all">("all");
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Filtro completo
  const filteredData = callData.filter((call) => {
    // Filtro por busca de número
    let match = false;
    if (searchTerm) {
      if (filterOrigin && call.origem.includes(searchTerm)) match = true;
      if (filterDestination && call.destino.includes(searchTerm)) match = true;
      if (!match) return false;
    }
    // Filtro por desfecho
    if (filterStatus !== "all") {
      if (filterStatus === "answered" && call.desfecho !== "ATENDIDA")
        return false;
      if (filterStatus === "not-answered" && call.desfecho === "ATENDIDA")
        return false;
    }
    // Filtro por data
    if (date) {
      const callDate = call.data.split(" ")[0];
      const filterDate = date.toISOString().slice(2, 10).replace(/-/g, "-");
      if (!callDate.endsWith(filterDate)) return false;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen w-full">
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col justify-start p-8 max-w-5xl mx-auto">
        <div className="flex gap-3 mb-6 py-1 items-center">
          <h1 className="text-2xl font-bold">Registros de ligação</h1>
          <Phone className="text-primary h-6 w-6" />
        </div>
        <CallFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterOrigin={filterOrigin}
          setFilterOrigin={setFilterOrigin}
          filterDestination={filterDestination}
          setFilterDestination={setFilterDestination}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          date={date}
          setDate={setDate}
        />
        <CallTable calls={filteredData} extensionInfo={extensionInfo} />
        <PaginationControls />
      </main>
    </div>
  );
};

export default Calls;
