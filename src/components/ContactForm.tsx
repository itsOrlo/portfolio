'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const t = useTranslations('Contact.form');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showExtraMessage, setShowExtraMessage] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: t('subject.options.0'),
    mensaje: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mensaje: showExtraMessage ? formData.mensaje : 'Sin mensaje adicional',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.successMessage}
      >
        <CheckCircle2 size={64} className={styles.successIcon} />
        <h3>{t('success.title')}</h3>
        <p>{t('success.text')}</p>
        <button onClick={() => setStatus('idle')} className={styles.resetBtn}>{t('success.reset')}</button>
      </motion.div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          name="nombre"
          placeholder={t('name')} 
          required 
          className={styles.input}
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <input 
          type="email" 
          name="email"
          placeholder={t('email')} 
          required 
          className={styles.input}
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <select 
        name="asunto"
        className={styles.select}
        value={formData.asunto}
        onChange={handleInputChange}
        required
      >
        {(t.raw('subject.options') as string[]).map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <div className={styles.switchWrapper}>
        <label className={styles.switchLabel}>{t('extraMessage')}</label>
        <button 
          type="button"
          className={`${styles.switch} ${showExtraMessage ? styles.switchOn : ''}`}
          onClick={() => setShowExtraMessage(!showExtraMessage)}
        >
          <motion.div 
            className={styles.switchHandle}
            animate={{ x: showExtraMessage ? 24 : 0 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {showExtraMessage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.overflowHidden}
          >
            <textarea 
              name="mensaje"
              placeholder={t('messagePlaceholder')} 
              rows={4} 
              className={styles.textarea}
              value={formData.mensaje}
              onChange={handleInputChange}
              required={showExtraMessage}
            ></textarea>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={styles.submitBtn}
      >
        {status === 'sending' ? (
          t('sending')
        ) : (
          <>{t('submit')} <Send size={18} /></>
        )}
      </motion.button>
    </form>
  );
}
