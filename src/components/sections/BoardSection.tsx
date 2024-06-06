import { BoardFields, ThemeFields } from "../../models/theme"
import PreviewSection from "./PreviewSection"
import SpriteSpecificationsForm from "../forms/SpriteSpecs"
import SpriteSpecifications from "./SpriteSpecs"

interface BoardSectionProps {
  file: ThemeFields
  setLoadedFile: React.Dispatch<ThemeFields>
  loadedFile: ThemeFields | null
  setFloating: (element: React.ReactNode) => void
  floating: React.ReactNode
  closeFloating: () => void
}
 
const BoardSection = ({ file, setFloating, closeFloating, loadedFile, setLoadedFile }: BoardSectionProps) => {

  

  let board: BoardFields | undefined
  if (file && file.board) {
    board = file.board
  }

  const setDimension = (dimensions: number, offset: number) => {
    if (!loadedFile)
      return setLoadedFile({
      board: {
        spriteSpecs:{
          dimensions,
          offset
        }
      }
    })

    setLoadedFile({...{
      ...loadedFile, board: {
        ...loadedFile.board,
        spriteSpecs:{
          dimensions,
          offset
        }
      }
    }})
  }

  const handleDimensionForm = (defDimensions?: number, defOffset?: number) => setFloating(
    <SpriteSpecificationsForm withOffset  sendDimension={setDimension} afterSubmit={closeFloating} defaultDimension={defDimensions} defaultOffset={defOffset}/>
  )

  return ( 
    <PreviewSection title="Board">
      <section className="flex flex-col justify-center w-full">
        {
          (board?.spriteSpecs) ?
            <div className="flex gap-x-2 border-2 border-slate-200 border-dashed p-2 items-center overflow-auto min-w-0 m-2">
              <SpriteSpecifications showOffset handleDimensionForm={handleDimensionForm} spriteName="Board" spriteSpecs={board.spriteSpecs}/>
            </div>
            :
            <div className="flex justify-center">

              <span className="font-bold text-slate-400 p-2 hover:underline cursor-pointer" onClick={() => handleDimensionForm()}>Add board dimensions</span>
            </div>
        }
      </section>
    </PreviewSection>
   );
}
 
export default BoardSection;