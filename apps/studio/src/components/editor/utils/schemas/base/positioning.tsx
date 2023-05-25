'use client';

import { Schema } from "@editor/types";

export const PositioningBaseSchema: Schema = {
  'Positioning': {
    id: 'positioning',
    childrens: [{
      id: 'rect',
      type: 'Field',
      label: 'Position',
      childrens: [{
        type: 'Number',
        title: 'Left',
        id: 'x'
      }, {
        type: 'Number',
        title: 'Top',
        id: 'y'
      }]
    }, {
      id: 'padding',
      type: 'Field',
      label: 'Padding',
      childrens: [{
        type: 'Number',
        title: 'Left',
        id: 'x'
      }, {
        type: 'Number',
        title: 'Top',
        id: 'y'
      }]
    }, {
      id: 'margin',
      type: 'Field',
      label: 'Margin',
      childrens: [{
        type: 'Number',
        title: 'Left',
        id: 'x'
      }, {
        type: 'Number',
        title: 'Top',
        id: 'y'
      }]
    }, {
      type: 'Range',
      title: 'Width',
      id: 'width'
    }, {
      type: 'Range',
      title: 'Height',
      id: 'height'
    }]
  }
} 