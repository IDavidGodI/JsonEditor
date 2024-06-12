import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export const formatKeyName = (toFormat: string) => toFormat.toLowerCase().replace(" ", "_")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeDicts = <T extends Record<string, any>,>(mainDict: T, toMergeDict: T) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mainCopy = {...mainDict} as any
  for (const [k,v] of Object.entries(toMergeDict)){
    const mainKey =  mainDict[k]
    if (mainKey instanceof Object && mainKey && v instanceof Object){
      mainCopy[k] = {...mainCopy[k] ,...mergeDicts(mainDict[k], v)}
    }else{
      mainCopy[k] = v
    }
  }
  return mainCopy as T
}