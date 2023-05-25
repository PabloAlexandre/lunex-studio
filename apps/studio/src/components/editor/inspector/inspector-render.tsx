'use client';

import { useRegister } from "@editor/register";

interface InspectorRenderProps {
  id: string;
}

export function InspectorRender(props: InspectorRenderProps) {
  const register = useRegister();
  const Component = (register.get('inspectors', props.id) as any).component || (() => <></>);

  return (
    <>
      <Component />
    </>
  )
}