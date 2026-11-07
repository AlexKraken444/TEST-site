'use client';

import { useEffect, useRef, useState } from 'react';

const gameUrl = 'https://gamejolt.com/games/test/1018154';

const copy = {
  ru: {
    homeLabel: 'TEST, в начало страницы', navLabel: 'Основная навигация',
    about: 'Об игре и обо мне', principalNav: 'Директор', game: 'Сама игра',
    lead: 'Всё имеет смысл. Ничего не имеет смысла.', scroll: 'Смотреть ниже',
    trailer: 'Трейлер', trailerSoon: 'Трейлер скоро появится', trailerStatus: 'Видео находится в разработке',
    gameLabel: '02 / ОБ ИГРЕ', gameHeading: 'Об игре',
    gameText: <>Просто игра про русскую школу!<br />Без какого-либо сюжета верно?<br /><strong>Верно..?</strong></>,
    authorLabel: '03 / АВТОР', authorHeading: 'Обо мне',
    authorText: <>Мне 12 лет учусь и<br />проживаю в России.<br />Люблю игры.</>,
    top: 'Наверх',
    logoAlt: 'Логотип игры TEST', languageLabel: 'Выбор языка',
  },
  en: {
    homeLabel: 'TEST, back to top', navLabel: 'Main navigation',
    about: 'About game&me', principalNav: 'Principal', game: 'Play the game',
    lead: 'Everything makes sense. Nothing makes sense.', scroll: 'Scroll down',
    trailer: 'Trailer', trailerSoon: 'Trailer coming soon', trailerStatus: 'The video is in development',
    gameLabel: '02 / ABOUT THE GAME', gameHeading: 'About the game',
    gameText: <>Just a game about a Russian school!<br />With no story whatsoever, right?<br /><strong>Right..?</strong></>,
    authorLabel: '03 / CREATOR', authorHeading: 'About me',
    authorText: <>I am 12 years old, I study and<br />live in Russia.<br />I love games.</>,
    top: 'Back to top',
    logoAlt: 'TEST game logo', languageLabel: 'Choose language',
  },
} as const;

const principalCopy = {
  ru: {
    label: '04 / ПЕРСОНАЖ',
    title: 'ДИРЕКТОР',
    subtitle: 'Один из главных персонажей',
    intro: ['Гроза всей школы!', 'ТОТ КТО НИКОГДА НЕ ЗАТЫКАЕТСЯ!', 'ВЕЛИКИЙ И НЕПОБЕДИМЫЙ…', 'ДИИИИРЕКТОР!!!'],
    interview: 'И сегодня мы смогли взять у него интервью!',
    imageAlt: 'Персонаж Директор',
    dialogue: [
      { speaker: 'interviewer', text: 'Директор?' },
      { speaker: 'principal', text: 'Да я вас слушаю.' },
      { speaker: 'interviewer', text: 'Для начала прошу вас ответить, чем вы\nлюбите заниматься в свободное время?' },
      { speaker: 'principal', text: 'ХАХАХАХАХАХА! ЭТО КАКАЯ-ТО ШУТКА?\nУ МЕНЯ НЕТ СВОБОДНОГО ВРЕМЕНИ!!\nМНЕ НУЖНО ГОВОРИТЬ!!! ИНАЧЕ…' },
      { speaker: 'interviewer', text: 'Спасибо что ответили! Пожалуй-ка мы закончим интервью…' },
      { speaker: 'principal', text: 'ЕСЛИ Я БЫ МОГ Я БЫ СЖЁГ ТВОЙ ДОМ ДОТЛА И СМОТРЕЛ БЫ КАК ТЫ СГОРАЕШЬ В НЁМ ЖАЛКИЙ ЧЕЛОВЕК!!!\nХАХАХАХА\nСКОРО!!! К НАМ ПРИЕДУТ С ТВ!\nОЗЕРО...' },
      { speaker: 'interviewer', text: 'Так, вот это уже было лишним!' },
      { speaker: 'principal', text: 'ЛИШНИМ? ТВОЕ СУЩЕСТВОВАНИЕ БЫЛО ЛИШНИМ!!! ТЫ ХОТЬ ЗНАЕШЬ, ЧТО Я ВСЕХ ОБЕРЕГАЮ ОТ ОПАСНОСТИ УРОВНЯ КОНЦА СВЕТА???' },
      { speaker: 'interviewer', text: 'В-всем пока! Конец интервью!!!' },
    ],
  },
  en: {
    label: '04 / CHARACTER',
    title: 'THE PRINCIPAL',
    subtitle: 'One of the main characters',
    intro: ['The terror of the entire school!', 'THE ONE WHO NEVER STOPS TALKING!', 'THE GREAT AND UNDEFEATED…', 'THE PRIIIIINCIPAL!!!'],
    interview: 'And today we managed to interview him!',
    imageAlt: 'The Principal character',
    dialogue: [
      { speaker: 'interviewer', text: 'Principal?' },
      { speaker: 'principal', text: 'Yes, I am listening.' },
      { speaker: 'interviewer', text: 'First, please tell us what you like to do\nin your free time?' },
      { speaker: 'principal', text: 'HAHAHAHAHAHA! IS THIS SOME KIND OF JOKE?\nI HAVE NO FREE TIME!!\nI NEED TO TALK!!! OTHERWISE…' },
      { speaker: 'interviewer', text: 'Thank you for answering! I think we should end the interview…' },
      { speaker: 'principal', text: 'IF I COULD, I WOULD BURN YOUR HOUSE TO THE GROUND AND WATCH YOU BURN INSIDE IT, YOU PATHETIC HUMAN!!!\nHAHAHAHA\nSOON!!! TV CREWS WILL COME TO US!\nTHE LAKE...' },
      { speaker: 'interviewer', text: 'Okay, that was already too much!' },
      { speaker: 'principal', text: 'TOO MUCH? YOUR EXISTENCE WAS TOO MUCH!!! DO YOU EVEN KNOW THAT I PROTECT EVERYONE FROM A DOOMSDAY-LEVEL THREAT???' },
      { speaker: 'interviewer', text: 'G-goodbye everyone! End of interview!!!' },
    ],
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<'ru' | 'en'>('en');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = copy[language];
  const principal = principalCopy[language];

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
      glow.addColorStop(0, 'rgba(199,53,43,.18)');
      glow.addColorStop(.45, 'rgba(199,53,43,.06)');
      glow.addColorStop(1, 'rgba(199,53,43,0)');
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
          <a href="#about-game">{t.about}</a>
          <a href="#principal">{t.principalNav}</a>
          <a className="play-link" href={gameUrl} target="_blank" rel="noreferrer">{t.game}</a>
        </nav>
        <div className="language-switch" role="group" aria-label={t.languageLabel}>
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>ENG</button>
          <span aria-hidden="true">/</span>
          <button className={language === 'ru' ? 'active' : ''} onClick={() => setLanguage('ru')} aria-pressed={language === 'ru'}>RUS</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <img className="main-logo" src="/test-logo.png" alt={t.logoAlt} />
        <p className="hero-lead">{t.lead}</p>
        <a className="scroll-cue" href="#trailer">{t.scroll}</a>
      </section>

      <section className="trailer-section reveal" id="trailer" aria-labelledby="trailer-title">
        <div className="section-label"><span>01</span><h2 id="trailer-title">{t.trailer}</h2></div>
        <div className="trailer-frame">
          <div className="play-button" aria-hidden="true" />
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

      <section className="principal-section" id="principal" aria-labelledby="principal-title">
        <div className="principal-portrait reveal reveal-left">
          <img src="/principal.png" alt={principal.imageAlt} />
          <span>{principal.subtitle}</span>
        </div>
        <div className="principal-copy reveal reveal-right">
          <div className="card-number">{principal.label}</div>
          <h2 id="principal-title">{principal.title}</h2>
          <div className="principal-intro">
            {principal.intro.map((line) => <p key={line}>{line}</p>)}
          </div>
          <p className="interview-lead">{principal.interview}</p>
          <div className="dialogue">
            {principal.dialogue.map((line, index) => (
              <p className={line.speaker === 'principal' ? 'principal-line' : 'interviewer-line'} key={`${line.speaker}-${index}`}>
                <span aria-hidden="true">-</span>{line.text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <footer className="reveal">
        <img src="/test-logo.png" alt="" aria-hidden="true" /><a href="#top">{t.top}</a>
      </footer>
    </main>
  );
}
