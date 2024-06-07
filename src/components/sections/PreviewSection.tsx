import { useEffect, useRef, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { cn } from "../../utils";
import ExpandButton from "../UI/ExpandButton";

interface PreviewSectionProps extends React.PropsWithChildren{
  defaultOpen?: boolean
  title: string
  addForm?: React.ReactNode
  setFloating?: (element: React.ReactNode) => void
  level?: number
}
 
const PreviewSection = ({level=0,children, defaultOpen, title, setFloating, addForm}: PreviewSectionProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(()=>{
    if (open && sectionRef.current) sectionRef.current.scrollIntoView()
  },[open])

  return ( 
    <section ref={sectionRef} className="border-b-2 w-full">
      <div className={cn("flex justify-between items-center shadow-inner p-2",{
        "border-b-2": open
      })}>
        <h2 className={cn("text-xl font-bold bg-white",{
          "pl-1": level===1,
          "pl-2": level === 2,
          "pl-3": level === 3,
          "pl-4": level === 4,
          "pl-5": level === 5,
          "pl-6": level === 6,
          "pl-7": level === 7,
          "pl-8": level === 8,
          "pl-9": level === 9
        })}>{title}</h2>

        <span className="hover:text-black/50 cursor-pointer" onClick={()=> setOpen(!open)}>
          <ExpandButton className="w-7 h-7" negate={open} />
        </span>
      </div>
    
    {
      open &&
      <div className="pb-5">
        {children}
        {
          !!setFloating && addForm &&
          <div className="w-full flex items-center justify-center p-2">
            <span onClick={() => setFloating(addForm)}>
              <PlusIcon className="w-10 h-10 text-sky-400  hover:text-sky-300 cursor-pointer" />
            </span>
          </div>
        }
      </div>
    }
      
    </section>
  );
}
 
export default PreviewSection;