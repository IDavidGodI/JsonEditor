import { ThemeFields } from "../../models/theme";
import Button from "../UI/Button";
import { WorkSpaceProps } from "../WorkSpace";
import JsonDrop from "./JsonDrop";


interface FormProps extends WorkSpaceProps<ThemeFields>{
  toggleForm: ()=>void
}

const ThemeForm = ({ setLoadedFile, setMainFile, toggleForm }: FormProps) => {
  
  return ( 
    <form className="p-4 h-full *:my-2 relative">
      <div className="flex justify-end w-full">
        <Button type="button" className="absolute w-auto h-auto text-sm top-0 z-50 shadow-lg bg-gray-500 hover:bg-gray-600" onClick={toggleForm} >close form</Button>
      </div>
      <div className="flex gap-x-12 p-2 pt-3">
        <div className="w-1/2">

          <JsonDrop<ThemeFields> setFile={setMainFile} placeholder="Upload base setup file"/>
        </div>
        <div className="w-1/2">
          <JsonDrop<ThemeFields> setFile={setLoadedFile} placeholder="Upload theme setup file" />
        </div>
      </div>
    </form>
  );
}
 
export default ThemeForm;