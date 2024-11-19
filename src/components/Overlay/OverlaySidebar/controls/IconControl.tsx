import { Button, ActionIcon, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import * as aiIcons from 'react-icons/ai';
import styled from 'styled-components';

import useCanvasContext from '~/context/useCanvasContext';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useUserMode from '~/store/useUserMode';
import generateUniqueId from '~/utils/generateUniqueId';
import getDimensionsFromImage from '~/utils/getDimensionsFromImage';
import getImageElementFromUrl from '~/utils/getImageElementFromUrl';

const iconEntries = Object.entries({
  bulle1: '/images/bubble_icons/Bubble_for_speech.svg',
  bulle2: '/images/bubble_icons/bulle.svg',
  bulle3: '/images/bubble_icons/thought-cloud-jon-phill-02r.svg',
  bulle4: '/images/bubble_icons/SRD_comic_clouds_8.svg',
  bulle5: '/images/bubble_icons/thought-bubble.svg',
  bulle6: '/images/bubble_icons/thought_bubble.svg',
  bulle7: '/images/bubble_icons/nicubunu_Callout_star_center.svg',
  bulle8: '/images/bubble_icons/nicubunu_Callout_star.svg',
  bulle9: '/images/bubble_icons/bulle2.svg',
  bulle10: '/images/bubble_icons/nicubunu_Callout_cloud_center.svg',
  bulle11: '/images/bubble_icons/nicubunu_Callout_cloud_left.svg',
  bulle12: '/images/bubble_icons/nicubunu_Callout_cloud_right.svg',
  bulle13: '/images/bubble_icons/nicubunu_Callout_cloud.svg',
  bulle14: '/images/bubble_icons/nicubunu_Callout_segmented_center.svg',
  bulle15: '/images/bubble_icons/nicubunu_Callout_segmented_left.svg',
  bulle16: '/images/bubble_icons/nicubunu_Callout_segmented_right.svg',
  bulle17: '/images/bubble_icons/nicubunu_Callout_segmented.svg',
  bulle18: '/images/bubble_icons/ibdjl95_Speech_Bubbles_2.svg',
  bulle19: '/images/bubble_icons/speech_7.svg',
  bulle20: '/images/bubble_icons/speech_9.svg',
  bulle21: '/images/bubble_icons/speech-4.svg',
  bulle22: '/images/bubble_icons/speech_15.svg',
  bulle23: '/images/bubble_icons/speech_17.svg',
  bulle24: '/images/bubble_icons/speech_18.svg',
  bulle25: '/images/bubble_icons/Speech_Bubble_Arvin61r58.svg',
  bulle26: '/images/bubble_icons/speech_bubble.svg',
  bulle27: '/images/bubble_icons/tikigiki-caption-balloon-005.svg',
  bulle28: '/images/bubble_icons/SRD_comic_clouds_11.svg',
  bulle29: '/images/bubble_icons/SRD_comic_clouds_10.svg',
  bulle30: '/images/bubble_icons/bulle5.svg',
  bulle31: '/images/bubble_icons/bulle6.svg',
  bulle32: '/images/bubble_icons/ibdjl95_Speech_Bubbles_1.svg',
  bulle33: '/images/bubble_icons/nicubunu_Callout_circle_left.svg',
  bulle34: '/images/bubble_icons/nicubunu_Callout_circle_right.svg',
  bulle35: '/images/bubble_icons/ibdjl95_Speech_Bubbles_1.svg',
  bulle36: '/images/bubble_icons/nicubunu_Callout_round_center.svg',
  bulle37: '/images/bubble_icons/nicubunu_Callout_round_left.svg',
  bulle38: '/images/bubble_icons/nicubunu_Callout_round_right.svg',
  bulle39: '/images/bubble_icons/nicubunu_Callout_rounded_rectangle_center.svg',
  bulle40: '/images/bubble_icons/nicubunu_Callout_rounded_rectangle_left.svg',
  bulle41: '/images/bubble_icons/nicubunu_Callout_rounded_rectangle_right.svg',
  bulle42: '/images/bubble_icons/speech_1.svg',
  bulle43: '/images/bubble_icons/speech_2.svg',
  bulle44: '/images/bubble_icons/tikigiki-caption-balloon-004.svg',
  bulle45: '/images/bubble_icons/Bubble-talk.svg',
  bulle46: '/images/bubble_icons/1300738303.svg',
  bulle47: '/images/bubble_icons/bulle3.svg',
  bulle48: '/images/bubble_icons/bulle4.svg',
  bulle49: '/images/bubble_icons/bulle7.svg',
  bulle50: '/images/bubble_icons/bulle8.svg',
  bulle51: '/images/bubble_icons/nicubunu_Callout_rectangle_center.svg',
  bulle52: '/images/bubble_icons/nicubunu_Callout_rectangle_left.svg',
});

const GridDiv = styled.div`
  width: 100%;
  pointer-events: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 10px 0;
  border: 0.0625rem solid var(--color-borderPrimary);
  border-radius: 0.25rem;
`;

interface Props {
  pageSize?: number;
}

export default function IconControl({ pageSize = 60 }: Props) {
  const [visibleIcons, setVisibleIcons] = useState<number>(pageSize);
  const { contextRef } = useCanvasContext();

  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const setUserMode = useUserMode((state) => state.setUserMode);
  const iconEntriesToRender = iconEntries.slice(0, visibleIcons);

  const hasMore = visibleIcons <= iconEntriesToRender.length;

  const appendImageObject = useCanvasObjects((state) => state.appendImageObject);

  const pushImageObject = async ({ imageUrl, imageElement, dimensions }: OptionItem) => {
    const createdObjectId = generateUniqueId();
    appendImageObject({
      id: createdObjectId,
      x: 0,
      y: 0,
      width: dimensions.width,
      height: dimensions.height,
      opacity: 100,
      imageUrl,
      imageElement,
    });
    setActiveObjectId(createdObjectId);
    setUserMode('select');
  };

  const commonPushImageObject = async (url: string) => {
    const imageElement = await getImageElementFromUrl(url);
    const dimensions = await getDimensionsFromImage({
      context: contextRef?.current,
      imageObject: { x: 0, y: 0, imageElement },
    });
    pushImageObject({ imageUrl: url, imageElement, dimensions });
  };

  useEffect(() => {
    setVisibleIcons(pageSize);
  }, [pageSize]);

  return (
    <>
      {iconEntriesToRender.length > 0 ? (
        <>
          <GridDiv>
            {iconEntriesToRender.map(([key, src]) => (
              <Tooltip key={key} position="bottom" withArrow label={key}>
                <ActionIcon
                  sx={{ width: '100%' }}
                  size="xl"
                  onClick={() => {
                    commonPushImageObject(src);
                  }}
                >
                  <img src={src} style={{ width: '100%', height: '100%' }} />
                </ActionIcon>
              </Tooltip>
            ))}
          </GridDiv>
          {hasMore && (
            <Button
              leftIcon={<aiIcons.AiOutlineDown style={{ transform: 'translateY(1px)' }} />}
              variant="default"
              size="xs"
              onClick={() => {
                setVisibleIcons((prevVisibleIcons) => prevVisibleIcons + pageSize);
              }}
            >
              Load more icons
            </Button>
          )}
        </>
      ) : (
        <>
          <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: '0.6rem' }}>No results found.</p>
        </>
      )}
    </>
  );
}
