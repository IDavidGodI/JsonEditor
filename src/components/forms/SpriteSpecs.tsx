import { useState } from "react";
import TextField from "../UI/TextField";
import Button from "../UI/Button";

interface SpriteSpecificationsFormProps {
  sendDimension: ((dimension: number) => void) | ((dimension:number, offset: number) => void)
  afterSubmit?: ()=>void
  defaultDimension?: number,
  defaultOffset?: number,
  withOffset?: boolean,

}

interface UnitFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  unit: string
}

const UnitField = ({unit,...props}: UnitFieldProps)=>{
  return <span className="h-10 flex border-2 rounded-md">
    <TextField {...props} type="number" />
    <span className="h-full bg-slate-300 p-2 text-slate-600 flex items-center">
      {unit}
    </span>
  </span>
}
 
const SpriteSpecificationsForm = ({ sendDimension, afterSubmit, defaultDimension, defaultOffset, withOffset }: SpriteSpecificationsFormProps) => {
  const [dimension, setDimension ] = useState(defaultDimension || 0);
  const [offset, setOffset] = useState(defaultOffset || 0);

  const fieldChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target

    let numericValue = Number(value)
    if (numericValue<0) numericValue=0
    
    if (name==="dimensions") 
      return setDimension(numericValue)
    if (name==="offset"){
      return setOffset(numericValue)
    }
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e)=>{
    e.preventDefault()
    
    sendDimension(dimension, offset)
    if (afterSubmit) afterSubmit()
  }
  return ( 
    <form className="flex flex-col gap-y-2" >
      <UnitField name="dimensions" unit="px" className="h-full p-2" value={dimension} onChange={fieldChangeEvent} />
      {
        withOffset &&
        <UnitField name="offset" unit="px" className="h-full p-2" value={offset} onChange={fieldChangeEvent} />
      }
      <Button onClick={handleSubmit} className="rounded-lg" primary>Set</Button>
    </form>
  );
}
 
export default SpriteSpecificationsForm;