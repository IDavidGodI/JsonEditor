import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export const formatKeyName = (toFormat: string) => toFormat.toLowerCase().replace(" ", "_")