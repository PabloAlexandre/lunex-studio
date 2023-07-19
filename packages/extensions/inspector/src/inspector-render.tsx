'use client';

import { useRegister } from "@lunex/plugins/src";

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