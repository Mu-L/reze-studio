import type { AnimationClip } from "reze-engine"

/** New / reset studio clips start here so transport + ruler work before any keys (30fps → 4s). */
export const DEFAULT_STUDIO_CLIP_FRAMES = 120

export function maxKeyframeFrameInClip(clip: AnimationClip): number {
  let m = 0
  for (const t of clip.boneTracks.values()) for (const k of t) m = Math.max(m, k.frame)
  for (const t of clip.morphTracks.values()) for (const k of t) m = Math.max(m, k.frame)
  return m
}

/** Keep export end ≥ last key; run after any key add/move/delete so duration never truncates content. */
export function clipAfterKeyframeEdit(clip: AnimationClip): AnimationClip {
  const lastKey = maxKeyframeFrameInClip(clip)
  return { ...clip, frameCount: Math.max(1, clip.frameCount, lastKey) }
}
