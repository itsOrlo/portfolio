'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Evitar error de hidratación
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={`${styles.pill} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logoGroup}>
          <div className={styles.logoRing}>
            <div className={styles.logoInner}>OM</div>
          </div>
        </Link>
        
        <div className={styles.divider} />
        
        <div className={styles.links}>
          <Link href="#home" className={styles.link}>{t('home')}</Link>
          <Link href="#experience" className={styles.link}>{t('experience')}</Link>
          <Link href="#work" className={styles.link}>{t('work')}</Link>
          <Link href="#about" className={styles.link}>{t('about')}</Link>
        </div>

        <div className={styles.divider} />

        {mounted && (
          <div className={styles.toggles}>
            <button 
              onClick={toggleLanguage}
              className={styles.themeToggle}
              aria-label="Cambiar idioma"
            >
              <Languages size={18} />
              <span style={{ fontSize: '0.7rem', fontWeight: 'bold', marginLeft: '2px' }}>
                {locale === 'es' ? 'EN' : 'ES'}
              </span>
            </button>
            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle}
              aria-label={t('themeToggle')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        )}

        <div className={styles.divider} />

        <Link href="#contact" className={styles.sayHi}>
          <span className={styles.sayHiInner}>
            {t('contact')}
          </span>
          <span className={styles.sayHiBg} />
        </Link>
      </div>
    </nav>
  );
}
