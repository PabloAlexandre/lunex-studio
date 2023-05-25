import { Editor, Monaco } from "@monaco-editor/react";

interface BaseEditorProps {
  language?: 'typescript' | 'javascript' | 'css' | 'json';
  minimap?: boolean;
}

function setEditorTheme(monaco: Monaco) {
  monaco.editor.defineTheme('onedark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {
        token: 'comment',
        foreground: '#5d7988',
        fontStyle: 'italic'
      },
      { token: 'constant', foreground: '#e06c75' }
    ],
    colors: {
      'editor.background': '#21252b'
    }
  });
}



export const BaseCodeEditor = ({
  language = 'typescript',
  minimap = true,
  
}: BaseEditorProps) => {
  const options = {
    readOnly: false,
    minimap: { enabled: minimap },
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0
  };

  return (
    <div className="relative w-full h-full" >
    <main className="h-full pt-8 w-full absolute" style={{ background: '#21252b' }} >
        <Editor width="100%" height="100%" defaultLanguage={language} theme="onedark" options={options} beforeMount={setEditorTheme} />
      </main>
    </div>
  )
}