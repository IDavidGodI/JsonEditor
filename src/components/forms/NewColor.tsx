import { useState } from "react"
import { colorPaletteField, colorPaletteFields } from "../../models/theme"
import ColorSelector from "./ColorSelect"
import TextField from "../UI/TextField"

interface NewColorFormProps {
  addColor: (colorField: colorPaletteFields) => void
  afterSubmit: () => void
}
interface NewColorFormFields {
  name: string,
  bgColor?: string
  fontColor?: string
}
const NewColorForm = ({ addColor, afterSubmit }: NewColorFormProps) => {

  const [fields, setFields] = useState<NewColorFormFields>({
    name: "",
    bgColor: "",
    fontColor: ""
  })

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if (!fields.name) return
    const { name, bgColor, fontColor } = fields
    const fieldSet: colorPaletteField = {}

    if (bgColor) fieldSet.bgColor = bgColor
    if (fontColor) fieldSet.fontColor = fontColor

    addColor({ [name]: fieldSet })
    afterSubmit()
  }

  const fieldChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, name: e.target.value })
  }
  const colorChangeEvent = (field: string, color: string) => {
    setFields({ ...fields, [field]: color })
  }
  return (
    <form className="flex flex-col p-2 gap-y-2 *:outline-none">
      <h2 className="font-bold text-lg">New color schema</h2>
      <TextField placeholder="Schema name" onChange={fieldChangeEvent} value={fields.name} />
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