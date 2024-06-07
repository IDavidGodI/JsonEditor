import { cn } from "../../utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
  
}
 
const TextField = ({className, ...props}: TextFieldProps) => {
  return ( 
    <input 
      className={cn("outline-none border-b-2 border-sky-300 focus:border-sky-500 disabled:border-gray-300 disabled:bg-slate-200 transition-colors",className)} 
      {...props}
    />
  );
}
 
export default TextField;