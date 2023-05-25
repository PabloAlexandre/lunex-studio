export type ColorMap = keyof typeof COLOR_MAP;

export const COLOR_MAP = {
  green: {
    border: 'border-green-300',
    bg: 'bg-green-300',
    text: 'text-green-300',
    hover: 'hover:bg-green-500'
  },
  indigo: {
    border: 'border-indigo-300',
    bg: 'bg-indigo-300',
    text: 'text-indigo-300',
    hover: 'hover:bg-indigo-500'
  },
  blue: {
    border: 'border-blue-300',
    bg: 'bg-blue-300',
    text: 'text-blue-300',
    hover: 'hover:bg-blue-500'
  },
  red: {
    border: 'border-red-300',
    bg: 'bg-red-300',
    text: 'text-red-300',
    hover: 'hover:bg-red-500'
  },
  orange: {
    border: 'border-orange-300',
    bg: 'bg-orange-300',
    text: 'text-orange-300',
    hover: 'hover:bg-orange-500'
  },
  rose: {
    border: 'border-rose-300',
    bg: 'bg-rose-300',
    text: 'text-rose-300',
    hover: 'hover:bg-rose-500'
  },
  yellow: {
    border: 'border-yellow-300',
    bg: 'bg-yellow-300',
    text: 'text-yellow-300',
    hover: 'hover:bg-yellow-500'
  },
  purple: {
    border: 'border-purple-300',
    bg: 'bg-purple-300',
    text: 'text-purple-300',
    hover: 'hover:bg-purple-500'
  },
  pink: {
    border: 'border-pink-300',
    bg: 'bg-pink-300',
    text: 'text-pink-300',
    hover: 'hover:bg-pink-500'
  },
  gray: {
    border: 'border-gray-300',
    bg: 'bg-gray-300',
    text: 'text-gray-300',
    hover: 'hover:bg-gray-500'
  },
  white: {
    border: 'border-white',
    bg: 'bg-white',
    text: 'text-white',
    hover: 'hover:bg-gray-500'
  },
  black: {
    border: 'border-black',
    bg: 'bg-black',
    text: 'text-black',
    hover: 'hover:bg-gray-500'
  },
  transparent: {
    border: 'border-transparent',
    bg: 'bg-transparent',
    text: 'text-transparent',
    hover: 'hover:bg-gray-500'
  },
}

export function withColor(className: string, properties: Array<'border' | 'bg' | 'text' | 'hover'>, color: ColorMap) {
  const colorProperties = COLOR_MAP[color];
  return `${className} ${properties.map(p => colorProperties[p]).join(' ')}`;
}