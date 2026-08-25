'use client';

import { useEffect, useState } from 'react';

const gameUrl = 'https://gamejolt.com/games/test/1018154';

const copy = {
  ru: {
    homeLabel: 'TEST — в начало страницы', navLabel: 'Основная навигация',
    aboutGame: 'Об игре', aboutMe: 'Обо мне', game: 'Сама игра',
    lead: 'Обычная школа. Обычный день. Наверное.', scroll: 'Смотреть ниже',
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
    lead: 'An ordinary school. An ordinary day. Probably.', scroll: 'Scroll down',
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

  return (
    <main>
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

      <section className="trailer-section" id="trailer" aria-labelledby="trailer-title">
        <div className="section-label"><span>01</span><h2 id="trailer-title">{t.trailer}</h2></div>
        <div className="trailer-frame">
          <div className="play-button" aria-hidden="true">▶</div>
          <p>{t.trailerSoon}</p><span>{t.trailerStatus}</span>
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card" id="about-game">
          <div className="card-number">{t.gameLabel}</div><h2>{t.gameHeading}</h2><p>{t.gameText}</p>
        </article>
        <article className="info-card red-card" id="about-me">
          <div className="card-number">{t.authorLabel}</div><h2>{t.authorHeading}</h2><p>{t.authorText}</p>
        </article>
      </section>

      <section className="cta-section">
        <p>{t.lesson}</p><h2>{t.ready}</h2>
        <a href={gameUrl} target="_blank" rel="noreferrer">{t.openGame} <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <img src="/test-logo.png" alt="" aria-hidden="true" /><p>TEST © 2026</p><a href="#top">{t.top} ↑</a>
      </footer>
    </main>
  );
}
