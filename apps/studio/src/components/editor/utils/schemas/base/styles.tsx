'use client';

import { Schema } from "@editor/types";

export const StylesBaseSchema: Schema = {
  'Styles': {
    id: 'styles',
    childrens: [{
      type: 'Color',
      title: 'Text Color',
      id: 'color'
    }, {
      type: 'Color',
      title: 'Background Color',
      id: 'background'
    }, {
      type: 'Range',
      title: 'Font Size',
      id: 'fontSize',
      min: '10',
      max: '180'
    }, {
      type: 'InputField',
      title: 'Tailwind Class',
      id: 'tailwind',
    }]
  }
} 