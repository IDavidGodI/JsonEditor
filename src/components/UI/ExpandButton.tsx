import { cn } from "../../utils";
import PlusIcon from "../icons/PlusIcon";

interface ExpandButtonProps  {
  negate?: boolean
  className?: string
}
 
const ExpandButton = ({className, negate}: ExpandButtonProps) => {
  return ( 
    <PlusIcon negate={negate} className={cn({
      "text-red-500 hover:text-red-600": negate,
      "text-green-500 hover:text-green-600": !negate
    }, className)}/> 
  );
}
 
export default ExpandButton;