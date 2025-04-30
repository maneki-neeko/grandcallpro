import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const PaginationControls: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Dados simulados para a paginação
  const totalEntries = 109073;
  const totalFilteredEntries = 239780;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Função para gerar números de página
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Sempre mostra a primeira página
    if (totalPages > 0) {
      pageNumbers.push(1);
    }

    // Páginas próximas à página atual
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adiciona elipses se necessário
    if (startPage > 2) {
      pageNumbers.push("ellipsis-start");
    }

    // Adiciona páginas ao redor da página atual
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Adiciona elipses se necessário
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis-end");
    }

    // Sempre mostra a última página
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
        <div className="text-sm text-muted-foreground">
          Mostrando os registros {(currentPage - 1) * entriesPerPage + 1} a{" "}
          {Math.min(currentPage * entriesPerPage, totalEntries)}
          num total de {totalEntries.toLocaleString()}
          (filtrado num total de {totalFilteredEntries.toLocaleString()}{" "}
          registros)
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Mostrar:</span>
          <Select
            value={entriesPerPage.toString()}
            onValueChange={(value) => {
              setEntriesPerPage(parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">registros</span>
        </div>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              className={`flex items-center gap-1 ${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Primeira</span>
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pageNumbers.map((page, index) =>
            page === "ellipsis-start" || page === "ellipsis-end" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2">...</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page as number)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              className={`flex items-center gap-1 ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <span className="hidden sm:inline">Última</span>
              <ChevronsRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationControls;
