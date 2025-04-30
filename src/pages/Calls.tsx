import { useState } from "react";
import { Phone } from "lucide-react";
import CallFilters from "@/components/calls/CallFilters";
import CallTable from "@/components/calls/CallTable";
import PaginationControls from "@/components/calls/PaginationControls";
import { callData, extensionInfo } from "@/data/callsData";

const Calls = () => {
  const [filterOrigin, setFilterOrigin] = useState(true);
  const [filterDestination, setFilterDestination] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [desfecho, setDesfecho] = useState("todos");
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
    if (desfecho !== "todos") {
      if (desfecho === "atendida" && call.desfecho !== "ATENDIDA") return false;
      if (desfecho === "nao-atendida" && call.desfecho === "ATENDIDA") return false;
    }
    // Filtro por data (apenas data, sem hora)
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
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Phone className="text-primary h-6 w-6" />
          <h1 className="text-2xl font-bold">Registros de ligação</h1>
        </div>
        <CallFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterOrigin={filterOrigin}
          setFilterOrigin={setFilterOrigin}
          filterDestination={filterDestination}
          setFilterDestination={setFilterDestination}
          desfecho={desfecho}
          setDesfecho={setDesfecho}
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
