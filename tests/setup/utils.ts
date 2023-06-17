import fs from 'fs';
import path from 'path';

export function getPageBody(): string {
  const pagePath = path.resolve(__dirname, '../../src/index.html');
  const page = fs.readFileSync(pagePath).toString('utf8');
  const [content = ''] = page.match(/<body>(.*?)<\/body>/gis) || [];

  return content;
}
