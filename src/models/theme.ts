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

export interface ColorSettingField{
  bgColor?: string
  fgColor?: string
}

export interface ColorSchemeFields{
  [key: string]: ColorSettingField
}

export interface ColorSettingFields{
  defaultScheme?: ColorSettingField
  schemes?: ColorSchemeFields
}

export interface ThemeFields{
  pieces?: PiecesFields
  board?: BoardFields
  colorSettings?: ColorSettingFields
}


