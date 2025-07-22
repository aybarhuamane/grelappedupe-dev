'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NavBar } from '@/types'
import { useRouter, usePathname } from 'next/navigation'

export const RolesSection = (props: NavBar.IRolesSectionProps) => {
  const { options } = props
  const router = useRouter()
  const pathname = usePathname()
  const initialPath = pathname.split('/')[1]
  const role = initialPath.toLocaleUpperCase()

  const value = options.find((option) => option.key === role)

  const handleChange = (value: string) => {
    const url = options.find((option) => option.name === value)?.pathUrl
    router.push(String(url))
  }

  return (
    <Select
      value={value?.name}
      defaultValue={value?.name}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un rol" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.name}
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
