'use client';

import { ElementType, ReactNode } from "react";
import { RegisterStorage } from "@lunex/plugins";

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

export function createBasePanel(id: string, title?: string, Component?: ElementType) {
  const basePanel = {
    id,
    title,
    component: ({ children, ...props }: any) => {
      return(
        <BasePanel title={title} {...props}>
          { Component ? <Component>{children}</Component> : children }
        </BasePanel>
      )
    }
  }

  RegisterStorage.getInstance().register("inspectors", basePanel);
}