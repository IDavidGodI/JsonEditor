import { useRef, useState } from "react"

import { ThemeFields, ColorSchemeFields, ColorSettingField } from "../../models/theme"

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
  const [selectedScheme, setSelectedScheme] = useState("")
  const sectionRef = useRef<HTMLDivElement>(null)
  

  const deleteAction = (name: string) => {
    if (loadedFile) {
      delete loadedFile.colorSettings?.schemes?.[name]
      setLoadedFile(loadedFile)
    }
  }
  const defaultColorChanged = (colorScheme: ColorSchemeFields)=>{
    if (!loadedFile)
      return setLoadedFile({
        colorSettings: {
          ...colorScheme
        }
      })

    setLoadedFile({
      ...loadedFile, colorSettings: {
        ...loadedFile.colorSettings,
        ...colorScheme
      }
    })
  }
  const schemeColorChanged = (colorScheme: ColorSchemeFields) => {
    if (!loadedFile)
      return setLoadedFile({
        colorSettings: {
          schemes: {...colorScheme}
        }
      })

    setLoadedFile({
      ...loadedFile, colorSettings: {
        ...loadedFile.colorSettings,
        schemes:{
          ...loadedFile.colorSettings?.schemes,
          ...colorScheme
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
      const oldValue = loadedFile.colorSettings?.schemes?.[old]
      if (oldValue) {
        const newValue = {
          ...loadedFile,
          colorSettings: {
            ...loadedFile.colorSettings,
            [name]: oldValue
          }
        }
        delete newValue.colorSettings?.schemes?.[old]

        setLoadedFile(newValue)
      }

    }
  }

  

  let defaultColorScheme: ColorSettingField | undefined, colorSchemes
  if(file.colorSettings?.schemes) colorSchemes = Object.entries(file.colorSettings.schemes)
  if (file.colorSettings?.defaultScheme) defaultColorScheme = file.colorSettings.defaultScheme
  return ( 
    <PreviewSection title="Color settings" >
        <section ref={sectionRef}>
            <div className="border-b-2">

            {
              defaultColorScheme?
              <ColorSetting
                field={defaultColorScheme}
                colorName={"defaultScheme"}
                selected={selectedScheme}
                unsetSelected={() => setSelectedScheme("")}
                setSelected={setSelectedScheme}
                changeColor={defaultColorChanged}
                changeName={nameChanged}
                deleteColor={handleDelete}
                />
              :
              <div className="flex justify-center">
                <span className="font-bold text-slate-400 p-2 hover:underline cursor-pointer" onClick={() => setFloating(
                  <NewColorForm addColor={defaultColorChanged} afterSubmit={closeFloating} defaultScheme mandatoryColors/>
                )}>Add default color scheme</span>
              </div>
            }
          </div>
        <PreviewSection title="Schemes" level={4} setFloating={setFloating} addForm={
          <NewColorForm addColor={schemeColorChanged} afterSubmit={closeFloating} mandatoryColors/>
        }>

          
          {
            colorSchemes &&
            !!colorSchemes.length &&
            colorSchemes.map(([colorName, field]) => {
              return (
                <ColorSetting
                  key={colorName} 
                  field={field} 
                  colorName={colorName} 
                  selected={selectedScheme}
                  canBeDeleted
                  defaultScheme={defaultColorScheme}
                  unsetSelected={()=>setSelectedScheme("")}
                  setSelected={setSelectedScheme}
                  changeColor={schemeColorChanged}
                  changeName={nameChanged}
                  deleteColor={handleDelete}
                />
              )
            })
            
            }
          {
            (!colorSchemes || !colorSchemes.length) &&
            <p className="font-bold text-slate-400 text-center p-2">There're no schemes set</p>
          }
          </PreviewSection >

        </section> 
      
      
    </PreviewSection>
   );
}
 
export default ColorSettingSection;