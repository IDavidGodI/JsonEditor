import { cn } from "../../utils"
import Button from "./Button"

interface ConfirmDialogProps {
  header?: string
  message?: string
  className?: string
  cancelAction: ()=>void
  acceptAction: ()=>void
}
 


const ConfirmDialog = ({acceptAction,cancelAction,header="Are you sure?",message, className}: ConfirmDialogProps) => {
  return ( 
    <menu className={cn("flex flex-col p-2 min-w-96", className)}>
      <h2 className="font-bold text-xl mb-2 p-1">{header}</h2>
      <p className="p-1">{message}</p>
      <fieldset className="w-full flex justify-end gap-x-2 mt-2 border-t-2 p-1">
        <Button onClick={acceptAction} primary>Confirm</Button>
        <Button onClick={cancelAction} secondary>Cancel</Button>
      </fieldset>
    </menu>
  );
}
 
export default ConfirmDialog;