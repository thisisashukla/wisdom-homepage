/**
 * Wisdom's own YouTube videos, one entry each. Pages embed one with
 * <VideoFigure video="overthinking" location="..." /> (components/site), which renders the
 * thumbnail, the player, the caption and the VideoObject schema from the entry here.
 */

export type Video = {
  /** YouTube video id */
  id: string
  title: string
  /** Schema description: what the viewer will feel or take away */
  description: string
  /** ISO 8601 */
  uploadDate: string
  /** ISO 8601 duration */
  duration: string
  /** Figure caption under the player */
  caption: string
}

export const VIDEOS = {
  overthinking: {
    id: 'gQNhD4W8hHY',
    title: "Why You Can't Stop Overthinking (And What Krishna Told Arjuna)",
    description:
      'Arjuna tells Krishna his mind is as hard to hold as the wind, and Krishna agrees with him. Sit with Gita 6.34, 6.35 and 6.5, Hanuman on his worst night in Lanka, and five small practices to try tonight when the thoughts will not stop.',
    uploadDate: '2026-11-09T05:10:28-08:00',
    duration: 'PT11M15S',
    caption: "Watch: why you can't stop overthinking, and what Krishna told Arjuna",
  },
} satisfies Record<string, Video>

export type VideoKey = keyof typeof VIDEOS

/** Theme plan slug -> the video shown on /gita-for/<slug>. */
export const THEME_VIDEO: Partial<Record<string, VideoKey>> = {
  overthinking: 'overthinking',
}

export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`
export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`
export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`

export const videoLd = (v: Video) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: v.title,
  description: v.description,
  thumbnailUrl: [youtubeThumb(v.id), `https://i.ytimg.com/vi_webp/${v.id}/hqdefault.webp`],
  uploadDate: v.uploadDate,
  duration: v.duration,
  contentUrl: youtubeWatchUrl(v.id),
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  inLanguage: 'en',
  publisher: { '@type': 'Organization', name: 'Wisdom', logo: { '@type': 'ImageObject', url: 'https://wisdomquotes.in/assets/new-light-logo.webp' } },
})
