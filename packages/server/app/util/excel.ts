import type { Alignment, Border, Borders, BorderStyle, Cell, Color, Fill, Font, Worksheet } from 'exceljs'

export function fgColorFill(color: string): Fill {
  return {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {
      argb: color
    }
  }
}

export function font(
  size: number,
  color: string,
  bold = false,
  italic = false,
  underline = false,
): Partial<Font> {
  return {
    size,
    color: {
      argb: color
    },
    bold,
    italic,
    underline: underline ? 'single' : 'none',
  }
}

export function color(argb: string): Partial<Color> {
  return {
    argb
  }
}

type AlignHorizontal = 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed'
type AlignVertical = 'top' | 'middle' | 'bottom' | 'distributed' | 'justify'
export function align(horizontal?: AlignHorizontal, vertical?: AlignVertical, wrapText = false): Partial<Alignment> {
  return {
    horizontal,
    vertical,
    wrapText
  }
}

export function eachAllCell(
  sheet: Worksheet,
  callback: (cell: Cell, rowNumber: number, colNumber: number) => void,
  includeEmpty = false
) {
  sheet.eachRow((row, rowNumber) => {
    row.eachCell({ includeEmpty }, (cell, colNumber) => {
      callback(cell, rowNumber, colNumber)
    })
  })
}

export function allBorder(style: BorderStyle, color?: string): Partial<Borders> {
  const border: Border = {
    style,
    color: {
      argb: color
    }
  }
  return {
    top: border,
    bottom: border,
    left: border,
    right: border,
  }
}
