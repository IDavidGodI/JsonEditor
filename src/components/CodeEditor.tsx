import { Editor, EditorProps, OnMount } from "@monaco-editor/react";
import {  useEffect, useRef, useState } from "react";
import {editor} from "monaco-editor"
import { cn } from "../utils";
import Button from "./UI/Button";
import CloudIcons from "./icons/CloudIcons";

interface CodeEditorProps extends EditorProps {
  tabs: TabProps[]
  tab: string
  setTab: React.Dispatch<string>
  saveAction: ()=>void
}

 
const TabButton = ({className, selected,...props}: React.ButtonHTMLAttributes<HTMLButtonElement>&{selected?:boolean})=>{
  return (
    <button className={cn("p-2 text-white hover:bg-white/10 gap-x-3 rounded-t-lg px-6 bg-black/50 border-b-2",{
      "border-amber-200": selected
    },className)} {...props}/>
  )
}
export interface TabProps{
  tabName: string
  value: string
  language: string
  default?: boolean
  readonly?: boolean
  madeChanges?: boolean
}

const CodeEditor = (({tab, tabs, saveAction, setTab, onChange}: CodeEditorProps) => {
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
  const selectedTab = tabs.find(t => t.tabName===tab)
  useEffect(() => {
    console.log("TAB",selectedTab)
    if (editorRef.current) {
        formatJson();
    }
  }, [tab, selectedTab?.value]);

  return ( 
    <aside className="h-full w-full">
      
      <nav className="flex w-full relative">
        {
          !loading &&
          tabs.map(t =>
            <TabButton key={t.tabName} onClick={()=> setTab(t.tabName)} selected={t.tabName===tab}>
              {t.tabName}
            </TabButton>
          )
        }

        <fieldset className={cn(
          "absolute flex top-full gap-x-2 *:bg-slate-600 text-white right-1/4 z-50 transition-all opacity-100 duration-75",
          "*:flex *:justify-center *:flex-col *:items-center text-xs *:grow",
          {"-top-full opacity-0": !selectedTab?.readonly && !selectedTab?.madeChanges}
        )}>
          <Button onClick={saveAction} title="Save" className="hover:bg-white/50">
            <div className="w-4 h-4">
              <CloudIcons/>
            </div>
            <p>Save</p>
          </Button>
        </fieldset>
      </nav>
      <Editor
        defaultLanguage="json"
        language={selectedTab?.language}
        theme="vs-dark"
        height="100%"
        defaultValue={"{\n\n}"}
        value={selectedTab?.value}
        onChange={onChange}
        options={{automaticLayout: true, readOnly: selectedTab?.readonly}}
        onMount={handleOnMount}
        loading={
          <span className="size-10 bg-white animate-spin"/>
        }
      />
    </aside>
   );
})

export default CodeEditor;