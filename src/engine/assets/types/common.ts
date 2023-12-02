export interface SpriteSource<Data> {
  url: string;
  // url during runtime, object type during development (for autocomplete)
  // see "resolveJsonModule" option in tsconfig.json
  data: Data;
}
