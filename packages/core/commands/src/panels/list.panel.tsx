'use client';

import { Command } from "cmdk";
import { generateColorFromString } from "@lunex/utils";
import { Icon } from "@lunex/icons";
import { CommandPluginConfigProps } from "@lunex/plugins";

interface ItemProps {
  onSelect: (value: string) => void;
  children: React.ReactNode;
  value: string;
  title: string;
  subtitle: string;
  color: string;
}

function Item({ onSelect, children, title, value, subtitle, color }: ItemProps) {
  const styles = {
    background: color
  };

  return (
    <Command.Item onSelect={onSelect} value={value}>
      <div cmdk-framer-icon-wrapper="" className="text-gray-300" style={styles}>{children}</div>
      <div cmdk-framer-item-meta="" className="text-gray-600">
        {title}
        <span cmdk-framer-item-subtitle="" className="text-gray-600">{subtitle}</span>
      </div>
    </Command.Item>
  )
}

interface ListProps {
  value: string;
  title: string;
  items: any;
  onSelect: (value: string) => void;
}

export const ListPanel = ({
  title,
  items,
  onSelect,
}: ListProps) => {

  const color = generateColorFromString(title, 25, 65);
  return (
    <Command.Group heading={title} className="mt-2 mb-4 text-gray-500">
      {
        items.map((it: CommandPluginConfigProps) => (
          <Item onSelect={onSelect} title={it.title} value={it.id} subtitle={it.subtitle} key={it.id} color={color}>
            <Icon name={it.icon} size={5} />
          </Item>
        ))
      }
      
    </Command.Group>
  )
}