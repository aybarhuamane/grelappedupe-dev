import React from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

interface IInputSelectProps {
  className?: string
  label?: string
  value?: string
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

export const InputSelect = (props: IInputSelectProps) => {
  const {
    className,
    label,
    inputProps,
    id,
    name,
    placeholder,
    errorMensagem,
    value,
    labelButton,
    required,
    onPressButton,
    onChange,
  } = props
  return (
    <div className="grid grid-cols-1 gap-2">
      {label && <Label>{label || ''}</Label>}
      <section className="flex gap-2 border border-gray-300 rounded-md items-center py-1 px-2">
        <div></div>
        <input
          aria-label={`input${name}-${id}`}
          type="text"
          className="h-8 w-full outline-none focus:outline-none"
          id={id}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
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
