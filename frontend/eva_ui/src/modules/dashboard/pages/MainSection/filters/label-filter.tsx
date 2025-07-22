import { BookCopy } from "lucide-react";

interface LabelFilterProps {
  label: string;
  selectedName: string;
}

export const LabelFilterBar = ({ label, selectedName }: LabelFilterProps) => {
  const isSelected = selectedName !== "";

  return (
    <div
      key={selectedName}
      className={`py-1 px-2 cursor-pointer rounded-sm flex flex-col items-start justify-start text-sm ${
        isSelected
          ? "border-b-4 text-green-800 font-bold border-green-800"
          : "border-b-4 border-gray-200"
      }`}
    >
      <div className="flex items-center gap-1 min-w-56">
        <BookCopy className={`w-4 h-4 text-muted-foreground`} />
        <span className="text-muted-foreground">{label}: </span>
      </div>
      <h2
        className={`w-full text-right text-sm ${
          isSelected ? "text-green-800" : "text-muted-foreground"
        }`}
      >
        {selectedName || "Seleccionar " + label}
      </h2>
    </div>
  );
};
