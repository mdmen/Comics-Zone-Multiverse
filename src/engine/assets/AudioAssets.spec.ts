import { AudioAssets } from './AudioAssets';
import firstSound from 'firstSound.mp3';
import secondSound from 'secondSound.mp3';
import spriteSound from 'spriteSound.mp3';

const sources = {
  firstSound,
  secondSound,
  spriteSound: {
    src: spriteSound,
    data: 'spriteSound.json',
  },
};

interface SpriteSoundAsset {
  buffer: ArrayBuffer;
  data: Record<string, unknown>;
}

describe('Audio assets (engine)', () => {
  test('Should load audio assets', async () => {
    const assets = new AudioAssets(sources);
    const soundAssets = await assets.load();

    expect(soundAssets.firstSound).toBeInstanceOf(ArrayBuffer);
    expect(soundAssets.secondSound).toBeInstanceOf(ArrayBuffer);

    const spriteSound = soundAssets.spriteSound as unknown as SpriteSoundAsset;
    expect(spriteSound.buffer).toBeInstanceOf(ArrayBuffer);
    expect(spriteSound.data).toHaveProperty('test');
  });
});
