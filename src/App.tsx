import { ReactNode, useEffect, useState } from "react"
import JsonEditor, { TabProps } from "./components/JsonEditor"
import WorkSpace from "./components/WorkSpace"
import { OnChange } from "@monaco-editor/react"
import { ThemeFields } from "./models/theme";
import CloudIcons from "./components/icons/CloudIcons";
import XIcon from "./components/icons/XIcon";
import { cn } from "./cn";
import Button from "./components/UI/Button";

function isValidJson(jsonText: string): boolean {
  try {
    JSON.parse(jsonText);
    return true;
  } catch (error) {
    return false;
  }
}

export interface FloatingProps extends React.PropsWithChildren { 
  
  open?: boolean 
}
const FloatingElement = ({ children, open, close }: FloatingProps & { close: () => void })=>{



  return open && (
    
    <div className="backdrop-blur-lg bg-black/50 w-screen h-screen fixed top-0 flex items-center justify-center" >
      <div className="bg-white rounded-lg border-2 p-2" >
        <div className="flex justify-end">

          <div className="flex items-center justify-end cursor-pointer text-red-400 hover:text-red-600" onClick={close}>
            <XIcon className="w-7 h-7"/>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function App() {

  const [loadedFile, setLoadedFile] = useState<ThemeFields | null>(null)
  const [mainFile, setMainFile] = useState<ThemeFields | null>(null)
  const [modified, setModified] = useState("{}")
  const [stableModified, setStableModified] = useState<ThemeFields>({})
  const [selectedTab, setSelectedTab] = useState("setup.json")
  const [showEditor, setShowEditor] = useState(!!localStorage.getItem("showEditor"))

  const [floating, setFloating] = useState<FloatingProps>()
  const setFloat = (children: ReactNode)=>{
    setFloating({open:true, children})
  }
  const onEditorChange: OnChange = (e)=>{
    if (e){
      setModified(e)
      if (isValidJson(e)) setStableModified(JSON.parse(e))
    }
      
  }

  // useEffect(()=>{
  //   if (selectedTab==="setup.json"){
  //     setLoadedFile(stableModified)
  //   }
  // }, [stableModified])
  const closeFloating = () => setFloating({ open: false })

  useEffect(()=>{

  },[loadedFile, mainFile])
  const HandleDownload = ()=>{
    const blob = new Blob([modified], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'setup.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  const tabs: TabProps[] = [
    {
      tabName: "setup.json",
      value: loadedFile ? JSON.stringify(loadedFile) : "{}"
    }
  ]
  if (mainFile) tabs.push({
    tabName: "main.setup.json",
    value: JSON.stringify(mainFile)
  })

  const validJson = isValidJson(modified)
  const file = { ...mainFile, ...stableModified }
  return (
    <main className="w-screen h-screen flex">
      <section className={cn("flex flex-col h-full relative",{
        "w-3/5": showEditor,
        "w-screen": !showEditor
      })}>
        <WorkSpace floating={floating?.children} closeFloating = { closeFloating} setFloating={setFloat} setLoadedFile={setLoadedFile} setMainFile={setMainFile} file = {file} loadedFile={loadedFile}/>
        <div className="h-12 bg-slate-200 flex items-center justify-center shrink-0">

          <Button secondary
            onClick={()=>{
              setShowEditor(!showEditor)
              if (!showEditor) return localStorage.setItem("showEditor", "true")
              localStorage.removeItem("showEditor")
            }}
          > 
            {
              showEditor?
                "Hide source editor"
                :"Show source editor"
              }
          </Button>
        </div>
      </section>
      <section className={cn(" flex flex-col transition-all bg-gray-800",{
        "w-2/5": showEditor,
        "w-0 hidden": !showEditor
      })}>
        <div className="grow overflow-y-hidden">

        <JsonEditor tabs={tabs}
          setTab={setSelectedTab}
          tab={ selectedTab}
         onChange={onEditorChange}
          />
        </div>
        <div className="h-12 bg-slate-200 flex items-center justify-center">
          <Button primary
            onClick={HandleDownload} disabled={!validJson}>
            {
              validJson ?
              <div className="flex gap-x-2 h-full items-center justify-center hover:animate-pulse">
                <div className="h-full w-auto">
                  
                  <CloudIcons download/>
                </div>
                <p className="font-bold">

                  Download
                </p>
              </div>
                 :
                "Invalid json!"
            }
          </Button>
        </div>
      </section>
      <FloatingElement {...floating} close={closeFloating}/>
    </main>
  )
}

export default App
