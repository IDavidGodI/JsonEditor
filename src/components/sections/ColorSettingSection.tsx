import { useEffect, useRef, useState } from "react"
import XIcon from "../icons/XIcon"
import ColorSelector from "../forms/ColorSelect"
import { ColorResult } from "@uiw/react-color"
import { ThemeFields, ColorSettingFields } from "../../models/theme"
import TrashIcon from "../icons/TrashIcon"
import NewColorForm from "../forms/NewColor"
import PreviewSection from "./PreviewSection"
import KeyRename from "./KeyRename"
import ConfirmDialog from "../UI/ConfirmDialog"

export interface ColorSettingSectionProps {
  setLoadedFile: React.Dispatch<ThemeFields>
  loadedFile: ThemeFields | null
  file: ThemeFields
  setFloating: (element: React.ReactNode) => void
  closeFloating: () => void
  floating: React.ReactNode
}
 
const ColorSettingSection = ({file, loadedFile, setLoadedFile, setFloating, closeFloating}: ColorSettingSectionProps) => {
  const [paletteSelected, setSettingSelected] = useState("")
  const selectedRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if (selectedRef?.current){
      
      selectedRef.current.scrollIntoView(false)
    }
  },[paletteSelected])

  const deleteAction = (name: string) => {
    if (loadedFile) {
      delete loadedFile.colorSettings?.[name]
      setLoadedFile(loadedFile)
    }
  }
  const colorChanged = (colorField: ColorSettingFields) => {
    if (!loadedFile)
      return setLoadedFile({ colorSettings: colorField })

    setLoadedFile({
      ...loadedFile, colorSettings: {
        ...loadedFile.colorSettings,
        ...colorField
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
      const oldValue = loadedFile.colorSettings?.[old]
      if (oldValue) {
        const newValue = {
          ...loadedFile,
          colorSettings: {
            ...loadedFile.colorSettings,
            [name]: oldValue
          }
        }
        delete newValue.colorSettings?.[old]

        setLoadedFile(newValue)
      }

    }
  }

  let colorSettingsEntries
  if(file.colorSettings) colorSettingsEntries = Object.entries(file.colorSettings)
  return ( 
    <PreviewSection title="Color settings" setFloating={setFloating} addForm={
      <NewColorForm addColor={colorChanged} afterSubmit={closeFloating} />
    }>
      
      {
        colorSettingsEntries &&
        <section ref={sectionRef}>
          {
            !!colorSettingsEntries.length &&
            colorSettingsEntries.map(([colorName, field]) => {
              
              const isSelected = paletteSelected === colorName
              return (
                <div key={colorName} className="bg-slate-100 p-2 relative" >
                  {
                    isSelected &&
                    <div className="flex justify-end">
                      <div className="p-2 text-red-600 hover:text-black " onMouseUp={() => {
                        setSettingSelected("")
                      }}>
                        <XIcon className="w-12 h-12" />
                      </div>
                    </div>

                  }
                  {
                    isSelected &&
                    <>
                      <ColorSelector defaultValue={field.bgColor || "#fff"}
                        onChange={(color: ColorResult) => colorChanged({
                          [colorName]: { ...field, bgColor: color.hex }
                        })}
                        title="Background"
                      />
                      <ColorSelector defaultValue={field.fontColor || "#fff"} 
                        onChange={(color: ColorResult) => colorChanged({
                          [colorName]: { ...field, fontColor: color.hex }
                        })}
                        title="Font"
                      />
                    </>
                  }
                  <div className="flex justify-between items-center p-2">

                    <span className="text-lg font-bold">

                      <KeyRename name={colorName} updateName={nameChanged}/>
                    </span>

                    <span className="hover:text-red-500" onClick={()=>handleDelete(colorName)}>
                      <TrashIcon className="w-6 h-6" />
                    </span>

                  </div>
                  <div {...{ref: isSelected? selectedRef : null}} onClick={() => setSettingSelected((current)=>{
                    if (current===colorName) return ""
                    return colorName
                  })} className="h-16 w-full p-1  cursor-pointer hover:bg-black/20">
                    <div className="w-full h-full flex items-center p-1 justify-between" style={{ backgroundColor: field?.bgColor, color: field?.fontColor }}>

                    {
                      (field.bgColor || field.fontColor) ?
                      <p className="font-bold text-2xl align-baseline">
                          Aa
                        </p>
                        : "Missing colors"
                        }
                    </div>

                  </div>
                </div>

              )
            })
            
          }

        </section> 
        
      }
      {
        (!colorSettingsEntries || !colorSettingsEntries.length) &&
        <p className="font-bold text-slate-400 text-center p-2">There're no colors set</p>
      }
      
    </PreviewSection>
   );
}
 
export default ColorSettingSection;