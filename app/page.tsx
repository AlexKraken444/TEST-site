'use client';

import { useEffect, useRef, useState } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!canvas || reduceMotion || touchDevice) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    let targetX = width / 2;
    let targetY = height / 2;
    let lensX = targetX;
    let lensY = targetY;
    let animationFrame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const move = (event: PointerEvent) => { targetX = event.clientX; targetY = event.clientY; };
    const warp = (x: number, y: number) => {
      const dx = x - lensX;
      const dy = y - lensY;
      const distance = Math.hypot(dx, dy);
      const radius = Math.min(310, width * 0.28);
      if (distance >= radius) return [x, y] as const;
      const normalized = distance / radius;
      const magnification = 1 + 0.72 * Math.pow(1 - normalized * normalized, 2);
      return [lensX + dx * magnification, lensY + dy * magnification] as const;
    };

    const draw = () => {
      lensX += (targetX - lensX) * 0.14;
      lensY += (targetY - lensY) * 0.14;
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(lensX, lensY, 0, lensX, lensY, 340);
      glow.addColorStop(0, 'rgba(225,42,32,.18)');
      glow.addColorStop(.45, 'rgba(225,42,32,.06)');
      glow.addColorStop(1, 'rgba(225,42,32,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(255,255,255,.12)';
      context.lineWidth = 1;
      const spacing = 74;
      const step = 9;
      for (let x = -spacing; x <= width + spacing; x += spacing) {
        context.beginPath();
        for (let y = -step; y <= height + step; y += step) {
          const point = warp(x, y);
          if (y === -step) context.moveTo(point[0], point[1]); else context.lineTo(point[0], point[1]);
        }
        context.stroke();
      }
      for (let y = -spacing; y <= height + spacing; y += spacing) {
        context.beginPath();
        for (let x = -step; x <= width + step; x += step) {
          const point = warp(x, y);
          if (x === -step) context.moveTo(point[0], point[1]); else context.lineTo(point[0], point[1]);
        }
        context.stroke();
      }
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main>
      <canvas ref={canvasRef} className="fisheye-background" aria-hidden="true" />
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
