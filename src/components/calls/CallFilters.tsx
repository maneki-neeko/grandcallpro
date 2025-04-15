
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface CallFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterOrigin: boolean;
  setFilterOrigin: (filter: boolean) => void;
  filterDestination: boolean;
  setFilterDestination: (filter: boolean) => void;
}

const CallFilters: React.FC<CallFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterOrigin,
  setFilterOrigin,
  filterDestination,
  setFilterDestination
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 flex items-center relative">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-8 w-full" 
            placeholder="Procurar por número..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {(filterOrigin || filterDestination || date) && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {(filterOrigin ? 1 : 0) + (filterDestination ? 1 : 0) + (date ? 1 : 0)}
            </span>
          )}
        </Button>

        <Select defaultValue="todos">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Desfecho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os desfechos</SelectItem>
            <SelectItem value="atendida">Atendida</SelectItem>
            <SelectItem value="nao-atendida">Não atendida</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/50 rounded-md">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Opções de busca</h3>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="filter-origin" 
                checked={filterOrigin} 
                onCheckedChange={(checked) => setFilterOrigin(checked as boolean)}
              />
              <label htmlFor="filter-origin" className="text-sm">Filtrar por Origem</label>
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox 
                id="filter-destination" 
                checked={filterDestination} 
                onCheckedChange={(checked) => setFilterDestination(checked as boolean)}
              />
              <label htmlFor="filter-destination" className="text-sm">Filtrar por Destino</label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Departamento</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="vendas">Vendas</SelectItem>
                <SelectItem value="suporte">Suporte</SelectItem>
                <SelectItem value="rh">Recursos Humanos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Data</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecionar data..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={setDate}
                  initialFocus 
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {date && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="self-end" 
                onClick={() => setDate(undefined)}
              >
                Limpar data
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallFilters;
