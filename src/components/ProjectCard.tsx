'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ProjectModal from './ProjectModal';
import styles from './ProjectCard.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  features: string[];
  link: string;
  github: string;
}

export default function ProjectCard({ project, index }: { project: Project, index: number }) {
  const t = useTranslations('Work');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLarge = index === 0 || index === 3;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${styles.card} ${isLarge ? styles.large : styles.small}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles.imageWrapper}>
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className={styles.image}
          />
          <div className={styles.halftone} />
          
          <div className={styles.hoverOverlay}>
            <div className={styles.hoverContent}>
              <div className={styles.viewBadge}>
                {t('badge')} — <span className={styles.italic}>{project.title}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.tags}>
              {(project.tags || []).map((tag: string) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <h3 className={styles.title}>{project.title}</h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal 
            project={project} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
