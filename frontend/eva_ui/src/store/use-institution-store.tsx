"use client";
import { fetchDetailInstitutionList } from "@/api/app/educativa/fetchDetailsInstitutions";
import { detailInstitution } from "@/types";
import { create } from "zustand";

type TInstitutions = {
  id: number;
  name: string;
  level: string;
};

interface InstitutionState {
  institutions: TInstitutions[];
  selectedInstitution: string | null;
  setInstitution: (id: string) => void;
  fetchInstitutions: (userId: number) => Promise<void>;
}

export const useInstitutionStore = create<InstitutionState>((set) => ({
  institutions: [],
  selectedInstitution:
    typeof window !== "undefined"
      ? localStorage.getItem("institution") || null
      : null, // Verifica si window está definido

  setInstitution: (id) => {
    set({ selectedInstitution: id });
    if (typeof window !== "undefined") {
      localStorage.setItem("institution", id);
    }
  },

  fetchInstitutions: async (userId) => {
    try {
      const res = await fetchDetailInstitutionList({
        director__person__id: userId,
      });

      if (res.ok) {
        const data = await res.json();
        const institutions = data.results.map(
          (inst: detailInstitution.IDetailInstitutionList) => ({
            id: inst.id,
            name: inst.institution.name,
            level: inst.level.name,
          })
        );

        set({ institutions });

        // Evitar acceder a localStorage en el servidor
        if (typeof window !== "undefined") {
          const savedInstitution = localStorage.getItem("institution");
          if (!savedInstitution && institutions.length > 0) {
            set({ selectedInstitution: String(institutions[0].id) });
            localStorage.setItem("institution", String(institutions[0].id));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  },
}));
