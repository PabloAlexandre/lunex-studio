import { ElementType, ReactNode } from "react";
import { PLUGIN_PANEL_ID } from "../plugins.constants";
import { v4 as uuid } from 'uuid';
import { IconName } from "@lunex/icons/src";

export interface BasePanelProps {
  title?: string;
  children?: ReactNode
}

export type BasePanelComponent =  Omit<BasePanelProps, 'title'>;

export const PanelTitle = ({
  title
}: Pick<BasePanelProps, 'title'>) => (
  <h2 className="text-md font-extrabold text-gray-500 dark:text-gray-200 uppercase mb-4">{ title }</h2>
);

export function BasePanel({
  children,
  title,
}: BasePanelProps) {
  return (
    <>
      { title && <PanelTitle title={title} /> }
      { children }
    </>
  )
}

export type PanelPluginConfigProps = {
  id: string;
  title?: string;
  panelSide: 'left' | 'right';
  type: string;
  icon: IconName;
  isVisible: () => boolean;
  component: ElementType;
}

export class BasePanelConfig {
  constructor(
    public readonly properties: PanelPluginConfigProps,
    public readonly identifier = PLUGIN_PANEL_ID, 
  ) {}
}

interface PanelProps {
  title?: string;
  Component?: ElementType
}

function createBasePanel(id: string, icon: IconName = 'FrameIcon', panelSide: 'left' | 'right' = 'left', config: PanelProps = {}): BasePanelConfig {
  const basePanel = {
    id: uuid(),
    type: id,
    title: config.title,
    icon,
    isVisible: () => true,
    panelSide,
    component: ({ children, ...props }: any) => {
      return(
        <BasePanel title={config.title} {...props}>
          { config.Component ? <config.Component>{children}</config.Component> : children }
        </BasePanel>
      )
    }
  }

  return new BasePanelConfig(basePanel);
}

export const Panel = {
  createBasePanel,
}