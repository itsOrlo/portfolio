'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.css';
import VideoBackground from './VideoBackground';

export default function Hero() {
  const t = useTranslations('Hero');
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = t.raw('roles.items') as string[];
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".name-reveal", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.2
    })
    .to(".blur-in", {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1,
      stagger: 0.1
    }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section id="home" className={styles.hero} ref={containerRef}>
      <VideoBackground url="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" />
      
      <div className={styles.content}>
        <div className={`${styles.eyebrow} blur-in`}>{t('eyebrow')}</div>
        
        <h1 className={`${styles.title} name-reveal`}>
          Orlidan <span className={styles.italic}>Montesdeoca</span>
        </h1>
        
        <div className={`${styles.roleLine} blur-in`}>
          {t('roles.prefix')} <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className={styles.role}
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence> {t('roles.suffix')}
        </div>

        <p className={`${styles.description} blur-in`}>
          {t('description')}
        </p>

        <div className={`${styles.actions} blur-in`}>
          <a href="#work" className={styles.primaryBtn}>{t('buttons.projects')}</a>
          <a href="/cv_orlo.pdf" download className={styles.secondaryBtn}>{t('buttons.cv')}</a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollLabel}>{t('scroll')}</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </div>
    </section>
  );
}
