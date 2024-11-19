import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import styled from 'styled-components';

import useCanvasObjects from '~/store/useCanvasObjects';

import { H4 } from '../../commonTabComponents';

const CanvasSizeGridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

interface Props {
  closeModal: () => void;
}

export default function MenuTabSaveArts({ closeModal }: Props) {
  const [artName, setArtName] = useState<string>('Art name');
  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const saveArts = function () {
    console.log(artName, canvasObjects);
  };

  const handleChangeArtName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtName(event.target.value);
  };

  return (
    <>
      <H4>Arts information</H4>
      <CanvasSizeGridDiv>
        <TextInput label="Name" value={artName} onChange={handleChangeArtName} />
      </CanvasSizeGridDiv>
      <Button
        size="xs"
        variant="default"
        leftIcon={<FaSave />}
        onClick={() => {
          saveArts();
          closeModal();
        }}
      >
        Save
      </Button>
    </>
  );
}
