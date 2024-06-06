import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import {  useEffect, useRef, useState } from "react";
import {editor} from "monaco-editor"
import { cn } from "../cn";

interface JsonEditorProps extends EditorProps {
  tabs: TabProps[]
  tab: string
  setTab: React.Dispatch<string>
}

 
const TabButton = ({className, selected,...props}: React.ButtonHTMLAttributes<HTMLButtonElement>&{selected?:boolean})=>{
  return (
    <button className={cn("p-2 text-white hover:bg-white/10 rounded-t-lg px-6 bg-black/50 border-b-2",{
      "border-amber-200": selected
    },className)} {...props}/>
  )
}
export interface TabProps{
  tabName: string
  value: string
  default?: boolean
}

const JsonEditor = (({tab, tabs, setTab, onChange}: JsonEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [loading, setLoading] = useState(true)
  const handleOnMount: OnMount = (editor ) => {
    editorRef.current = editor;
    setLoading(false)
  };

  const formatJson = () => {
    if (editorRef.current) {
      const unformattedText = editorRef.current.getValue();
      
        const formattedText = JSON.stringify(JSON.parse(unformattedText), null, 2);
        editorRef.current.setValue(formattedText);
      // if (onChange) onChange(value)
    }
  };
  const selectedValue = tabs.find(t => t.tabName===tab)?.value || ""
  useEffect(() => {
    if (editorRef.current) {
        formatJson();

    }
  }, [tab, selectedValue]);

  return ( 
    <aside className="h-full w-full">
      <nav className="flex w-full ">

      {
        !loading &&
        tabs.map(t =>
          <TabButton key={t.tabName} onClick={()=> setTab(t.tabName)} selected={t.tabName===tab}>
            {t.tabName}
          </TabButton>
        )
      }
      </nav>
      <Editor
        defaultLanguage="json"
        theme="vs-dark"
        height="100%"
        defaultValue={"{\n\n}"}
        value={selectedValue}
        onChange={onChange}
        options={{automaticLayout: true}}
        onMount={handleOnMount}
        loading={
          <span className="size-10 bg-white animate-spin"/>
        }
        
      />
    </aside>
   );
})

export default JsonEditor;