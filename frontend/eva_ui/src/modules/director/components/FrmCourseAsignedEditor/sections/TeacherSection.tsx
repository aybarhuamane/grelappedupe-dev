/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { InputSelect } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { courseAssignment, detailInstitution, response, teacher } from '@/types'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TeacherList } from './TeacherList'

interface IProps {
  institutionAssigned: response.IResApi<detailInstitution.IDetailInstitutionList>
}

export const TeacherSection = (props: IProps) => {
  const { institutionAssigned } = props

  const [open, setOpen] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<courseAssignment.ICourseAssignmentList>()

  return (
    <main>
      <div className="grid grid-cols-1 gap-1">
        <Controller
          control={control}
          rules={{
            required: 'Selecciona un profesor',
          }}
          name="teaching"
          render={({ field: { value, onChange } }) => (
            <InputSelect
              label="Selecciona un profesor"
              labelButton="Seleccionar"
              placeholder="Seleccionar un profesor..."
              onPressButton={() => setOpen(true)}
              value={
                value
                  ? `${value.id} - ${value.person.last_name} ${value.person.name} `
                  : ''
              }
              onChange={onChange}
              errorMensagem={errors.teaching?.message as string}
            />
          )}
        />
      </div>

      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent
          className="w-[420px]"
          style={{
            minWidth: '720px',
          }}
        >
          <SheetHeader>
            <SheetTitle>Selecciona un profesor</SheetTitle>
            <SheetDescription>
              {/* Make changes to your profile here. Click save when you're done. */}
            </SheetDescription>
          </SheetHeader>
          <hr />
          <TeacherList
            institutionAssigned={institutionAssigned}
            onSelected={(value: teacher.ITeacherTable) => {
              setOpen(false)
              const data: teacher.ITeacherList = {
                id: value.id,
                person: {
                  id: value.id,
                  name: value.name,
                  last_name: value.last_name,
                  num_document: value.num_document,
                  email: value.email,
                  created_at: '',
                  phone: '',
                  updated_at: '',
                },
                created_at: '',
                is_active: false,
                status: '',
                updated_at: '',
              }
              setValue('teaching', data)
            }}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  )
}
