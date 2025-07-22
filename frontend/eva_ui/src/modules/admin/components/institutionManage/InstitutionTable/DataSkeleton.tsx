import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const DetailSkeleton = ({ label }: { label: string }) => (
    <div className="flex flex-col bg-gray-50 p-4 rounded-md border border-gray-200">
        <Label className="text-xs text-gray-500 uppercase font-semibold">{label}</Label>
        <Skeleton className="h-6 w-full rounded-md animate-pulse" />
    </div>
);

export function InstitutionSkeleton() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Nombre", "Código modular", "Código local", "Nivel", "Modalidad"].map((label, index) => (
                <DetailSkeleton key={index} label={label} />
            ))}
        </section>
    );
}

export function InstitutionDetailsSkeleton() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Área", "Dirección", "Región", "Provincia", "Distrito", "Latitud", "Longitud"].map((label, index) => (
                <DetailSkeleton key={index} label={label} />
            ))}
        </section>
    );
}
