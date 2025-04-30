import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import CallFilters from "@/components/calls/CallFilters";
import CallTable from "@/components/calls/CallTable";
import PaginationControls from "@/components/calls/PaginationControls";
import { callData, extensionInfo } from "@/data/callsData";

const Calls = () => {
  const [filterOrigin, setFilterOrigin] = useState(true);
  const [filterDestination, setFilterDestination] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar os dados baseados nos critérios
  const filteredData = callData.filter((call) => {
    if (searchTerm === "") return true;

    if (filterOrigin && call.origem.includes(searchTerm)) return true;
    if (filterDestination && call.destino.includes(searchTerm)) return true;

    return false;
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
        />
        <CallTable calls={filteredData} extensionInfo={extensionInfo} />
        <PaginationControls />
      </main>
    </div>
  );
};

export default Calls;
