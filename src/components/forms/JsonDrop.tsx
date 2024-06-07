import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import CloudIcons from '../icons/CloudIcons';
import { cn } from '../../utils';

interface JsonDropProps<T> {
  setFile: React.Dispatch<T>
  placeholder: string
}
 
const JsonDrop = <T,>({ setFile, placeholder }: JsonDropProps<T>) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileContent = reader.result as string;
        const jsonObject = JSON.parse(fileContent);
        console.log(jsonObject as T)

        setFile(jsonObject as T)
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: { "application/json": [".json"] } })

  return ( 
   < div { ...getRootProps()
      } className = "border-dashed border-2 cursor-pointer hover:bg-slate-100 border-slate-200 p-5" >
      <input {...getInputProps()} />
      <div className="flex gap-x-2 text-xl items-center">

        <div className={cn("w-10 h-10",{
          "animate-bounce text-cyan-400": isDragActive})}>
        <CloudIcons upload/>
      </div>
      {
        
        isDragActive ?
        <p>Drop here to load!</p> :
            <p>{placeholder}</p>
      }
      </div>
    </div >
   );
}
 
export default JsonDrop;