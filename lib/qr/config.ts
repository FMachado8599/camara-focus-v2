//config.ts

import { QROptions } from "./types"

export interface ControlSchema<T = any> {
  key: keyof QROptions
  label: string
  type: ControlType
  unit?: string
  options?: { label: string; value: T }[]
  showWhen?: (options: QROptions) => boolean
}


export type ControlType =
  | "color"
  | "options"
  | "text"
  | "image"
  | "toggle"

export interface ControlSchema<T = any> {
  key: keyof QROptions
  label: string
  type: ControlType
  unit?: string
  options?: { label: string; value: T }[]
  showWhen?: (options: QROptions) => boolean
}


export const QR_CONFIG_SCHEMA: ControlSchema[] = [
    {
        key: "exportSize",
        label: "Tamaño",
        unit: "px",
        type: "options",
        options: [
        { label: "150", value: 150 },
        { label: "300", value: 300 },
        { label: "500", value: 500 },
        { label: "1000", value: 1000 },
        ],
    },
    {
        key: "margin",
        label: "Margen",
        unit: "pt",
        type: "options",
        options: [
        { label: "0", value: 0 },
        { label: "4", value: 4 },
        { label: "8", value: 8 },
        { label: "16", value: 16 },
        ],
    },
    {
        key: "dotsType",
        label: "Estilo de puntos",
        type: "options",
        options: [
        { label: "Square", value: "square" },
        { label: "Dots", value: "dots" },
        { label: "Rounded", value: "rounded" },
        { label: "Classy", value: "classy" },
        { label: "Extra Rounded", value: "extra-rounded" },
        ],
    },
    {
        key: "cornersSquareType",
        label: "Esquinas",
        type: "options",
        options: [
        { label: "Square", value: "square" },
        { label: "Dot", value: "dot" },
        { label: "Extra Rounded", value: "extra-rounded" },
        ],
    },
    {
        key: "cornersDotType",
        label: "Puntos de esquina",
        type: "options",
        options: [
        { label: "Square", value: "square" },
        { label: "Dot", value: "dot" },
        ],
    },
    {
        key: "foregroundColor",
        label: "Color del QR",
        type: "color",
    },
    {
        key: "backgroundColor",
        label: "Fondo",
        type: "color",
    },
    // {
    //     key: "backgroundTransparent",
    //     label: "Fondo transparente",
    //     type: "toggle",
    // },
    {
        key: "errorCorrectionLevel",
        label: "Corrección de errores",
        type: "options",
        options: [
            { label: "Baja", value: "L" },
            { label: "Media", value: "M" },
            { label: "Alta", value: "Q" },
            { label: "Máxima", value: "H" },
        ],
    },
    {
        key: "logoImage",
        label: "Logo",
        type: "image",
    },
    {
        key: "logoSize",
        label: "Tamaño del logo",
        unit: "%",
        type: "options",
        options: [
            { label: "20", value: 0.2 },
            { label: "30", value: 0.3 },
            { label: "40", value: 0.4 },
            { label: "50", value: 0.5 },
        ],
        showWhen: (opts) => !!opts.logoImage,
    },
    {
        key: "logoMargin",
        label: "Margen del logo",
        unit: "pt",
        type: "options",
        showWhen: (opts) => !!opts.logoImage,
        options: [
            { label: "0", value: 0 },
            { label: "4", value: 4 },
            { label: "8", value: 8 },
            { label: "12", value: 12 },
        ],
    },
    {
        key: "hideBackgroundDots",
        label: "Limpiar fondo del logo",
        type: "toggle",
        showWhen: (opts) => !!opts.logoImage,
    }
]

