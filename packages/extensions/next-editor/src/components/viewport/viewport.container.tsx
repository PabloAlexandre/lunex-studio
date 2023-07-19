import { ViewportWindowsComponent } from "./viewport";
import { ViewportProvider } from "./viewport.context";

export function ViewportContainer() {
  return (
    <ViewportProvider>
      <ViewportWindowsComponent />
    </ViewportProvider>
  )
}