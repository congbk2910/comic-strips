import { Slider } from '@mantine/core';
import React from 'react';

import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';

import ControlHeader from '../components/ControlHeader';

export default function StrokeWidthControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  return (
    <>
      <ControlHeader title="Stroke Width" />
      <Slider
        key={`stroke-width-slider-${activeObject.id}`}
        size="sm"
        min={0}
        max={Math.floor(Math.min(activeObject.width / 2, activeObject.height / 2))}
        value={activeObject.strokeWidth}
        onChange={(value) => {
          updateCanvasObject(activeObject.id, {
            strokeWidth: value,
          });
        }}
        label={(value) => `${value} px`}
      />
    </>
  );
}
