import { useRef, useState } from "react"

import { ThemeFields, ColorSchemaFields, ColorSettingField } from "../../models/theme"

import NewColorForm from "../forms/NewColor"
import PreviewSection from "./PreviewSection"

import ConfirmDialog from "../UI/ConfirmDialog"
import ColorSetting from "./ColorSetting"

export interface ColorSettingSectionProps {
  setLoadedFile: React.Dispatch<ThemeFields>
  loadedFile: ThemeFields | null
  file: ThemeFields
  setFloating: (element: React.ReactNode) => void
  closeFloating: () => void
  floating: React.ReactNode
}
 
const ColorSettingSection = ({file, loadedFile, setLoadedFile, setFloating, closeFloating}: ColorSettingSectionProps) => {
  const [selectedSchema, setSelectedSchema] = useState("")
  const sectionRef = useRef<HTMLDivElement>(null)
  

  const deleteAction = (name: string) => {
    if (loadedFile) {
      delete loadedFile.colorSettings?.schemas?.[name]
      setLoadedFile(loadedFile)
    }
  }
  const defaultColorChanged = (colorSchema: ColorSchemaFields)=>{
    if (!loadedFile)
      return setLoadedFile({
        colorSettings: {
          ...colorSchema
        }
      })

    setLoadedFile({
      ...loadedFile, colorSettings: {
        ...loadedFile.colorSettings,
        ...colorSchema
      }
    })
  }
  const schemaColorChanged = (colorSchema: ColorSchemaFields) => {
    if (!loadedFile)
      return setLoadedFile({
        colorSettings: {
          schemas: {...colorSchema}
        }
      })

    setLoadedFile({
      ...loadedFile, colorSettings: {
        ...loadedFile.colorSettings,
        schemas:{
          ...loadedFile.colorSettings?.schemas,
          ...colorSchema
        }
      }
    })
  }
  const handleDelete = (name: string)=>{
    setFloating(
      <ConfirmDialog acceptAction={()=>{
        deleteAction(name)
        closeFloating()
      }} cancelAction={closeFloating} message={`Do you want to delete the color set "${name}"`}/>
    )
  }
  const nameChanged = (name: string, old: string) => {
    if (loadedFile && name !== old) {
      const oldValue = loadedFile.colorSettings?.schemas?.[old]
      if (oldValue) {
        const newValue = {
          ...loadedFile,
          colorSettings: {
            ...loadedFile.colorSettings,
            [name]: oldValue
          }
        }
        delete newValue.colorSettings?.schemas?.[old]

        setLoadedFile(newValue)
      }

    }
  }

  

  let defaultColorSchema: ColorSettingField | undefined, colorSchemas
  if(file.colorSettings?.schemas) colorSchemas = Object.entries(file.colorSettings.schemas)
  if (file.colorSettings?.defaultSchema) defaultColorSchema = file.colorSettings.defaultSchema
  return ( 
    <PreviewSection title="Color settings" >
        <section ref={sectionRef}>
            <div className="border-b-2">

            {
              defaultColorSchema?
              <ColorSetting
                field={defaultColorSchema}
                colorName={"defaultSchema"}
                selected={selectedSchema}
                unsetSelected={() => setSelectedSchema("")}
                setSelected={setSelectedSchema}
                changeColor={defaultColorChanged}
                changeName={nameChanged}
                deleteColor={handleDelete}
                />
              :
              <div className="flex justify-center">
                <span className="font-bold text-slate-400 p-2 hover:underline cursor-pointer" onClick={() => setFloating(
                  <NewColorForm addColor={defaultColorChanged} afterSubmit={closeFloating} defaultSchema mandatoryColors/>
                )}>Add default color schema</span>
              </div>
            }
          </div>
        <PreviewSection title="Schemas" level={4} setFloating={setFloating} addForm={
          <NewColorForm addColor={schemaColorChanged} afterSubmit={closeFloating} />
        }>

          
          {
            colorSchemas &&
            !!colorSchemas.length &&
            colorSchemas.map(([colorName, field]) => {
              return (
                <ColorSetting
                  key={colorName} 
                  field={field} 
                  colorName={colorName} 
                  selected={selectedSchema}
                  canBeDeleted
                  defaultSchema={defaultColorSchema}
                  unsetSelected={()=>setSelectedSchema("")}
                  setSelected={setSelectedSchema}
                  changeColor={schemaColorChanged}
                  changeName={nameChanged}
                  deleteColor={handleDelete}
                />
              )
            })
            
            }
          </PreviewSection >

        </section> 
      {
        (!colorSchemas || !colorSchemas.length) &&
        <p className="font-bold text-slate-400 text-center p-2">There're no colors set</p>
      }
      
    </PreviewSection>
   );
}
 
export default ColorSettingSection;