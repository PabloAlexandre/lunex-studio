'use client';

import { InspectorRender } from "./inspector-render";
import { useEditor } from '@lunex/state';

export function Inspector() {
  const { context, state } = useEditor();
  const inspector = state.inspector;
  const hide = !context.settings.inspector;

  const className = hide ? 'hidden' : '';

  return (
    <aside className={ className + " w-3/12 pl-8 pt-24 border-l border-gray-200 bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-l-gray-900 z-10" } style={{ 
      boxShadow:  '0 3px 24px 0 rgba(0,0,0, 0.3)',
    }}>
      <InspectorRender id={inspector.active} />
    </aside>
  )
}