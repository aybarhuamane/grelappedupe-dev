/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { detailInstitution, director } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputSelectPerson } from '../../directorManange/AsignDirector/InputSelectPerson'
import { DirectorsList } from './DirectorList'

export const DirectorSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<director.IDirectorList | null>(null); // Almacenar el objeto completo de la persona

  const { control, setValue, formState: { errors } } = useFormContext<detailInstitution.IDetailInstitutionPost>();

  const router = useRouter();

  return (
    <main>
      <div className="grid grid-cols-1 gap-1">
        <Controller
          control={control}
          rules={{
            required: 'Selecciona un director',
          }}
          name="director"
          render={({ field: { value, onChange } }) => (
            <InputSelectPerson
              label="Selecciona un director"
              labelButton="Seleccionar"
              placeholder="Seleccionar un director..."
              onPressButton={() => setOpen(true)}
              value={selectedPerson ? String(selectedPerson.id) : ''}
              description={
                selectedPerson
                  ? `${selectedPerson?.name} ${selectedPerson?.last_name}`
                  : ''
              }
              onChange={onChange}
              errorMensagem={errors.director?.message as string}
            />
          )}
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[420px]" style={{ minWidth: '720px' }}>
          <SheetHeader>
            <SheetTitle>Selecciona un director</SheetTitle>
          </SheetHeader>
          <hr />
          <DirectorsList
            onSelected={(selectedPerson: director.IDirectorList) => {
              setOpen(false);
              setSelectedPerson(selectedPerson);
              setValue('director', selectedPerson.id);
            }}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" onClick={() => {
                setOpen(false);
                setSelectedPerson(null);
                setValue('director', 0);
                router.push('/admin/institution-manage');
              }}>Cancelar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
};
