import { Window } from "@lunex/plugins";
import { ViewportWindowsComponent } from "../components/viewport";

export function ViewportWindowImpl() {
  return (
    <div className="bg-gray-500 text-gray-300 p-8 text-2xl w-full h-full">
      Minha janela do Figma
    </div>
  )
}

export const FigmaWindow = Window.createWindow('figma', 'Figma', ViewportWindowImpl, {
  icon: "FigmaIcon",
  canClose: true,
  isEditable: true,
}) as any;