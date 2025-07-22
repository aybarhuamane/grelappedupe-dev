import { Label } from "@/components/ui/label";

export const ItemField = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | number | boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 flex flex-col">
      <Label>{label}</Label>
      <span className="font-medium text-gray-900 text-lg">
        {value ? value : children}
      </span>
    </div>
  );
};
