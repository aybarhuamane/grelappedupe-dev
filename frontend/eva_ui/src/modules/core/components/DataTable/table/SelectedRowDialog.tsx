'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { assessmentsFuntions } from '@/api'
import { ToastCustom } from '../../Toast/ToastCustom'
import { assessments, courseEvaluation } from '@/types'
import DialogConfirmacion from '../../dialogos/confirmacion'

interface IProps {
  isDrawerOpen: boolean
  setDrawerOpen: (value: boolean) => void
  selectedRow: any
  dataList: courseEvaluation.ICourseEvaluationItem[]
}

export const SelectedRowDialog = (props: IProps) => {
  const { isDrawerOpen, setDrawerOpen, selectedRow, dataList } = props
  const { createOrUpdateAssessmentBulks } = assessmentsFuntions

  const student_selected =
    selectedRow as courseEvaluation.ICourseEvaluationItem['student']

  // Filtrar las preguntas basadas en el alumno seleccionado
  const studentSelected = dataList?.filter(
    (question) => question.student?.id === student_selected?.id || ''
  )

  const options = ['INADECUADA', 'ADECUADA', 'OMITIDA']

  // Estado para controlar las opciones seleccionadas
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string
  }>({})

  // Maneja los cambios en las opciones seleccionadas
  const handleOptionChange = (questionIdx: number, value: string) => {
    setSelectedOptions((prevState) => ({ ...prevState, [questionIdx]: value }))
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setSelectedOptions({})
    }
  }, [isDrawerOpen])

  //selected student
  const selectedStudent =
    selectedRow as courseEvaluation.ICourseEvaluationItem['student']

  // Función para manejar el guardado
  const handleSaveData = async (dataList: assessments.IAssessmentPost[]) => {
    try {
      const res = await createOrUpdateAssessmentBulks(dataList)
      if (res.ok) {
        toast.success(
          <ToastCustom
            title="Evaluación guardada"
            message="La evaluación se guardó correctamente"
          />
        )
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
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  const onSubmit = () => {
    // Preparar los datos de la evaluación
    const assessmentData: assessments.IAssessmentPost[] =
      studentSelected.flatMap((question, questionIdx) => {
        return question.evaluation.map((evaluation) => ({
          id: evaluation.id,
          question: evaluation.question.id,
          student: student_selected.id,
          score: 1,
          // student_age: student_selected.age,
          student_age: 1,
          course_assignment: question.course_assignment,
          period: question.period,
        }))
      })

    // Guardar los datos
    handleSaveData(assessmentData)
    setIsOpen(false)
  }

  return (
    <>
      <Dialog
        open={isDrawerOpen}
        onOpenChange={setDrawerOpen}
      >
        <DialogContent className="sm:max-w-screen-2xl h-full max-h-[800px] flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-2xl font-medium">
                    {selectedStudent?.name} {selectedStudent?.last_name}
                  </h1>
                  <h2 className="text-sm text-gray-500">
                    Responde las siguientes preguntas basadas en el desempeño
                    del alumno.
                  </h2>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 h-full overflow-y-auto">
            {studentSelected?.map((question, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between gap-6">
                  <label className="font-medium text-sm">
                    {question.evaluation?.map((evaluation, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between gap-6"
                      >
                        <div className="flex items-center w-1/2">
                          <label className="font-medium text-sm">
                            {evaluation.question.code} -{' '}
                            {evaluation.question.question}
                          </label>
                        </div>
                        <div className="w-1/2">
                          <RadioGroup
                            defaultValue="INADECUADA"
                            onValueChange={(value) =>
                              handleOptionChange(index, value)
                            }
                            orientation="horizontal"
                            className="flex gap-4"
                          >
                            {options.map((option, idx) => (
                              <div
                                key={idx}
                                className="py-8 flex flex-col items-center justify-between w-full gap-2"
                              >
                                <RadioGroupItem
                                  key={idx}
                                  value={option}
                                  className="w-16 h-16 rounded-lg border border-gray-300"
                                />
                                <label htmlFor={`r${index}-${idx}`}>
                                  {option}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    ))}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDrawerOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              onClick={() => setIsOpen(true)}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogConfirmacion
        isOpenConfirm={isOpen}
        onCloseConfirm={() => setIsOpen(false)}
        tittleConfirm="Guardar evaluación"
        description="¿Estás seguro de guardar la evaluación?"
        aceppLabel="Guardar"
        cancelLabel="Cancelar"
        onSubmitConfirm={onSubmit} // Guardar datos al confirmar
      />
    </>
  )
}
