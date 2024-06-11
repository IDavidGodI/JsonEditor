import { ColorResult } from "@uiw/react-color";
import ColorSelector from "../forms/ColorSelect";
import XIcon from "../icons/XIcon";
import { ColorSchemeFields, ColorSettingField } from "../../models/theme";
import KeyRename from "./KeyRename";
import TrashIcon from "../icons/TrashIcon";
import { useEffect, useRef, useState } from "react";

interface ColorSettingProps {
  selected: string
  unsetSelected: ()=>void
  setSelected: (n: string)=>void
  field: ColorSettingField
  colorName: string
  changeColor: (c: ColorSchemeFields)=>void
  changeName: (n:string, o:string)=>void
  canBeDeleted?: boolean
  deleteColor?: (n: string)=>void
  defaultScheme?: ColorSettingField
}
 
const ColorSetting = ({ canBeDeleted, selected, setSelected, unsetSelected, defaultScheme, field, colorName, changeColor,changeName, deleteColor }: ColorSettingProps) => {
  const selectedRef = useRef<HTMLDivElement>(null)
  const isSelected = selected === colorName
  const [usedFromDefault, setUsedFromDefault] = useState<string[]>([])

  useEffect(()=>{
    const used = []
    
    if (defaultScheme?.bgColor && !field.bgColor) used.push("background")
    if (defaultScheme?.fgColor && !field.fgColor) used.push("font")
    setUsedFromDefault(used)
  },[defaultScheme, field])
  

  const toggleSelected = ()=>{
    if (isSelected) {
      return unsetSelected()
    }
    setSelected(colorName)
  } 

  useEffect(() => {
    if (selectedRef?.current && isSelected) {

      selectedRef.current.scrollIntoView(false)
    }
  }, [isSelected])
  return ( 
    <div className="bg-slate-100 p-2 relative" >
      {
        isSelected &&
        <div className="flex justify-end">
          <div className="p-2 text-red-600 hover:text-black " onMouseUp={unsetSelected}>
            <XIcon className="w-8 h-8" />
          </div>
        </div>

      }
      {
        isSelected &&
        <>
          <ColorSelector defaultValue={field.bgColor || "#fff"}
            onChange={(color: ColorResult) => changeColor({
              [colorName]: { ...field, bgColor: color.hex }
            })}
            title="Background"
          />
          <ColorSelector defaultValue={field.fgColor || "#fff"}
            onChange={(color: ColorResult) => changeColor({
              [colorName]: { ...field, fgColor: color.hex }
            })}
            title="Foreground "
          />
        </>
      }
      <div className="flex justify-between items-center p-2">

        <span className="text-lg font-bold flex gap-x-4 items-center grow">

          <KeyRename name={colorName} updateName={changeName} />
          {
            usedFromDefault.length>0 &&

            <p className="text-xs text-slate-500 ">(Using <b>{usedFromDefault.join(" and ")}</b> color{usedFromDefault.length > 1?"s":""} from default scheme)</p>
          }
        </span>
        {
          canBeDeleted && 
          <span className="hover:text-red-500" onClick={() => deleteColor?.(colorName)}>
            <TrashIcon className="w-6 h-6" />
          </span>
        }

      </div>
      <div {...{ ref: isSelected ? selectedRef : null }} onClick={toggleSelected} className="h-16 w-full p-1  cursor-pointer hover:bg-black/20">
        <div className="w-full h-full flex items-center p-1 justify-between" style={{ backgroundColor: field?.bgColor || defaultScheme?.bgColor, color: field?.fgColor || defaultScheme?.fgColor }}>

          {
            (field.bgColor || field.fgColor) || !!defaultScheme?
              <p className="font-bold text-2xl align-baseline">
                Aa
              </p>
              : "Missing colors"
          }
        </div>

      </div>
    </div>
   );
}
 
export default ColorSetting;