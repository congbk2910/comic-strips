import packageJson from '~/../package.json';

const cleanUrl = 'flatdraw.pages.dev';

const metadata = {
  website: {
    name: 'Flatdraw',
    cleanUrl,
    url: `https://${cleanUrl}`,
    manifest: `https://${cleanUrl}/manifest.json`,
    locale: 'en',
    themeColor: '#FFFFFF',
    version: packageJson.version,
  },
};

export default metadata;
