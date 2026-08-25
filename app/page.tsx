'use client';

import { useEffect, useState } from 'react';

const gameUrl = 'https://gamejolt.com/games/test/1018154';

const copy = {
  ru: {
    homeLabel: 'TEST — в начало страницы', navLabel: 'Основная навигация',
    aboutGame: 'Об игре', aboutMe: 'Обо мне', game: 'Сама игра',
    lead: 'Всё имеет смысл. Ничего не имеет смысла.', scroll: 'Смотреть ниже',
    trailer: 'Трейлер', trailerSoon: 'Трейлер скоро появится', trailerStatus: 'Видео находится в разработке',
    gameLabel: '02 / ОБ ИГРЕ', gameHeading: <>Знакомый мир,<br />в котором что-то не так.</>,
    gameText: <>Просто игра про русскую школу!<br />Без какого-либо сюжета верно?<br /><strong>Верно..?</strong></>,
    authorLabel: '03 / АВТОР', authorHeading: 'Обо мне',
    authorText: <>Мне 12 лет учусь и<br />проживаю в России.<br />Люблю игры.</>,
    lesson: 'Урок уже начался.', ready: 'Готов войти в школу?', openGame: 'Открыть игру на Game Jolt', top: 'Наверх',
    logoAlt: 'Логотип игры TEST', languageLabel: 'Выбор языка',
  },
  en: {
    homeLabel: 'TEST — back to top', navLabel: 'Main navigation',
    aboutGame: 'About the game', aboutMe: 'About me', game: 'Play the game',
    lead: 'Everything makes sense. Nothing makes sense.', scroll: 'Scroll down',
    trailer: 'Trailer', trailerSoon: 'Trailer coming soon', trailerStatus: 'The video is in development',
    gameLabel: '02 / ABOUT THE GAME', gameHeading: <>A familiar world<br />where something feels wrong.</>,
    gameText: <>Just a game about a Russian school!<br />With no story whatsoever, right?<br /><strong>Right..?</strong></>,
    authorLabel: '03 / CREATOR', authorHeading: 'About me',
    authorText: <>I am 12 years old, I study and<br />live in Russia.<br />I love games.</>,
    lesson: 'Class has already begun.', ready: 'Ready to enter the school?', openGame: 'Open the game on Game Jolt', top: 'Back to top',
    logoAlt: 'TEST game logo', languageLabel: 'Choose language',
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const t = copy[language];

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal');
    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' },
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const trackPointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
        document.documentElement.style.setProperty('--mouse-rx', `${(event.clientY / window.innerHeight - 0.5) * -5}deg`);
        document.documentElement.style.setProperty('--mouse-ry', `${(event.clientX / window.innerWidth - 0.5) * 5}deg`);
      });
    };
    window.addEventListener('pointermove', trackPointer, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', trackPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <div className="cursor-distortion" aria-hidden="true" />
      <header className="site-header">
        <a className="mini-logo" href="#top" aria-label={t.homeLabel}>TEST</a>
        <nav aria-label={t.navLabel}>
          <a href="#about-game">{t.aboutGame}</a>
          <a href="#about-me">{t.aboutMe}</a>
          <a className="play-link" href={gameUrl} target="_blank" rel="noreferrer">{t.game} <span aria-hidden="true">↗</span></a>
        </nav>
        <div className="language-switch" role="group" aria-label={t.languageLabel}>
          <button className={language === 'ru' ? 'active' : ''} onClick={() => setLanguage('ru')} aria-pressed={language === 'ru'}>RU</button>
          <span aria-hidden="true">/</span>
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <img className="main-logo" src="/test-logo.png" alt={t.logoAlt} />
        <p className="hero-lead">{t.lead}</p>
        <a className="scroll-cue" href="#trailer">{t.scroll} <span aria-hidden="true">↓</span></a>
      </section>

      <section className="trailer-section reveal" id="trailer" aria-labelledby="trailer-title">
        <div className="section-label"><span>01</span><h2 id="trailer-title">{t.trailer}</h2></div>
        <div className="trailer-frame">
          <div className="play-button" aria-hidden="true">▶</div>
          <p>{t.trailerSoon}</p><span>{t.trailerStatus}</span>
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card reveal reveal-left" id="about-game">
          <div className="card-number">{t.gameLabel}</div><h2>{t.gameHeading}</h2><p>{t.gameText}</p>
        </article>
        <article className="info-card red-card reveal reveal-right" id="about-me">
          <div className="card-number">{t.authorLabel}</div><h2>{t.authorHeading}</h2><p>{t.authorText}</p>
        </article>
      </section>

      <section className="cta-section reveal">
        <p>{t.lesson}</p><h2>{t.ready}</h2>
        <a href={gameUrl} target="_blank" rel="noreferrer">{t.openGame} <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="reveal">
        <img src="/test-logo.png" alt="" aria-hidden="true" /><a href="#top">{t.top} ↑</a>
      </footer>
    </main>
  );
}
