/**
 * Registers <model-viewer> and points it at the Meshopt decoder
 * for compressed GLB assets.
 */
export default defineNuxtPlugin(async () => {
  if (import.meta.server) return

  await import('@google/model-viewer')

  const ModelViewerElement = await customElements.whenDefined('model-viewer')
  // @ts-expect-error static config on model-viewer custom element
  ModelViewerElement.meshoptDecoderLocation = '/meshopt_decoder.js'
})
