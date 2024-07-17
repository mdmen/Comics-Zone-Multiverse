import { Loader } from './Loader';
import { loadData } from './loaders';

export class DataLoader extends Loader<typeof loadData> {
  constructor(manifest: Record<string, string>) {
    super(manifest, loadData);
  }
}
