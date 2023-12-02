import { ImageFontAssets } from './ImageFontAssets';
import fontImage from 'firstImage.webp';

const sources = {
  font: {
    src: fontImage,
    data: 'font_glyphs.json',
  },
};

interface ImageFontAsset {
  image: HTMLImageElement;
  data: Record<string, unknown>;
}

describe('Font assets (engine)', () => {
  test('Should load font assets', async () => {
    const assets = new ImageFontAssets();
    const fonts = await assets.load(sources);

    const font = fonts.font as unknown as ImageFontAsset;
    expect(font.image).toBeInstanceOf(Image);
    expect(font.data).toHaveProperty('test');
  });
});
