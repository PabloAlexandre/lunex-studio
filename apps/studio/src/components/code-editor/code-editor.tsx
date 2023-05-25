import { Editor, Monaco } from "@monaco-editor/react";
import { useState } from "react";

interface BaseEditorProps {
  language?: 'typescript' | 'javascript' | 'css' | 'json';
  minimap?: boolean;
  hideLines?: boolean;
  tabSize?: number;
  value?: string;
  setValue?: (value: string) => void;
}

export const BaseCodeEditor = ({
  language = 'typescript',
  minimap = true,
  hideLines = false,
  tabSize = 2,
  value,
  setValue,
}: BaseEditorProps) => {

  const options: any = {
    minimap: { enabled: minimap },
    
    overviewRulerBorder: false,
    tabSize: tabSize,
  };

  if(hideLines) {
    options.lineNumbers =  'off';
    options.glyphMargin =  false;
    options.folding =  false;
    options.lineDecorationsWidth =  0;
    options.lineNumbersMinChars =  0;
  }

  return (
    <div className="relative w-full h-full" >
    <main className="h-full w-full absolute" style={{ background: '#21252b' }} >
        <Editor onChange={e => setValue && setValue(e || '')} value={value} width="100%" height="100%" defaultLanguage={language} options={options} theme="vs-dark" />
      </main>
    </div>
  )
}