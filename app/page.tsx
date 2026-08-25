const gameUrl = "https://gamejolt.com/games/test/1018154";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="mini-logo" href="#top" aria-label="TEST — в начало страницы">TEST</a>
        <nav aria-label="Основная навигация">
          <a href="#about-game">Об игре</a>
          <a href="#about-me">Обо мне</a>
          <a className="play-link" href={gameUrl} target="_blank" rel="noreferrer">Сама игра <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <p className="eyebrow">Независимая игра · Россия</p>
        <img className="main-logo" src="/test-logo.png" alt="Логотип игры TEST" />
        <p className="hero-lead">Обычная школа. Обычный день. Наверное.</p>
        <a className="scroll-cue" href="#trailer">Смотреть ниже <span aria-hidden="true">↓</span></a>
      </section>

      <section className="trailer-section" id="trailer" aria-labelledby="trailer-title">
        <div className="section-label"><span>01</span><h2 id="trailer-title">Трейлер</h2></div>
        <div className="trailer-frame">
          <div className="play-button" aria-hidden="true">▶</div>
          <p>Трейлер скоро появится</p>
          <span>Видео находится в разработке</span>
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card" id="about-game">
          <div className="card-number">02 / ОБ ИГРЕ</div>
          <h2>Знакомый мир,<br />в котором что-то не так.</h2>
          <p>Просто игра про русскую школу!<br />Без какого-либо сюжета верно?<br /><strong>Верно..?</strong></p>
        </article>
        <article className="info-card red-card" id="about-me">
          <div className="card-number">03 / АВТОР</div>
          <h2>Обо мне</h2>
          <p>Мне 12 лет учусь и<br />проживаю в России.<br />Люблю игры.</p>
        </article>
      </section>

      <section className="cta-section">
        <p>Урок уже начался.</p>
        <h2>Готов войти в школу?</h2>
        <a href={gameUrl} target="_blank" rel="noreferrer">Открыть игру на Game Jolt <span aria-hidden="true">↗</span></a>
      </section>

      <footer>
        <img src="/test-logo.png" alt="" aria-hidden="true" />
        <p>TEST © 2026</p>
        <a href="#top">Наверх ↑</a>
      </footer>
    </main>
  );
}
