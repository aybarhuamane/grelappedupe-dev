interface ToasErrorCustomProps {
  title?: string
  message?: string
}

export const ToastCustom = (props: ToasErrorCustomProps) => {
  const { title = 'Error', message = 'Error en la autenticación' } = props
  return (
    <main className="flex flex-col">
      <h3 className="font-bold">{title}</h3>
      <h4 className="text-sm">{message}</h4>
    </main>
  )
}
