import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ICardProps {
  tag?: string;
  icon: JSX.Element;
  title: string;
  description?: string;
  labelButton: string;
  hrefButton: string;
  editHref?: string;
  competency?: number;
  capacity?: number;
  questions?: number;
}

export const CourseCard = (props: ICardProps) => {
  const {
    tag,
    title,
    icon,
    labelButton,
    hrefButton,
    description,
    competency,
    capacity,
    questions,
    editHref,
  } = props;

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold text-gray-600">
          <div className="flex items-center justify-between">
            {tag} {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600">{description}</p>}

        {(competency || capacity || questions) && (
          <div className="mt-3 flex justify-between p-2 rounded-md text-gray-700">
            {competency && (
              <Badge className="bg-blue-100 text-blue-800">
                Competencia: <span className="font-semibold">{competency}</span>
              </Badge>
            )}
            {capacity && (
              <Badge className="bg-green-100 text-green-800">
                Capacidad: <span className="font-semibold">{capacity}</span>
              </Badge>
            )}
            {questions && (
              <Badge className="bg-yellow-100 text-yellow-800">
                Preguntas: <span className="font-semibold">{questions}</span>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={hrefButton}>
          <Button size="sm">{labelButton}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
