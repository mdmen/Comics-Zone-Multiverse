import { Settings } from '../Settings';

interface RenderScope {
  Layer: unknown;
  RectNode: unknown;
  EllipseNode: unknown;
  ImageNode: unknown;
  SpriteNode: unknown;
  TextNode: unknown;
}

const scopes: Record<string, RenderScope | null> = {
  webgl: null,
  webgpu: null,
  canvas: null,
  html: null,
};

export async function getRenderScope() {
  const settings = Settings.getInstance();

  switch (true) {
    case settings.isWebGLRenderEngine():
      scopes.webgl ||= await loadWebGLRenderScope();

      return scopes.webgl;

    case settings.isWebGPURenderEngine():
      scopes.webgpu ||= await loadWebGPURenderScope();

      return scopes.webgpu;

    case settings.isCanvasRenderEngine():
      scopes.canvas ||= await loadCanvasRenderScope();

      return scopes.canvas;

    case settings.isHTMLRenderEngine():
      scopes.html ||= await loadHTMLRenderScope();

      return scopes.html;

    default:
      throw Error('Unknown render scope');
  }
}

async function loadWebGLRenderScope(): Promise<RenderScope> {
  // WebGl as default renderer should be preloaded
  const scope = await import(/* webpackPreload: true */ './webgl');

  return {};
}

async function loadWebGPURenderScope(): Promise<RenderScope> {
  const scope = await import(/* webpackPrefetch: true */ './webgpu');

  return {};
}

async function loadCanvasRenderScope(): Promise<RenderScope> {
  const scope = await import(/* webpackPrefetch: true */ './canvas');

  return {
    Layer: scope.CanvasLayer,
    RectNode: scope.CanvasRectNode,
    ImageNode: scope.CanvasImageNode,
    SpriteNode: scope.CanvasSpriteNode,
    TextNode: scope.CanvasTextNode,
  };
}

async function loadHTMLRenderScope(): Promise<RenderScope> {
  const scope = await import(/* webpackPrefetch: true */ './html');

  return {
    Layer: scope.HTMLLayer,
    RectNode: scope.HTMLRectNode,
    ImageNode: scope.HTMLImageNode,
    SpriteNode: scope.HTMLSpriteNode,
    TextNode: scope.HTMLTextNode,
  };
}
