'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import LoadingScreen from '@/components/LoadingScreen';
import VideoBackground from '@/components/VideoBackground';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import { Mail, User, Award, GraduationCap, Camera, Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();

  const skills = [
    "n8n (Experto)", "Python", "Docker", "Ollama", "GCP", 
    "Business Analysis", "Open Source", "Power BI", "SQL", 
    "LLMs (GPT, Claude, Qwen, Gemini)", "Flask", "RAGFlow"
  ];

  const education = {
    degree: "Ingeniero en Tecnologías de la Información",
    university: "Pontificia Universidad Católica del Ecuador",
    period: "2020 - 2025"
  };

  // Traer items traducidos
  const experienceItems = t.raw('Experience.items') as {
    id: number;
    company: string;
    position: string;
    period: string;
    description: string;
    achievements: string[];
  }[];
  const certificationItems = t.raw('Certifications.items') as {
    title: string;
    issuer: string;
    year: string;
  }[];
  const projectItems = t.raw('Work.items') as {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    features: string[];
  }[];

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <main className={styles.main}>
        <Navbar />
        <WhatsAppButton />
        
        <Hero />
        
        {/* About Section */}
        <section id="about" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutText}>
                <div className={styles.eyebrowGroup}>
                  <div className={styles.eyebrowLine} />
                  <span className={styles.eyebrow}>{t('About.eyebrow')}</span>
                </div>
                <h2 className={styles.sectionTitle}>
                  {t.rich('About.title', {
                    technology: (chunks) => <span className={styles.italic}>{chunks}</span>,
                    automation: (chunks) => <span className={styles.italic}>{chunks}</span>
                  })}
                </h2>
                <div className={styles.educationHighlight}>
                  <GraduationCap size={20} className={styles.eduIcon} />
                  <span>{education.degree} — <span className={styles.eduUni}>{education.university}</span></span>
                </div>
                <p className={styles.description}>
                  {t('About.description')}
                </p>
                <div className={styles.skillsList}>
                  {skills.map(skill => (
                    <span key={skill} className={styles.skillBadge}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.aboutVisual}>
                <div className={styles.imageContainer}>
                  <Image 
                    src="/orlo_perfil.png" 
                    alt="Orlidan Perfil" 
                    width={500} 
                    height={610} 
                    className={styles.profileImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.eyebrowGroup}>
                <div className={styles.eyebrowLine} />
                <span className={styles.eyebrow}>{t('Experience.eyebrow')}</span>
              </div>
              <h2 className={styles.sectionTitle}>
                {t.rich('Experience.title', {
                  italic: (chunks) => <span className={styles.italic}>{chunks}</span>
                })}
              </h2>
            </div>

            <div className={styles.experienceGrid}>
              {experienceItems.map((exp) => (
                <div key={exp.id} className={styles.expCard}>
                  <div className={styles.expHeader}>
                    <div className={styles.expMain}>
                      {/* Los logos y URLs siguen siendo los mismos, solo el texto cambia */}
                      <div className={styles.expLogo}>
                        <Image 
                          src={exp.id === 0 ? "https://instagram.fuio32-1.fna.fbcdn.net/v/t51.82787-19/567194002_17846524596589253_7149382359242784808_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41MDAuYzIifQ&_nc_ht=instagram.fuio32-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2gFI3-sTMND8iFhgf6nOMD0yToDQ_oCNEDn7KFmKGdCxoC8Yi-JmtABbLXdKUtBGtvQ&_nc_ohc=2eYGgzpQoLsQ7kNvwFSpgLq&_nc_gid=00ASc5nYOypA8b9MhoTX7Q&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af7mGJRzglMGkKbb6gcCYaAxF4pHiT6RP3tnztSylRr99g&oe=69FDA7B7&_nc_sid=7a9f4b" : 
                               exp.id === 1 ? "https://media.licdn.com/dms/image/v2/D4E0BAQFo8pRcOJ4f5g/company-logo_200_200/company-logo_200_200/0/1694560205175?e=1779321600&v=beta&t=kDkjKXKx0jeo6C5ZMX-uHmcGVKKurkxfohcNg9Bx9VM" :
                               exp.id === 2 ? "https://instagram.fuio32-1.fna.fbcdn.net/v/t51.82787-19/609164743_18033850085747698_7273659213367034856_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fuio32-1.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2gFMV-_3muITF0AYPXwuoeueyjXZ8ORRLU5pp2TH0veUtKGG-V944dzHQNUmTRpGkvM&_nc_ohc=rwnLnDS5racQ7kNvwGZ32ks&_nc_gid=0pd0u_1lThcpzAMdLLRoQA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af7hcu1Dy-Qr56XvZDUFuw9Z-QHGnHQhqtO7DCP02UF9bA&oe=69FDA69E&_nc_sid=7a9f4b" :
                               "https://instagram.fuio32-1.fna.fbcdn.net/v/t51.2885-19/343304685_762865905241982_712183844808859296_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fuio32-1.fna.fbcdn.net&_nc_cat=102&_nc_oc=Q6cZ2gG6n2KM2n8NkQOLKSBZOku_25VIJ1JCPoZqFce89UsuKtVZJzXbWUu8aCaSqjSdGSc&_nc_ohc=lxYH1vz5JHcQ7kNvwFWikHr&_nc_gid=VGLPRZMzK4cgGajNJ3-Beg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af5rmZl9TSJEWg-XsrbwAlVbn43KbV5E4xkKVELADcAQdQ&oe=69FDA79F&_nc_sid=7a9f4b"} 
                          alt={`${exp.company} logo`} 
                          width={50} 
                          height={50}
                          className={styles.logoImage}
                        />
                      </div>
                      <div>
                        <h3 className={styles.expCompany}>
                          {exp.id === 0 ? <a href="https://www.ionoshub.net/" target="_blank" rel="noopener noreferrer" className={styles.expCompanyLink}>{exp.company}</a> :
                           exp.id === 1 ? <a href="https://strattos.io/" target="_blank" rel="noopener noreferrer" className={styles.expCompanyLink}>{exp.company}</a> :
                           exp.id === 2 ? <a href="https://visionfund.ec/" target="_blank" rel="noopener noreferrer" className={styles.expCompanyLink}>{exp.company}</a> :
                           <a href="https://www.badiec.org/" target="_blank" rel="noopener noreferrer" className={styles.expCompanyLink}>{exp.company}</a>}
                        </h3>
                        <p className={styles.expPosition}>{exp.position}</p>
                      </div>
                    </div>
                    <span className={styles.expPeriod}>{exp.period}</span>
                  </div>
                  <p className={styles.expDescription}>{exp.description}</p>
                  <ul className={styles.expAchievements}>
                    {exp.achievements.map((achievement: string, i: number) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.eyebrowGroup}>
                <div className={styles.eyebrowLine} />
                <span className={styles.eyebrow}>{t('Certifications.eyebrow')}</span>
              </div>
              <h2 className={styles.sectionTitle}>
                {t.rich('Certifications.title', {
                  italic: (chunks) => <span className={styles.italic}>{chunks}</span>
                })}
              </h2>
            </div>

            <div className={styles.certsGrid}>
              {certificationItems.map((cert, index) => (
                <div key={index} className={styles.certCard}>
                  <div className={styles.certIcon}>
                    <Award size={32} />
                  </div>
                  <div className={styles.certContent}>
                    <h3 className={styles.certTitle}>{cert.title}</h3>
                    <p className={styles.certIssuer}>{cert.issuer}</p>
                    <span className={styles.certYear}>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.eyebrowGroup}>
                <div className={styles.eyebrowLine} />
                <span className={styles.eyebrow}>{t('Work.eyebrow')}</span>
              </div>
              <h2 className={styles.sectionTitle}>
                {t.rich('Work.title', {
                  italic: (chunks) => <span className={styles.italic}>{chunks}</span>
                })}
              </h2>
            </div>
            
            <div className={styles.bentoGrid}>
              {projectItems.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={{
                    ...project,
                    image: project.id === 1 ? "/n8n_gcp.svg" : 
                           project.id === 4 ? "/sistema_facturacion.svg" :
                           project.id === 2 ? "/dashboards.svg" :
                           "/portainer_if.svg",
                    link: "#",
                    github: "#"
                  }} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <VideoBackground 
            url="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8" 
            inverted 
          />
          <div className={styles.contactOverlay} />
          
          <div className={styles.container}>
            <div className={styles.marqueeWrapper}>
              <div className={styles.marquee}>
                {[...Array(10)].map((_, i) => (
                  <span key={i}>BUILDING THE FUTURE • </span>
                ))}
              </div>
            </div>

            <div className={styles.contactContent}>
              <h2 className={styles.contactTitle}>
                {t.rich('Contact.title', {
                  italic: (chunks) => <span className={styles.italic}>{chunks}</span>
                })}
              </h2>
              
              <ContactForm />
              
              <div className={styles.footerLinks}>
                <div className={styles.socials}>
                  <a href="https://www.linkedin.com/in/orlidan-montesdeoca/" target="_blank" rel="noopener noreferrer">
                    <User size={20} /> LinkedIn
                  </a>
                  <a href="https://github.com/itsOrlo" target="_blank" rel="noopener noreferrer">
                    <Code size={20} /> GitHub
                  </a>
                  <a href="https://www.instagram.com/its.or.lo/" target="_blank" rel="noopener noreferrer">
                    <Camera size={20} /> Instagram
                  </a>
                  <a href="mailto:orlidan.montesdeoca@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail size={20} /> Email
                  </a>
                </div>
                <div className={styles.availability}>
                  <div className={styles.pulseDot} />
                  {t('Contact.footer.availability')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
