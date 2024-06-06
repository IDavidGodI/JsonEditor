import ThemeForm from "./forms/themeForm";
import { ThemeFields } from "../models/theme";

import ColorPaletteSection, { ColorPaletteSectionProps } from "./sections/ColorPaletteSection";
import PiecesSection from "./sections/PiecesSection";
import BoardSection from "./sections/BoardSection";
import { useState } from "react";
import { cn } from "../cn";
import Button from "./UI/Button";
 

export interface WorkSpaceProps<T>{
  setLoadedFile: React.Dispatch<T>
  setMainFile: React.Dispatch<T>
}





const WorkSpace = ({ setLoadedFile, loadedFile, setFloating, setMainFile, file, closeFloating, floating }: WorkSpaceProps<ThemeFields> & ColorPaletteSectionProps & { floating: React.ReactNode }) => {
  const [addFiles, setAddFiles] = useState(false)
  const toggleForm = () => setAddFiles(!addFiles)
  return ( 
    <>
      <nav className="w-full bg-slate-200 h-12 flex items-center p-2 justify-between relative">
        <h1 className="text-2xl">JSON editor</h1>
        <select className="outline-none h-full">
          <option >Theme setup</option>
        </select>
        {!addFiles && <Button className="absolute w-auto h-auto text-sm top-full right-5 z-50 shadow-lg " secondary onClick={toggleForm} >upload files</Button>}
      </nav>

        <section className={cn("border-b-2 overflow-y-hidden shrink-0 transition-all h-auto",{
          "max-h-0": !addFiles
        })}>

        <ThemeForm toggleForm={toggleForm} setMainFile={setMainFile} setLoadedFile={setLoadedFile as React.Dispatch<ThemeFields>}/>
      </section>
      {
        
        <footer className="transition-all duration-700 grow shadow-inner overflow-y-auto relative ">
        <div className="w-full ">
            <header className="sticky top-0 bg-white p-2 border-dotted border-b-2 ">
            <h2 className="text-xl font-bold  p-4">Visual editor</h2>
          </header>
            <PiecesSection floating={floating} file={file} setFloating={setFloating} closeFloating={closeFloating} loadedFile={loadedFile} setLoadedFile={setLoadedFile}/>
            <BoardSection floating={floating} file={file} setFloating={setFloating} closeFloating={closeFloating} loadedFile={loadedFile} setLoadedFile={setLoadedFile} />
            <ColorPaletteSection floating={floating} file={file} loadedFile={loadedFile} setLoadedFile={setLoadedFile} setFloating={setFloating} closeFloating={closeFloating}/>
        </div>
          
          
      </footer>
      }
    </>
   );
}
 
export default WorkSpace;