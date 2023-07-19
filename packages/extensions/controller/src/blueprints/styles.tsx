import { Drag, Presets } from "rete-react-render-plugin";
import { Schemes } from "./types";
import { css } from "styled-components";
import { useRegister } from "@lunex/plugins/src";

export const nodeStyle = css<{ selected?: boolean }>`
  background-color: rgba(255, 255, 255, 0.8);
  border-width: 2px;
  border-color: #54469b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 4px 12px 4px;

  font-family: initial !important;
  
  .title, input {
    font-family: 'Inter', sans-serif !important;
  }

  .title {
    font-size: 13px;  
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
  }

  .output-title {
    font-size: 10px;
    font-weight: bold;
    color: rgba(0,0,0, 0.5);
  }

  .input-title {
    font-size: 10px;
    font-weight: bold;
    color: rgba(0,0,0, 0.3);
    margin: 0px;
  }
  .control {
    padding:0  8px;
    margin-bottom: 8px;
  }

  .input-control {
    width: calc(100% - 20px) !important;
  }

  input {
    padding: 2px 8px !important;
    border-radius: 6px !important;
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
  }

  ${(props) => props.selected && css`
    border-color: #e87bc2;
  `}
`;

export function StyledNode(props: { data: Schemes['Node'] }) {
  // @ts-ignore
  console.log({ props: props.data?.node });
  // @ts-ignore
  const Component =  !props.data?.node?.ignoreOnNode && props.data?.node?.component ? props.data?.node?.component : ((newProps: any) => (
    <Presets.classic.Node styles={() => nodeStyle} emit={console.log} {...newProps} />
  ))

  return <Component {...props} />;
}


const connectionStyle = css<{ selected?: boolean }>`
  stroke: #71d385;
  stroke-width: 3px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export function StyledConnection(props: { data: Schemes['Connection'] }) {
  return <Presets.classic.Connection styles={() => connectionStyle} {...props} />;
}


const socketStyle = css<{ selected?: boolean }>`
  display: none !important;
`;

export function StyledSocket(props: any) {
  return <Presets.classic.Socket styles={() => socketStyle} {...props} />;
}

export function StyledControl(props: any) {
  const register = useRegister();
  const type = props?.data?.options?.input || 'default';
  
  const Component = register.state.controllers.find((it: any) => it.id === type)?.component || ((newProps: any) => (
    <Presets.classic.Control {...newProps} />
  ));

  return (
    <>
      <Component {...props} />
    </>
  )
}
