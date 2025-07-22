import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React from 'react'

interface IInputSelectProps {
  className?: string
  label?: string
  value?: string // Este será el id
  description?: string // Este será el texto visible (nombre completo de la persona)
  placeholder?: string
  name?: string
  id?: string
  errorMensagem?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  labelButton?: string
  required?: boolean
  onPressButton?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputSelectPerson = (props: IInputSelectProps) => {
  const {
    className,
    label,
    inputProps,
    id,
    name,
    placeholder,
    errorMensagem,
    value,
    description, // Nueva prop para mostrar la descripción
    labelButton,
    required,
    onPressButton,
    onChange,
  } = props

  return (
    <div className="grid grid-cols-1 gap-2">
      {label && <Label>{label || ''}</Label>}
      <section className="flex gap-2 border border-gray-300 rounded-md items-center py-1 px-2">
        <input
          aria-label={`input${name}-${id}`}
          type="text"
          className="h-8 w-full outline-none focus:outline-none"
          id={id}
          placeholder={placeholder}
          value={description} // Muestra la descripción en lugar del id
          name={name}
          readOnly
          required={required}
          {...inputProps}
        />
        <Button
          className=""
          type="button"
          onClick={onPressButton}
          size="sm"
        >
          {labelButton || 'On Press'}
        </Button>
      </section>
      {errorMensagem && (
        <span className="text-red-500 text-xs">{errorMensagem}</span>
      )}
    </div>
  )
}
