import { ImageAssets } from './images/ImageAssets';
import firstImage from 'firstImage.webp';
import secondImage from 'secondImage.webp';
import spriteImage from 'spriteImage.webp';

const sources = {
  firstImage,
  secondImage,
  spriteImage: {
    src: spriteImage,
    data: 'spriteImage.json',
  },
};

interface SpriteImageAsset {
  image: HTMLImageElement;
  data: Record<string, unknown>;
}

describe('Image assets (engine)', () => {
  test('Should load image assets', async () => {
    const assets = new ImageAssets();
    const images = await assets.load(sources);

    expect(images.firstImage).toBeInstanceOf(Image);
    expect(images.secondImage).toBeInstanceOf(Image);

    const sprite = images.spriteImage as unknown as SpriteImageAsset;
    expect(sprite.image).toBeInstanceOf(Image);
    expect(sprite.data).toHaveProperty('test');
  });
});
