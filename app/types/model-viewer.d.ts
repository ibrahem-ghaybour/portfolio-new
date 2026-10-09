import type { DefineComponent } from 'vue'

declare module 'vue' {
  export interface GlobalComponents {
    'model-viewer': DefineComponent<
      {
        src?: string
        alt?: string
        poster?: string
        'camera-controls'?: boolean | string
        'auto-rotate'?: boolean | string
        'auto-rotate-delay'?: string | number
        'rotation-per-second'?: string
        'shadow-intensity'?: string | number
        exposure?: string | number
        'environment-image'?: string
        'interaction-prompt'?: string
        'touch-action'?: string
        loading?: 'auto' | 'lazy' | 'eager'
        reveal?: 'auto' | 'interaction' | 'manual'
      },
      object,
      object
    >
  }
}

export {}
