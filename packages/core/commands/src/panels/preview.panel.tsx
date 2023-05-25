'use client';

import { ReactNode } from "react";
import { generateColorFromString } from "@lunex/utils";

export const PreviewPanel = ({
  children,
  title,
  subtitle,
  category,
}: { 
  children: ReactNode,
  title: string,
  subtitle: string,
  category: string;
}) => {
  const color = generateColorFromString(category, 25, 30);
  const iconColor = generateColorFromString(category, 25, 65);

  const bgStyles = {
    background: color
  }

  const iconStyles = {
    background: iconColor
  }
  
  return (
    <div className="flex flex-col text-black w-8/12 h-full">
      <div cmdk-framer-right="" className="relative w-full h-full mx-auto mt-2" style={{ background: 'url("/grid.webp")' }}>
        { children && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-900 opacity-70 z-10" style={bgStyles}  /> 
            <div className="relative h-full z-20 flex flex-col items-center p-12" style={{ height: 285 }}>
              <div className="h-16 w-16 rounded-lg text-white flex items-center justify-center mb-8" style={iconStyles} >
                { children }
              </div>
              <div className="text-white text-center">
                <h4 className="font-extrabold text-lg mb-2">{title}</h4>
                <p className="text-gray-200 text-md">{subtitle}</p>
              </div>
            </div>

          </>
        )}
      </div>
      <div className="flex items-center py-3 justify-end px-4">
        <h1 className="text-xs text-gray-400 font-bold">
          Execute action
          <span style={{ fontSize: 10, padding: '5px 8px' }} className="mb-1 ml-2 py-1 px-1 bg-gray-300 font-regular text-white rounded-md">⏎</span>
        </h1>
      </div>
    </div>
  )
}