import { useState } from "react"
import { ColorSchemaFields, ColorSettingField } from "../../models/theme"
import ColorSelector from "./ColorSelect"
import TextField from "../UI/TextField"
import { formatKeyName } from "../../utils"

interface NewColorFormProps {
  addColor: (colorField: ColorSchemaFields) => void
  afterSubmit: () => void
  defaultSchema?: boolean
  mandatoryColors?: boolean
}
interface NewColorFormFields {
  name: string,
  bgColor?: string
  fontColor?: string
}
const NewColorForm = ({ addColor, afterSubmit,defaultSchema, mandatoryColors }: NewColorFormProps) => {

  const [errors, setErrors] = useState<string[]>([])

  const [fields, setFields] = useState<NewColorFormFields>({
    name: defaultSchema? "defaultSchema":"",
    bgColor: "",
    fontColor: ""
  })

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (!fields.name) return setErrors(errors.concat("Invalid color schema name"))
    const { name, bgColor, fontColor } = fields
    const fieldSet: ColorSettingField = {}

    if (bgColor) fieldSet.bgColor = bgColor
    if (fontColor) fieldSet.fontColor = fontColor
    if (mandatoryColors && (!fieldSet.bgColor && !fieldSet.fontColor)) return setErrors(errors.concat("Set at least the background color or the font color"))
    addColor({ [name]: fieldSet })
    afterSubmit()
  }

  const fieldChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setFields({ ...fields, name: formatKeyName(e.target.value) })
  }
  const colorChangeEvent = (field: string, color: string) => {
    setFields({ ...fields, [field]: color })
  }
  return (
    <form className="flex flex-col p-2 gap-y-2 *:outline-none">
      <h2 className="font-bold text-lg">New color schema</h2>
      {
        errors.length>0 &&
        <p className="text-sm text-red-500">{errors.join(", ")}</p>
      }
      <TextField placeholder="Schema name" onChange={fieldChangeEvent} value={fields.name} disabled={defaultSchema} />
      <fieldset className="flex">

        <ColorSelector defaultValue="#fff"
          onChange={(e) => colorChangeEvent("bgColor", e.hex)}
          title="Background color"
        />
        <ColorSelector defaultValue="#fff"
          onChange={(e) => colorChangeEvent("fontColor", e.hex)}
          title="Font color"
        />
      </fieldset>
      <button onClick={handleSubmit} className="bg-sky-500 hover:bg-sky-600 text-white p-2">Agregar</button>
    </form>
  )
}

export default NewColorForm;