import { FrmModalidadEditor } from '@/modules/director'
import { modalitiesFunctionsApi } from '@/api'
import { modality } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
  const { id } = params

  let defaultData: modality.IModality | undefined = undefined

  try {
    const res = await modalitiesFunctionsApi.fetchModality(Number(id))
    if (res.ok) {
      const data = await res.json()
      defaultData = data
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <main>
      {defaultData && <FrmModalidadEditor defaultData={defaultData} />}
    </main>
  )
}
