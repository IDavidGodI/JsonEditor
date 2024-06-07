import { ActionField, ActionFields, PiecesFields, ThemeFields } from "../../models/theme";
import SpriteSpecificationsForm from "../forms/SpriteSpecs";
import NewActionForm from "../forms/NewAction";
import EditIcon from "../icons/EditIcon";
import PreviewSection from "./PreviewSection";
import SpriteSpecifications from "./SpriteSpecs";
import KeyRename from "./KeyRename";
import TrashIcon from "../icons/TrashIcon";
import { useRef } from "react";
import ConfirmDialog from "../UI/ConfirmDialog";

interface PiecesSectionProps {
  file: ThemeFields
  setLoadedFile: React.Dispatch<ThemeFields>
  loadedFile: ThemeFields | null
  setFloating: (element: React.ReactNode) => void
  closeFloating: () => void
  floating: React.ReactNode
}
 
interface ActionCardProps{
  values: ActionField
  name: string
  addAction: (a: ActionFields) => void
  deleteAction: (a: string) => void
  setFloating: (element: React.ReactNode) => void
  closeFloating: () => void
  nameChanged: (n: string, o: string) => void
}

const ActionCard = ({nameChanged ,closeFloating, name, addAction, setFloating, values, deleteAction}: ActionCardProps) => {
  return (
  <div className="text-center border-2 rounded-md p-2 min-w-40">
    <header className="flex justify-end items-center">
      <span className="text-slate-500 hover:text-red-300 cursor-pointer" onClick={() => setFloating(
        <ConfirmDialog 
          acceptAction={()=>{
            deleteAction(name)
            closeFloating()
          }}
          cancelAction={closeFloating}
          message={`Do you want to delete the action "${name}"?`}
        />
      )}> 
        <TrashIcon className="w-5 h-5" />
      </span>
      <span className="text-slate-500 hover:text-sky-300 cursor-pointer" onClick={() => setFloating(
        <NewActionForm afterSubmit={closeFloating} addAction={addAction} defaultValues={{ name, ...values }} />
      )}>

        <EditIcon className="w-5 h-5" />
      </span>
    </header>
    <div className="p-2">
      <span className="border-b-2 block">
        <KeyRename name={name} updateName={nameChanged}/>
      </span>
      <div className="text-sm">
        <h5 className="font-bold ">Files names</h5>
        <p>light_{name}.png</p>
        <p>dark_{name}.png</p>
      </div>
    </div>
    <span className="border-t-2 flex *:grow gap-x-2">
      <p><b>Frames:</b> {values.frames}</p>
      {
        !!values.fps &&
        <p><b>FPS:</b> {values.fps}</p>
      }
    </span>
  </div>)
}

const PiecesSection = ({file,setFloating, closeFloating, loadedFile, setLoadedFile}: PiecesSectionProps) => {
  
  const cardsRef = useRef<HTMLDivElement>(null)
  let pieces: PiecesFields | undefined, actions
  if (file && file.pieces){
    pieces = file.pieces
    if (file.pieces.actions) actions = Object.entries(file.pieces.actions)
  }

  const deleteAction = (name: string)=>{
    
    if (loadedFile){
      delete loadedFile.pieces?.actions?.[name]
      setLoadedFile(loadedFile)
    }
  }
  const addAction = (actions: ActionFields)=>{
    if (!loadedFile)
      return setLoadedFile({
        pieces:{
          actions
        }
      })

    setLoadedFile({...loadedFile, pieces:{
      ...loadedFile.pieces,
      actions:{
        ...loadedFile.pieces?.actions,
        ...actions
      }
    }})
  }

  const nameChanged = (name: string, old: string) => {
    if (loadedFile && name !== old) {
      const oldValue = loadedFile.pieces?.actions?.[old]
      if (oldValue) {
        const newValue = {
          ...loadedFile,
          pieces: {
            ...loadedFile.pieces,
            actions: {
              ...loadedFile.pieces?.actions,
              [name]: oldValue
            }
          }
        }
        delete newValue.pieces?.actions?.[old]

        setLoadedFile(newValue)
      }

    }
  }

  const setDimension = (dimensions: number)=>{
    if (!loadedFile)
      return setLoadedFile({
        pieces: {
          spriteSpecs:{
            dimensions
          }
        }
      })
      console.log("Setting existing")
    setLoadedFile({
      ...loadedFile, pieces: {
        ...loadedFile.pieces,
        spriteSpecs:{
          dimensions
        }
      }
    })
  }

  const handleDimensionForm = (dimensions?: number) => setFloating(
    <SpriteSpecificationsForm  sendDimension={setDimension} afterSubmit={closeFloating} defaultDimension={dimensions}/>
  )

  return ( 
    <PreviewSection title="Pieces">
        <section className="flex flex-col justify-center w-full">
          {
            (pieces?.spriteSpecs) ?
            <div className="flex flex-col gap-y-2 border-2 border-slate-200 border-dashed p-2 items-center justify-center m-2">
              <SpriteSpecifications handleDimensionForm={handleDimensionForm} spriteName="Piece" spriteSpecs={pieces.spriteSpecs} />
            </div>
            :
            <div className="flex justify-center">

              <span className="font-bold text-slate-400 p-2 hover:underline cursor-pointer" onClick={()=>handleDimensionForm()}>Add pieces dimensions</span>
            </div>
          }
        <PreviewSection title="Actions" level={4} addForm={<NewActionForm afterSubmit={closeFloating} addAction={addAction} />} setFloating={setFloating}>
          {

            actions && !!actions.length &&
            <div ref={cardsRef} className="flex gap-x-2 overflow-x-auto p-2 w-full ">
              {
                  actions.map(([name, values]) => <ActionCard key={name} deleteAction={deleteAction} nameChanged={nameChanged}  setFloating={setFloating} addAction={addAction} closeFloating={closeFloating} name={name} values={values}/>)
              }    
            </div>
          }
          </PreviewSection>
        </section>
    </PreviewSection>
   );
}
 
export default PiecesSection;