import { cn } from "../../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  primary?: boolean
  secondary?: boolean
}
 
const Button = ({className, primary, secondary,...props}: ButtonProps) => {



  return ( 
    <button className={cn("p-2 h-full text-white w-full",{
      "bg-sky-500 disabled:bg-sky-300 disabled:text-gray-400 enabled:hover:bg-sky-600": primary,
      "shadow-xl text-center align-baseline bg-purple-400 text-white hover:bg-purple-500": secondary
    },className)} {...props}/>
   );
}
 
export default Button;