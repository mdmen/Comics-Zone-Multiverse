import { Loader } from './Loader';
import { loadAudio } from './loaders';

export class AudioLoader extends Loader<typeof loadAudio> {
  constructor(manifest: Record<string, string>) {
    super(manifest, loadAudio);
  }
}
