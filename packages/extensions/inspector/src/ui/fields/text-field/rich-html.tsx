import ReactMarkdown from 'react-markdown'

const componentsMap: any = {
  b: ({ children }: any) => <b className="font-extrabold">{ children }</b>,
  i: ({ children }: any) => <i className="font-extrabold">{ children }</i>,
  p: ({ children }: any) => <>{ children }</>,
  u: ({ children }: any) => <u>{ children }</u>,
}

export function RichHTML ({
  text,
  value,
}: any) {
  let html = text;

  if(!html && value.text) {
    html = value.text;
  } else if(value.md) {

    return (
      <ReactMarkdown components={componentsMap}>
        { value.md }
      </ReactMarkdown>
    )
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}