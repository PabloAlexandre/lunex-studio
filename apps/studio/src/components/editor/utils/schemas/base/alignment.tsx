'use client';

import { Schema } from "@editor/types";

export const AlignmentBaseSchema: Schema = {
  'Alignment': {
    id: 'alignment',
    childrens: [{
      id: '',
      type: 'HorizontalRow',
      childrens: [{
        type: 'Justify',
        title: 'Justify',
        id: 'justify'
      }, {
        type: 'Items',
        title: 'Align Items',
        id: 'items'
      }, {
        type: 'Justify',
        title: 'Text Align',
        id: 'text-align'
      }]
    }]
  }
}