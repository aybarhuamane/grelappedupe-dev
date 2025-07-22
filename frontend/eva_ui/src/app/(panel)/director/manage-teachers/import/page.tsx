import { DocentesImport } from "@/modules/director";
import { Suspense } from "react";

export default async function ImportPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <DocentesImport />
    </Suspense>
  );
}
