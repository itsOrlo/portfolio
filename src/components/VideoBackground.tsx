'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import styles from './VideoBackground.module.css';

export default function VideoBackground({ url, inverted = false }: { url: string, inverted?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    }
  }, [url]);

  return (
    <div className={`${styles.videoContainer} ${inverted ? styles.inverted : ''}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
      />
      <div className={styles.overlay} />
    </div>
  );
}
