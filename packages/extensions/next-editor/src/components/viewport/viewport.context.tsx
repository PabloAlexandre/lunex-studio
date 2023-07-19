import { createContext, useContext } from "react";

interface ViewportContextValue {
  page: Array<string>;
}

const ViewportContext = createContext<ViewportContextValue>({
  page: []
});

export function useViewport() {
  const val = useContext(ViewportContext);
  if(!val) throw new Error('useViewport must be used within a ViewportProvider');

  return val;
}

export const ViewportProvider = ({ children }: any) => {
  return (  
    <ViewportContext.Provider value={{ page: [] }}>
      {children}
    </ViewportContext.Provider>
  );
}
