'use client'
import { HeaderSection, LayoutAsideSection } from '@/modules/core'
import { AsideSection } from './AsideSection'
import { usePathname } from 'next/navigation'

const pages = {
  modality: {
    title: 'Modalidad',
    subtitle: 'Gestione las modalidades de la I.E para la evaluación',
  },
  level: {
    title: 'Nivel',
    subtitle: 'Gestione los niveles de la I.E para la evaluación',
  },
  category: {
    title: 'Categoria',
    subtitle: 'Gestione las categorias de la I.E para la evaluación',
  },
}

interface LayoutIProps {
  children: React.ReactNode
}

export const AulasSection = (props: LayoutIProps) => {
  const { children } = props
  const pathname = usePathname()
  const lastPathname = pathname.split('/').pop()

  const pageSelected = pages[lastPathname as keyof typeof pages]

  return (
    <main className="flex flex-col gap-2">
      <HeaderSection
        title={pageSelected?.title || 'Gestionar aulas'}
        subtitle={
          pageSelected?.subtitle ||
          'Añada las aulas que están disponibles para realizar las evaluaciones'
        }
        hrefAddButton={`${pathname}/create`}
        labelAddButton={`Crear ${pageSelected?.title.toLowerCase()}`}
      />
      <LayoutAsideSection aside={<AsideSection />}>
        {children}
      </LayoutAsideSection>
    </main>
  )
}
