import { useState } from "react"
import { ColorSchemeFields, ColorSettingField } from "../../models/theme"
import ColorSelector from "./ColorSelect"
import TextField from "../UI/TextField"
import { formatKeyName } from "../../utils"

interface NewColorFormProps {
  addColor: (colorField: ColorSchemeFields) => void
  afterSubmit: () => void
  defaultScheme?: boolean
  mandatoryColors?: boolean
}
interface NewColorFormFields {
  name: string,
  bgColor?: string
  fgColor?: string
}
const NewColorForm = ({ addColor, afterSubmit,defaultScheme, mandatoryColors }: NewColorFormProps) => {

  const [errors, setErrors] = useState<string[]>([])

  const [fields, setFields] = useState<NewColorFormFields>({
    name: defaultScheme? "defaultScheme":"",
    bgColor: "",
    fgColor: ""
  })

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const errors: string[] = []
    if (!fields.name) errors.push("Invalid color scheme name")
    const { name, bgColor, fgColor } = fields
    const fieldSet: ColorSettingField = {}

    if (bgColor) fieldSet.bgColor = bgColor
    if (fgColor) fieldSet.fgColor = fgColor
    if (mandatoryColors && (!fieldSet.bgColor && !fieldSet.fgColor)) errors.push("Please set at least the background color or the font color")
    console.log(errors)
    if (!errors.length){
      addColor({ [name]: fieldSet })
      afterSubmit()
    }
    setErrors(errors)
  }

  const fieldChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setFields({ ...fields, name: formatKeyName(e.target.value) })
  }
  const colorChangeEvent = (field: string, color: string) => {
    setFields({ ...fields, [field]: color })
  }
  return (
    <form className="flex flex-col p-2 gap-y-2 *:outline-none">
      <h2 className="font-bold text-lg">New color scheme</h2>
      {
        errors.length>0 &&
        <ul className="text-sm text-red-500 list-inside">
            {errors.map((e, i) => <li key={i} >{e}</li>)}
        </ul>
      }
      <TextField placeholder="Scheme name" onChange={fieldChangeEvent} value={fields.name} disabled={defaultScheme} />
      <fieldset className="flex">

        <ColorSelector defaultValue="#fff"
          onChange={(e) => colorChangeEvent("bgColor", e.hex)}
          title="Background color"
        />
        <ColorSelector defaultValue="#fff"
          onChange={(e) => colorChangeEvent("fgColor", e.hex)}
          title="Foreground color"
        />
      </fieldset>
      <button onClick={handleSubmit} className="bg-sky-500 hover:bg-sky-600 text-white p-2">Agregar</button>
    </form>
  )
}

export default NewColorForm;