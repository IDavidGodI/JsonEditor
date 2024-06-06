import { useEffect, useRef, useState } from "react";
import { SpriteFields } from "../../models/theme";
import EditIcon from "../icons/EditIcon";
import EyeIcon from "../icons/EyeIcon";
import { cn } from "../../cn";

interface SpriteSpecificationsProps {
  spriteName: string
  spriteSpecs: SpriteFields
  handleDimensionForm: (d?: number, o?:number) => void
  showOffset?: boolean
}
 
const spriteSpecsDefault = { dimensions: 0, offset: 0 }
const SpriteSpecifications = ({spriteName: name,spriteSpecs, handleDimensionForm, showOffset}: SpriteSpecificationsProps) => {
  const finalSpriteSpecs = {...spriteSpecsDefault, ...spriteSpecs}
  const [realDimensions, setRealDimensions] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const settingsRef = useRef<HTMLSpanElement>(null)

  let dimensionsStyle, offsetStyle
  if (finalSpriteSpecs){
    const { dimensions, offset } = finalSpriteSpecs
    const factor = realDimensions? 1 : .5
  
    if (showPreview){
      if (offset) offsetStyle = { padding: offset * factor }
    
      if (dimensions) dimensionsStyle = { width: dimensions * factor, height: dimensions * factor }
    }
  }

  useEffect(()=>{
    if (settingsRef.current) settingsRef.current.scrollIntoView(false)
  },[showPreview, realDimensions])
  return ( 
    <div className="flex flex-col grow gap-y-2 border-2 p-2 items-center justify-center rounded-lg">

      <div
        style={offsetStyle}
        className="bg-orange-200 justify-center items-center"
      >
        <div
          style={dimensionsStyle}
          className="bg-slate-300 flex justify-center items-center"
        />
      </div>
      <span  className="flex gap-x-4 items-center">
        <table className="*:inline-block *:text-left *:px-1">
          <thead className="font-bold">
            <tr>
              <th>{name} dimensions:</th>
            </tr>
            {showOffset && <tr>
              <th>{name} offset:</th>
            </tr>}
          </thead>
          <tbody>
            <tr>
              <td>{finalSpriteSpecs.dimensions}px</td>
              <td>
                <div className="size-4 mx-2 bg-slate-300" />
              </td>
            </tr>
            {showOffset && <tr>
              <td>{finalSpriteSpecs.offset}px</td>
              <td>
                <div className="size-4 mx-2 bg-orange-200" />
              </td>
            </tr>}
          </tbody>
        </table>
        <span className="text-slate-500 hover:text-sky-300 cursor-pointer" onClick={() => handleDimensionForm(finalSpriteSpecs.dimensions, finalSpriteSpecs.offset)}>
          <EditIcon className="w-5 h-5" />
        </span>
      </span>
      <span className={cn("flex gap-x-2 items-center",{"line-through": !showPreview})}>
        <input disabled={!showPreview} type="checkbox" checked={realDimensions} onChange={() => setRealDimensions(!realDimensions)} />
        <label >Real dimensions</label>
      </span>
      <span className=" flex gap-x-2 items-center">
        <span className="cursor-pointer" onClick={() => setShowPreview(!showPreview)}>
          <EyeIcon className="w-5 h-5" negate={showPreview}/>
        </span>
        <label>{
          showPreview ? "Hide preview" : "Show preview"
        }</label>
      </span>
      <span ref={settingsRef} />
    </div>
   );
}
 
export default SpriteSpecifications;