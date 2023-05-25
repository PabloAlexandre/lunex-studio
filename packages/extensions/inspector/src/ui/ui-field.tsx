'use client';

import { HorizontalRow } from "./layout/horizontal-row";
import { Accordion } from "./layout/accordion";
import { RangeField } from "./fields/range-field";
import { ColorPickerComponent } from "./fields/color-picker";
import { AlignField } from "./fields/align-field";
import { NumberField } from "./fields/number-field";
import { Field, InputField } from "./fields";
import { TextField } from "./fields/text-field";
import { ImageField } from "./fields/image-field";


export type SchemaField = keyof typeof SchemaMapper;

interface UIFieldProps {
  field: SchemaField;
  id: string;
  props?: any;
}

const SchemaMapper = {
  'Range': RangeField,
  'Color': ColorPickerComponent,
  'Justify': ({ ...props }) => <AlignField {...props} />,
  'Items': ({ ...props }) => <AlignField {...props} iconSet="vertical" />,
  'Group': Accordion,
  'Field': Field,
  'Number': NumberField,
  'InputField': InputField,
  'Image': ImageField,
  'TextField': TextField,
  'HorizontalRow': HorizontalRow,
} as any;

export function UIField({
  field,
  id,
  props = {},
}: UIFieldProps) {
  const Component = SchemaMapper[field];

  if(!Component) {
    console.log({ field, Component });
  }

  return (
    <Component key={id} {...props} id={id}/>
  )
}

