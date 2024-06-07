import { useState } from "react"
import { ActionField, ActionFields } from "../../models/theme"
import TextField from "../UI/TextField"
import { cn, formatKeyName } from "../../utils"

interface NewActionFormProps {
  addAction: (fields: ActionFields) => void
  afterSubmit: () => void
  defaultValues?: NewActionFormFields
}
interface NewActionFormFields {
  name: string,
  frames: number
  fps?: number
}

const initialValues = {
  name: "",
  frames: 1,
  fps: 0
}

const NewActionForm = ({ addAction, afterSubmit, defaultValues}: NewActionFormProps) => {

  const [fields, setFields] = useState<NewActionFormFields>({...initialValues, ...defaultValues})

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (!fields.name) return
    const { name, frames, fps } = fields
    const fieldSet: ActionField = {frames: Number(frames)}

    if (Number(fps)) fieldSet.fps = Number(fps)

    addAction({ [name]: fieldSet })
    afterSubmit()
  }

  const fieldChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value} = e.target;
    const { name } = e.target;
    if (name==="name") value = formatKeyName(value)
    if (name==="frames" || name==="fps"){
      const numericValue = Number(value)
      
      if (numericValue<=0) value="1"
      if (name==="frames"){
        if (numericValue === 1) fields.fps = 0
        if (Number(fields.frames)===1 && numericValue > 1) fields.fps = 1
      }
    }
    setFields({ ...fields, [name]: value })

  }
  
  const setFPS = fields.frames > 1
  return (
    <form className="flex flex-col p-2 gap-y-2">
      <h2 className="font-bold text-lg">{
        !defaultValues ?"New action":"Update action"
      }</h2>
      <TextField name="name" placeholder="Name" onChange={fieldChangeEvent} value={fields.name} disabled={!!defaultValues}/>
      <fieldset className="flex flex-col gap-y-3 w-72 *:w-full">
        <div className="flex flex-col">
          <label className="text-sm">Frames</label>
          <TextField name="frames" type="number" placeholder="Frames" onChange={fieldChangeEvent} value={fields.frames} />
        </div>

        <div className="flex flex-col">
          <label className={cn("text-sm transition-all opacity-0",{
            "opacity-100": setFPS
          })}>
            FPS
          </label>
          <TextField type="number" name="fps" placeholder="FPS" onChange={fieldChangeEvent} value={setFPS?fields.fps:""} disabled={!setFPS}/>
        </div>
      </fieldset>
      <button onClick={handleSubmit} className="bg-sky-500 hover:bg-sky-600 text-white p-2">
        {!defaultValues ?"Add":"Update"}
      </button>
    </form>
  )
}

export default NewActionForm;