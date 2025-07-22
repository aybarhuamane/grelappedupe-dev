import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface IProps {
  option: boolean;
  text: string;
  onClick: () => void;
  className?: string;
}

export const ShowHideButton = (props: IProps) => {
  const { option, text, onClick, className } = props;
  return (
    <Button
      variant={option ? "default" : "outline"}
      size="sm"
      className={cn("gap-2", className)}
      onClick={onClick}
    >
      {option ? (
        <>
          <EyeOff className="h-4 w-4" />
          {text}
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
};
