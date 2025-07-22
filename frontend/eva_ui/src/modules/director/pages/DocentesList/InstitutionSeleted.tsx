"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterFromUrl } from "@/modules/core";
import { useInstitutionStore } from "@/store/use-institution-store";
import { detailInstitution } from "@/types";

interface IInstitutionSeletedProps {
  institutionsAssigned: detailInstitution.IDetailInstitutionList[];
}

export const InstitutionSeleted = (props: IInstitutionSeletedProps) => {
  const { institutionsAssigned } = props;
  const { getParams, updateFilters } = useFilterFromUrl();
  const { selectedInstitution } = useInstitutionStore();

  return (
    <main className="border-l px-6">
      <Label>Institución asignada actual</Label>
      <Select value={selectedInstitution || ""} disabled>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Institución asignada actual" />
        </SelectTrigger>
        <SelectContent>
          {institutionsAssigned.map((institution) => (
            <SelectItem
              key={institution.id}
              value={institution?.id?.toString()}
            >
              {`${institution.institution.name} - ${institution.level.name} - ${institution.modular_code} - ${institution.local_code}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </main>
  );
};
