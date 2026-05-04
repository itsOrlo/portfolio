'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ProjectModal.module.css';

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

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const t = useTranslations('Work.modal');
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.overlay}
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <X size={24} />
        </button>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            <Image 
              src={project.image} 
              alt={project.title} 
              width={800} 
              height={450} 
              className={styles.image}
            />
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.header}>
              <div className={styles.tags}>
                {(project.tags || []).map((tag: string) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <h2 className={styles.title}>{project.title}</h2>
            </div>

            <div className={styles.body}>
              <p className={styles.longDescription}>{project.longDescription}</p>
              
              <div className={styles.features}>
                <h3 className={styles.subTitle}>{t('keyPoints')}</h3>
                <ul className={styles.featuresList}>
                  {(project.features || []).map((feature: string, index: number) => (
                    <li key={index} className={styles.featureItem}>
                      <CheckCircle2 size={18} className={styles.featureIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.links}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.primaryLinkBtn}>
                  <ExternalLink size={20} /> {t('demo')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
