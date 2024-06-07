import { useEffect, useRef, useState } from "react";
import { cn, formatKeyName } from "../../utils";

interface KeyRenameProps {
  name: string
  updateName: (n: string, o: string) => void
}
 
const KeyRename = ({name,updateName}: KeyRenameProps) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const [isSelected, setIsSelected] = useState(false)
  const [value, setValue] = useState(name)
  const [isError, setIsError] = useState(false)

  const addEvents = () =>{
    document.addEventListener("mousedown", mouseDownChangeName)
    document.addEventListener("keydown", enterChangeName)
  }
  const removeEvents = () => {
    document.removeEventListener("mousedown", mouseDownChangeName)
    document.removeEventListener("keydown", enterChangeName)
  }

  const changeName = () =>{
    const fieldValue = nameRef.current?.value
    if (fieldValue){
      updateName(formatKeyName(fieldValue), name)
      setIsSelected(false)
      removeEvents()
    }
  }

  const mouseDownChangeName = (e: MouseEvent ) =>{
    if (e.target!==nameRef.current){
      changeName()
    }
  }

  const enterChangeName = (e: KeyboardEvent) =>{
    if (e.code==="Enter") changeName()

  }
  useEffect(()=>{
    if (isSelected){
      addEvents()
      return () => {
        removeEvents()
      }
    }
    else{
      removeEvents()
    }
      
  }, [isSelected])

  return ( 
    <>
      {
        isSelected ?
          <form  className="flex flex-col">
            <input className={cn("outline-none border-2",{
              "border-b-2 border-red-500": isError
            })} 
              onChange={(e)=>{
                if (e.target.value) setIsError(false)
                else setIsError(true)
                setValue(formatKeyName(e.target.value))
              }}
              value={value}
              ref={nameRef}
            />
            {
              isError &&
            <span className="text-sm text-red-600">Invalid name</span>
            }
          </form>
          :
          <h3 className="hover:text-gray-500 hover:underline" onClick={()=>setIsSelected(true)}>{name}</h3>
      }
    </>
   );
}
 
export default KeyRename;