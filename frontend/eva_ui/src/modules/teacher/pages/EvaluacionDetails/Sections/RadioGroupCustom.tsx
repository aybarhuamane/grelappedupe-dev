import React, { useState } from 'react'

// Tipo para las opciones del RadioGroup
interface Option {
  label: string
  value: number
}

// Componente para representar el RadioGroup
interface RadioGroupProps {
  options: Option[]
  onChange: (selected: Option) => void
  selectedValue: number | null
}

export const RadioGroupCustom: React.FC<RadioGroupProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <div
          key={option.value}
          className="flex flex-col items-center"
        >
          <input
            type="radio"
            id={`option-${option.value}`}
            name="custom-radio-group"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option)} // Enviar el objeto completo al cambiar
            className="w-4 h-4"
          />
          <label
            htmlFor={`option-${option.value}`}
            className="text-xs text-gray-500"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  )
}
