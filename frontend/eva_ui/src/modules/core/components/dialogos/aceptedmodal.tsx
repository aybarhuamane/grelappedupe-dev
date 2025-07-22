import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog'

  interface DialogConfirmacionProps {
    isOpenConfirm: boolean
    tittleConfirm?: string
    description?: string
    onSubmitConfirm: () => void
    aceppLabel?: string
  }
  
  export default function AcceptDialog(Props: DialogConfirmacionProps) {
    const {
      isOpenConfirm,
      tittleConfirm = 'Confirmar Evaluación',
      description = 'Está seguro de realizar la evaluación. Concuerda que los datos registrados son coherentes',
      onSubmitConfirm,
      aceppLabel = 'Continuar',
    } = Props
  
    return (
      <AlertDialog open={isOpenConfirm}>
        <AlertDialogContent className='flex flex-col gap-4 justify-center items-center'>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex justify-center items-center text-lg'>{tittleConfirm}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onSubmitConfirm}>
              {aceppLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  