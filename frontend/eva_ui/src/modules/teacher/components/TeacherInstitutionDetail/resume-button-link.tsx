import { Button } from "@/components/ui/button";
import { BarChartIcon } from "lucide-react";
import Link from "next/link";

export const ResumeButtonLink = () => {
  return (
    <Link href="/teacher/resumen">
      <Button className="flex items-center gap-2">
        <BarChartIcon className="w-4 h-4" />
        Resumen
      </Button>
    </Link>
  );
};
