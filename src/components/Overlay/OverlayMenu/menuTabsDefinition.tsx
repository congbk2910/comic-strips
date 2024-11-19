import type { ReactNode } from 'react';
import { BsImageFill, BsLayersFill } from 'react-icons/bs';
import { FaCloudDownloadAlt, FaCog, FaSave } from 'react-icons/fa';

export type MenuTabId = 'canvas' | 'layers' | 'download' | 'save_arts' | 'settings';

export const menuTabsDefinition: {
  id: MenuTabId;
  label: string;
  icon: ReactNode;
}[] = [
  {
    id: 'canvas',
    label: 'Canvas',
    icon: <BsImageFill />,
  },
  {
    id: 'download',
    label: 'Download',
    icon: <FaCloudDownloadAlt />,
  },
  {
    id: 'layers',
    label: 'Layers',
    icon: <BsLayersFill />,
  },
  {
    id: 'save_arts',
    label: 'Save Arts',
    icon: <FaSave />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <FaCog />,
  },
];
