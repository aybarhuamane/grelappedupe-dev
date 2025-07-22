/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { director, person } from '@/types'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { PersonsList } from './PersonsList'
import { InputSelectPerson } from './InputSelectPerson'
import { useRouter } from 'next/navigation'
import { PersonsListAction } from './PersonsListAction'

export const PersonSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<person.IPersonList | null>(null); // Almacenar el objeto completo de la persona

  const { control, setValue, formState: { errors } } = useFormContext<director.IDirectorPost>();

  const router = useRouter();

  return (
    <main>
      <div className="grid grid-cols-1 gap-1">
        <Controller
          control={control}
          rules={{
            required: 'Selecciona una persona',
          }}
          name="person"
          render={({ field: { value, onChange } }) => (
            <InputSelectPerson
              label="Selecciona una persona"
              labelButton="Seleccionar"
              placeholder="Seleccionar una persona..."
              onPressButton={() => setOpen(true)}
              value={selectedPerson ? String(selectedPerson.id) : ''}  // Mostrar el ID en el campo oculto
              description={
                selectedPerson
                  ? `${selectedPerson.last_name} ${selectedPerson.name} - ${selectedPerson.num_document}` // Mostrar la descripción de la persona
                  : ''
              }
              onChange={onChange}
              errorMensagem={errors.person?.message as string}
            />
          )}
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[420px]" style={{ minWidth: '720px' }}>
          <SheetHeader>
            <SheetTitle>Selecciona una persona</SheetTitle>
          </SheetHeader>
          <hr />
          <PersonsListAction
            onSelected={(selectedPerson: person.IPersonList) => {
              setOpen(false);
              setSelectedPerson(selectedPerson);  // Almacenar el objeto completo para la descripción
              setValue('person', selectedPerson.id);  // Almacenar el objeto completo en el formulario
            }}
          />
          {/* <PersonsList
            onSelected={(selectedPerson: person.IPersonList) => {
              setOpen(false);
              setSelectedPerson(selectedPerson);  // Almacenar el objeto completo para la descripción
              setValue('person', selectedPerson.id);  // Almacenar el objeto completo en el formulario
            }}
          /> */}
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" onClick={() => {
                setOpen(false);
                setSelectedPerson(null);
                setValue('person', 0);
                router.push('/admin/director-manage/create');
              }}>Cancelar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
};
