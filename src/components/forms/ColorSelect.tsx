import { ColorResult, Sketch, SketchProps } from '@uiw/react-color';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { cn } from '../../utils';



const  ColorSelector = forwardRef<{hex?: string}, SketchProps & {title: string}>(({defaultValue,className,onChange,title}, ref) => {
  const [hex, setHex] = useState<string | undefined>(defaultValue?.toString());
  useImperativeHandle(ref, ()=>({
    hex
  }))
  const selfOnChange = (color: ColorResult) => {
    if (color.hex) setHex(color.hex);
    if (onChange) onChange(color)
  }
  return (
    <div className={cn("bg-white inline-block p-1 font-bold text-center border-2",className)}>
      <p className="py-1">{title}</p>
    <Sketch
      color={hex}
      onChange={selfOnChange}
      presetColors={[]}
      
      />
    </div>
  );
})

ColorSelector

export default ColorSelector