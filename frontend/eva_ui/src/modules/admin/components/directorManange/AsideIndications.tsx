'use client'
import { AlertCustom } from '@/modules/core'

interface AsideIndicationsProps {
  indications?: string[]
}

export const AsideIndications = (props: AsideIndicationsProps) => {
  const { indications = [] } = props

  return (
    <section className="pt-3">
          <AlertCustom
            title="Indicaciones"
            hasIcon={false}
            content={
              <main>
                <ul className="list-disc list-inside space-y-2">
                  {indications.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </main>
            }
          />
        </section>
  )
}