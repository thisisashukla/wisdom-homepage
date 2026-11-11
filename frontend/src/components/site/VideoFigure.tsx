'use client'

/**
 * A Wisdom YouTube video inside an article, framed like the blogs' header image
 * (rounded card, gold hairline border, italic caption strip). Shows the thumbnail until
 * the reader presses play, so no YouTube script loads before then; the player is the
 * privacy-enhanced (youtube-nocookie) embed. Renders VideoObject schema from lib/videos.ts.
 * Event: Video Played { item_id, item_type: 'video', location }.
 */

import { useState } from 'react'
import { EVENTS } from '@/lib/analytics/events'
import { trackEvent } from '@/lib/mixpanel'
import { VIDEOS, type VideoKey, videoLd, youtubeEmbedUrl, youtubeThumb, youtubeWatchUrl } from '@/lib/videos'
import JsonLd from './JsonLd'
import './site.css'

export type VideoFigureProps = {
  video: VideoKey
  /** Where on the page the video sits, for analytics ("theme_overthinking_intro") */
  location: string
  /** Overrides the caption in lib/videos.ts */
  caption?: string
  /** VideoObject JSON-LD; turn off if the page already lists this video */
  ld?: boolean
  /** Load the thumbnail eagerly when the video sits near the top of the page */
  priority?: boolean
  className?: string
}

export default function VideoFigure({ video, location, caption, ld = true, priority = false, className }: VideoFigureProps) {
  const v = VIDEOS[video]
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    trackEvent(EVENTS.VideoPlayed, { item_id: v.id, item_type: 'video', location })
  }

  return (
    <figure className={['sx-video', className].filter(Boolean).join(' ')}>
      <div className="sx-video-frame">
        {playing ? (
          <iframe
            src={youtubeEmbedUrl(v.id)}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="sx-video-play" onClick={play} aria-label={`Play video: ${v.title}`}>
            <img src={youtubeThumb(v.id)} alt="" width={1280} height={720} loading={priority ? 'eager' : 'lazy'} decoding="async" />
            <span className="sx-video-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <span>{caption ?? v.caption}</span>
        <a href={youtubeWatchUrl(v.id)} target="_blank" rel="noopener" data-mp-location={`${location}_youtube`}>
          YouTube ↗
        </a>
      </figcaption>
      {ld && <JsonLd data={videoLd(v)} />}
    </figure>
  )
}
