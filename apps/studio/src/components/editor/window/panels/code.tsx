import { Editor } from "@monaco-editor/react";

interface CodeWindowProps {
  language?: 'typescript' | 'javascript' | 'css' ;
}

function setEditorTheme(monaco: any) {
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

export const CodeWindow = ({
  language = 'typescript'
}: CodeWindowProps) => (
  <div className="relative w-full h-full" >
  <main className="h-full pt-8 w-full absolute" style={{ background: '#21252b' }}>
      <Editor width="100%" height="100%" defaultLanguage={language} theme="onedark" beforeMount={setEditorTheme} />
    </main>
  </div>
  
)