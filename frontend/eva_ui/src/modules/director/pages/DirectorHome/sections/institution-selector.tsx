"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInstitutionStore } from "@/store/use-institution-store";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface IInstitutionSelectorProps {
  userId: number;
}

export const InstitutionSelector = (props: IInstitutionSelectorProps) => {
  const { userId } = props;
  const {
    institutions,
    selectedInstitution,
    setInstitution,
    fetchInstitutions,
  } = useInstitutionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInstitutions = async () => {
      await fetchInstitutions(userId);
      setLoading(false);
    };

    loadInstitutions();
  }, [fetchInstitutions, userId]);

  if (loading)
    return (
      <span>
        <ReloadIcon className="animate-spin" />
      </span>
    );

  return (
    <Select
      value={selectedInstitution || ""}
      onValueChange={(value) => {
        setInstitution(value);
        window.location.reload();
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona una institución" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Instituciones</SelectLabel>
          {institutions.map((institution) => (
            <SelectItem key={institution.id} value={String(institution.id)}>
              {`${institution.name} (${institution.level})`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
