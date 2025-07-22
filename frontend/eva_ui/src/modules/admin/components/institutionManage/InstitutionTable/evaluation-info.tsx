"use client";

import { EvaluacionesList } from "@/modules/director";
import { usePathname } from "next/navigation";

interface IEvaluationsInfoProps {
  institutionsAssigned: number;
}

export const EvaluationsInfo = (props: IEvaluationsInfoProps) => {
  const { institutionsAssigned } = props;
  const pathname = usePathname();

  return (
    <EvaluacionesList
      detailInstitution={institutionsAssigned}
      adminRedirect={`${pathname}`}
    />
  );
};
