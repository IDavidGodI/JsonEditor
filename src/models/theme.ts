export interface ActionField{
  frames: number
  fps?: number
}

export interface ActionFields{
  [key: string]: ActionField
}

export interface SpriteFields{
  dimensions?: number
  offset?: number
}

export interface PiecesFields{
  spriteSpecs?: SpriteFields
  actions?: ActionFields
}

export interface BoardFields{
  spriteSpecs?: SpriteFields
}

export interface colorPaletteField{
  bgColor?: string
  fontColor?: string
}

export interface colorPaletteFields{
  [key: string]: colorPaletteField  
}

export interface ThemeFields{
  pieces?: PiecesFields
  board?: BoardFields
  colorPalette?: colorPaletteFields
}