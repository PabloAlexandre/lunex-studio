'use client';

import { useState } from "react";

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaGradient,
  ColorPickerAreaThumb,
  ColorPickerChannelSliderBackground,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatch,
  ColorPickerSwatchBackground,
  ColorPickerSwatchGroup,
} from '@ark-ui/react';

import { Icon } from "@editor/icons";
import { useClickOutside } from "@editor/hooks";
import { useEditor } from "@editor/state"

const ArkColorPicker = ({
  value,
  setValue,
  onExit,
}: any) => {
  const ref = useClickOutside(onExit);

  return (
    <ColorPicker value={value} onChange={(details: any) => setValue(details.value)}>
      {(api) => {
        const [hue, saturation, lightness] = api.channels
        return (
          <div ref={ref} className="absolute z-10 right-8 top-8 w-2/4 rounded overflow-hidden shadow-lg">
            <ColorPickerContent>
              <output>
                <ColorPickerSwatch value={api.value} readOnly />
              </output>
              <ColorPickerArea xChannel={saturation} yChannel={lightness}>
                <ColorPickerAreaGradient />
                <ColorPickerAreaThumb />
              </ColorPickerArea>

              <main className="p-4">
                <div className="flex pb-4">
                  <div className="flex">
                    <ColorPickerEyeDropperTrigger>
                      <span className="flex items-center">
                        <Icon name="ColorPickerIcon" size={6} className="inline-flex mr-4" />
                      </span>
                    </ColorPickerEyeDropperTrigger>
                  </div>
                  <div className="flex flex-col flex-1">
                    <ColorPickerChannelSliderTrack channel={hue}>
                      <ColorPickerChannelSliderBackground />
                      <ColorPickerChannelSliderThumb />
                    </ColorPickerChannelSliderTrack>

                    <ColorPickerChannelSliderTrack channel="alpha">
                      <ColorPickerChannelSliderBackground />
                      <ColorPickerChannelSliderThumb />
                    </ColorPickerChannelSliderTrack>
                  </div>
                </div>
                <footer className="border-t border-gray-300 pt-2 ">
                  <ColorPickerSwatchGroup>
                    <ColorPickerSwatch value="#123123">
                      <ColorPickerSwatchBackground />
                    </ColorPickerSwatch>
                    <ColorPickerSwatch value="#ff1321">
                      <ColorPickerSwatchBackground />
                    </ColorPickerSwatch>
                  </ColorPickerSwatchGroup>
                </footer>

              </main>
            </ColorPickerContent>
          </div>
        )
      }}
    </ColorPicker>
  )
}

export function ColorPickerComponent({
  id,
  defaultValue = 'hsl(0, 0%, 0%)',
  title,
}: any) {
  const { context } = useEditor();
  const [open, setOpen] = useState(false);
  const [ color, setColor ] = context.serializeField(id, defaultValue)

  function handleChange(val: any) {
    setColor(val);
  }

  return (
    <div className="relative flex justify-between w-full items-center pr-2 my-3">
      <h4 className="text-xs text-gray-500 uppercase font-bold">{ title }</h4>
      <div className="w-8 h-8" onClick={() => setOpen(!open)} style={{ background: color }} />
      { open && <ArkColorPicker value={color} setValue={handleChange} onExit={() => setOpen(false)} /> }
    </div>
  )
}
