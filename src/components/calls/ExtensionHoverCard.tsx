
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Type for department info
export type DepartmentInfo = {
  departamento: string;
  setor: string;
  subsetor: string;
  colaborador: string;
};

interface ExtensionHoverCardProps {
  extension: string;
  info: DepartmentInfo | undefined;
}

const ExtensionHoverCard: React.FC<ExtensionHoverCardProps> = ({ extension, info }) => {
  if (!info) {
    return <>{extension}</>;
  }

  return (
    <HoverCard>
      <HoverCardTrigger className="underline cursor-help text-blue-500">
        {extension}
      </HoverCardTrigger>
      <HoverCardContent className="bg-blue-500 text-white p-4 w-72">
        <div className="space-y-1">
          <p><strong>Departamento:</strong> {info.departamento}</p>
          <p><strong>Setor:</strong> {info.setor}</p>
          <p><strong>Subsetor:</strong> {info.subsetor}</p>
          <p><strong>Colaborador:</strong> {info.colaborador}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ExtensionHoverCard;
