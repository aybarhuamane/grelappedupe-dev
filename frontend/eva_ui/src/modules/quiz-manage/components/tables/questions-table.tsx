/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SearchFilter } from "@/components/custom/search-filter";
import { Button } from "@/components/ui/button";
import { useParamsFilters } from "@/lib/filter-url";
import { questions } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuestionTableAction } from "../../hooks/use-question-table-action";
import { TabsLayout } from "../tabs-layout";
import { CustomDataTable } from "./custom-data-table";
import { questionsColumns } from "./questions-columns";

interface IProps {
  competenceId: number;
  search?: string;
}

export default function QuestionsTable({ competenceId, search }: IProps) {
  const [page, setPage] = useState<number>(1);
  const [sizePage, setSizePage] = useState(15);
  const [ordering, setOrdeing] = useState<boolean>(false);
  const { getQuestionsList, listQuestions, loadingQuestion } =
    useQuestionTableAction();
  const { getParams } = useParamsFilters();

  const newDegree = getParams({ key: "degree", value: "" });
  const newLevel = getParams({ key: "level", value: "" });

  useEffect(() => {
    getQuestionsList({
      capacity__competence__course__id: competenceId,
      page,
      search: search,
      page_size: sizePage,
      degree_number: Number(newDegree),
      level__id: Number(newLevel),
    });
  }, [page, search, sizePage, ordering, newDegree, newLevel]);

  const data: questions.IQuestionListAction[] =
    listQuestions.results
      .map((question) => ({
        ...question,
        code: question.code,
        level: question.level,
        capacity: question.capacity,
      }))
      .sort((a, b) => {
        const numA = parseInt(a.code.replace("P", ""), 10);
        const numB = parseInt(b.code.replace("P", ""), 10);
        return numA - numB;
      }) || [];

  return (
    <TabsLayout
      title={`Preguntas (${listQuestions.count})`}
      infoTitle="Detalles"
      infoDescription="Las preguntas son habilidades que se deben adquirir para completar el curso."
    >
      <div className="container bg-white mx-auto space-y-4 pb-6">
        <div className="flex justify-between items-center gap-4">
          <SearchFilter
            icon
            queryKey="questions"
            placeholder="Buscar por: cod., pregunta, nivel, capacidad"
          />
          <Button asChild>
            <Link
              href={`/admin/quiz-manage/${competenceId}/grados/questions/create?competence=${competenceId}&degree=${newDegree}&level=${newLevel}`}
            >
              <Plus size={18} className="mr-2" />
              Agregar pregunta
            </Link>
          </Button>
        </div>
        <CustomDataTable
          columns={questionsColumns(competenceId, newDegree, newLevel)}
          data={data}
          paginationProps={{
            page,
            onPageChange: (page) => {
              setPage(page);
            },
            count: listQuestions.count,
            pageSize: sizePage,
            onPageSizeChange: (sizePage) => {
              setSizePage(sizePage);
            },
          }}
        />
      </div>
    </TabsLayout>
  );
}
