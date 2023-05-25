'use client';

import { createBasePanel } from "@editor/inspector";

export const ComponentsPanel = createBasePanel('components', 'Components', () => (
  <>
    {/* {
      Object.entries({}).map(([key, value]: any) => (
        <SidebarCategory key={key} items={value} title={key} id={key.toLowerCase()} />
      )) 
    } */}
  </>
))
