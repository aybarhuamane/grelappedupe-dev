'use client'
import {
  AutoColumnSize,
  Autofill,
  ContextMenu,
  CopyPaste,
  DropdownMenu,
  Filters,
  HiddenRows,
  registerPlugin,
} from 'handsontable/plugins'
import {
  CheckboxCellType,
  DropdownCellType,
  NumericCellType,
  registerCellType,
} from 'handsontable/cellTypes'
import { HotTable, HotColumn } from '@handsontable/react'
import { Data } from './data'
import { useParams, useRouter } from 'next/navigation'

import 'handsontable/dist/handsontable.full.css'
import { useState } from 'react'
import Handsontable from 'handsontable'
import { scoreFunctionsConvert, ToastCustom } from '@/modules/core'
import { assessments, courseEvaluation } from '@/types'
import { Button } from '@/components/ui/button'
import { Save, CloudUpload } from 'lucide-react'
import { assessmentsFuntions } from '@/api'
import DialogConfirmacion from '@/modules/core/components/dialogos/confirmacion'
import { toast } from 'react-toastify'
import Link from 'next/link'

registerCellType(CheckboxCellType)
registerCellType(NumericCellType)

registerPlugin(AutoColumnSize)
registerPlugin(Autofill)
registerPlugin(ContextMenu)
registerPlugin(CopyPaste)
registerPlugin(DropdownMenu)
registerPlugin(Filters)
registerPlugin(HiddenRows)
registerCellType(DropdownCellType)

const options = ['INADECUADA', 'ADECUADA', 'OMITIDA', 'NPC']

interface ITableEvaluacionProps {
  data: Data
  columns: string[]
  isBlocked?: boolean
  questions?: courseEvaluation.ICourseEvaluationScore[]
}

const calcHeightScreen = (): number => {
  const height = window.innerHeight
  return height - 340
}

export function transformData(
  data: Array<any[]>,
  course_assignment_id: number,
  questions: courseEvaluation.ICourseEvaluationScore[]
): assessments.IAssessmentPost[] {
  const transformedData: assessments.IAssessmentPost[] = []
  const { getScore } = scoreFunctionsConvert

  // Iterar sobre el array de arrays
  data.forEach((itemArray, index) => {
    // Recorrer las preguntas desde el índice 5 (asumiendo que las respuestas comienzan allí)
    for (let i = 5; i < itemArray.length; i++) {
      const questionId = Number(questions[i - 5]?.question.id)
      const evaluationQuestion = Number(questions[i - 5]?.id)

      if (!isNaN(questionId)) {
        const evaluation: assessments.IAssessmentPost = {
          id: evaluationQuestion,
          score: Number(getScore(itemArray[i])), // Obtener el puntaje de la respuesta
          student_age: itemArray[5], // La edad del estudiante está en la posición 4
          course_assignment: course_assignment_id, // ID de la asignación del curso
          student: itemArray[1], // ID del estudiante
          question: Number(questions[i - 5]?.question.id), // ID de la pregunta
          period: 1,
        }

        transformedData.push(evaluation)
      }
    }
  })

  return transformedData
}

export const
TableEvaluacion = (props: ITableEvaluacionProps) => {
  const { data, columns, questions, isBlocked } = props
  const { id } = useParams()
  const router = useRouter()
  const { createOrUpdateAssessmentBulks } = assessmentsFuntions
  // Definir las opciones para las columnas tipo select

  const [tableData, setTableData] = useState<Data>(data)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  // Esta función captura los cambios en la tabla
  const handleChange = (change: Handsontable.CellChange[] | null) => {
    if (!change) {
      return
    }
    change.forEach((changeItem) => {
      const [row, column, oldValue, newValue] = changeItem
      const newData = tableData
      newData[row][Number(column)] = newValue
      setTableData(newData)
    })
  }

  const colWidthsInitial = [60, 320, 320, 60, 60]
  const colSelects = columns.map(() => 120)
  const colWidths = colWidthsInitial.concat(colSelects)

  const handleSaveData = async (data: assessments.IAssessmentPost[]) => {
    setIsOpen(false)
    setIsLoad(true)

    try {
      const res = await createOrUpdateAssessmentBulks(data)
      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Evaluación guardada"
            message="La evaluación se guardó correctamente"
          />
        )
        setTimeout(() => {
          refreshWindow()
        }, 2000)
      } else {
        toast.error(
          <ToastCustom
            title="Error al guardar"
            message="Ocurrió un error al guardar la evaluación"
          />
        )
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(
        <ToastCustom
          title="Error al guardar"
          message="Ocurrió un error al guardar la evaluación"
        />
      )
    }

    setIsLoad(false)
  }

  const onSubmmit = () => {
    setIsOpen(true)
  }

  const refreshWindow = () => {
    window.location.reload()
  }

  return (
    <main className="w-full grid grid-cols-1 gap-4">
      <section className="bg-gray-300 py-2">
        <main className="container flex justify-between">
          <div></div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={isBlocked}
              onClick={() => router.push(`/teacher/evaluaciones/${id}/import`)}
            >
              <CloudUpload
                size={16}
                className="mr-2"
              />
              Importar lista
            </Button>
            <Button
              size="sm"
              variant="secondary"
              // className="bg-gray-200 border-emerald-600 flex items-center border-2 text-emerald-600 hover:bg-emerald-600 hover:text-white"
              onClick={() => onSubmmit()}
              disabled={isLoad || isBlocked}
            >
              <Save
                size={16}
                className="mr-2"
              />
              Guardar cambios
            </Button>
          </div>
        </main>
      </section>
      <main className="flex flex-col container py-6">
        <HotTable
          className="w-full h-full z-10"
          colWidths={colWidths}
          data={data}
          colHeaders={columns}
          dropdownMenu={false}
          contextMenu={false}
          filters={false}
          rowHeaders={true}
          manualRowMove={true}
          navigableHeaders={true}
          autoWrapRow={true}
          autoWrapCol={true}
          height={calcHeightScreen()}
          licenseKey="non-commercial-and-evaluation"
          fixedColumnsLeft={5}
          afterChange={function (
            change: Handsontable.CellChange[] | null,
            source: Handsontable.ChangeSource
          ) {
            handleChange(change)
          }}
        >
          {columns.map((column, index) => (
            <HotColumn
              key={index}
              data={index + 1}
              readOnly={index < 5}
              className={index > 3 ? 'htCenter' : ''}
              type={index < 5 ? 'text' : 'dropdown'}
              {...(index >= 5 && { source: options })}
            />
          ))}
        </HotTable>
      </main>
      <DialogConfirmacion
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Guardar evaluación"
        description="¿Estás seguro de guardar la evaluación?"
        aceppLabel="Guardar"
        cancelLabel="Cancelar"
        onSubmitConfirm={() =>
          handleSaveData(transformData(data, Number(id), questions || []))
        }
      />
    </main>
  )
}
