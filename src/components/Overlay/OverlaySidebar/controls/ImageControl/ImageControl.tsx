import { Input, Button, Tooltip, Group, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React, { useRef, useState } from 'react';
import { BsImage, BsX } from 'react-icons/bs';
import { FaPlus, FaUpload } from 'react-icons/fa';
import styled from 'styled-components';

import ControlHeader from '~/components/Overlay/OverlaySidebar/components/ControlHeader';
import useCanvasContext from '~/context/useCanvasContext';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useUserMode from '~/store/useUserMode';
import fileToBase64 from '~/utils/fileToBase64';
import generateUniqueId from '~/utils/generateUniqueId';
import getDimensionsFromImage from '~/utils/getDimensionsFromImage';
import getImageElementFromUrl from '~/utils/getImageElementFromUrl';
import notification from '~/utils/notification';

const ImageUrlForm = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, auto);
  grid-gap: 5px;
`;

export default function ImageControl() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { contextRef } = useCanvasContext();

  const imageUrlInputRef = useRef<HTMLInputElement>(null);

  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const setUserMode = useUserMode((state) => state.setUserMode);

  const appendImageObject = useCanvasObjects((state) => state.appendImageObject);

  const pushImageObject = async ({ imageUrl, imageElement, dimensions }: OptionItem) => {
    setImageUrl(imageUrl);
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

  return (
    <>
      <Dropzone
        sx={{ marginBottom: '1rem' }}
        accept={IMAGE_MIME_TYPE}
        maxSize={5000000} // 5 mb?
        maxFiles={1}
        multiple={false}
        loading={isLoading}
        onDrop={async (files) => {
          setIsLoading(true);
          try {
            const base64 = await fileToBase64(files[0]);
            if (base64) {
              commonPushImageObject(base64);
            }
          } catch (error) {
            console.error(error);
            notification.error({
              message: (error as Error)?.message,
            });
          }
          setIsLoading(false);
        }}
        onReject={(files) => {
          const message = `Rejected ${files.length} files.`;
          console.error(message, { files });
          notification.error({
            message,
          });
        }}
      >
        <Group position="center" spacing="xs" style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <FaUpload size="3.2rem" style={{ opacity: 0.35 }} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <BsX size="3.2rem" style={{ opacity: 0.35 }} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <BsImage size="3.2rem" style={{ opacity: 0.35 }} />
          </Dropzone.Idle>

          <div>
            <Text size="lg" inline align="center" style={{ opacity: 0.8 }}>
              Drag an image here or click to select a file
            </Text>
            <Text size="sm" inline mt={7} p={3} align="center" style={{ opacity: 0.8 }}>
              File should not exceed 5 MB
            </Text>
          </div>
        </Group>
      </Dropzone>
      <ControlHeader title="Image URL" />
      <ImageUrlForm
        onSubmit={async (event) => {
          event.preventDefault();
          if (imageUrl) {
            setIsLoading(true);
            commonPushImageObject(imageUrl);
            setIsLoading(false);
          } else {
            imageUrlInputRef.current?.focus();
          }
        }}
      >
        <Input
          ref={imageUrlInputRef}
          size="xs"
          placeholder="URL"
          value={imageUrl}
          onChange={(event) => {
            setImageUrl(event.currentTarget.value);
          }}
          sx={{ marginBottom: 10 }}
          disabled={isLoading}
        />
        <Tooltip label="Add">
          <Button type="submit" size="xs" variant="default" disabled={isLoading}>
            <FaPlus />
          </Button>
        </Tooltip>
      </ImageUrlForm>
    </>
  );
}
