import { EditableProvider } from "../editable-provider";
import { CMSProviderClient } from "./cms-provider-client";

export function CMSProvider({
  children,
  ...props
}: any) {
  const provider = EditableProvider.getInstance();

  const wrapper = provider.isEditable ? 
  <CMSProviderClient {...props}>{ children }</CMSProviderClient> : 
  <>{ children }</>;

  return wrapper;
}