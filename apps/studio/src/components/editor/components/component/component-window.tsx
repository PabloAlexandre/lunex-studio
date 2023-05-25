import { createWindow } from "@editor/window"

export const ComponentWindowImpl = () => (
  <main className="h-16 w-full bg-black">
    a
  </main>
)

export const ComponentWindow = createWindow({
  id: 'component',
  title: 'New Component',
  component: ComponentWindowImpl,
});