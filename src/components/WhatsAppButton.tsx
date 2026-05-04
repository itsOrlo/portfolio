'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const t = useTranslations('WhatsApp');
  const phoneNumber = "593960638900";
  const message = t('message');
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.whatsappBtn}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      <span className={styles.tooltip}>{t('tooltip')}</span>
    </motion.a>
  );
}
