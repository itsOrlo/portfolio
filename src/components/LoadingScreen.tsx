'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const t = useTranslations('Loading');
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = t.raw('words') as string[];

  useEffect(() => {
    const duration = 2700;
    const interval = 27;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => {
      clearInterval(timer);
      clearInterval(wordTimer);
    };
  }, [onComplete, words.length]);

  return (
    <div className={styles.loadingScreen}>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={styles.label}
      >
        {t('label')}
      </motion.div>

      <div className={styles.center}>
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -20, opacity: 0 }}
            className={styles.word}
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.bottomRight}>
        <div className={styles.counter}>
          {Math.floor(count).toString().padStart(3, "0")}
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <motion.div 
          className={styles.progressBar}
          style={{ scaleX: count / 100 }}
        />
      </div>
    </div>
  );
}
