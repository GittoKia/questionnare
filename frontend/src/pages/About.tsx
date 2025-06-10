import '../styles/About.scss'

const AboutPage = () => (
  <main className="about">
    {/* hero */}
    <section className="about__hero">
      <h1>Your online study guide</h1>
      <p>
        This site lets you create, share, and master topic‑based quizzes
        in minutes. Whether you’re a teacher curating lessons or a
        student drilling flash‑cards, everything you need lives here —
        free, private, and cross‑device.
      </p>
    </section>

    {/* feature cards */}
    <section className="about__features">
      <article className="feature">
        <h3>Build quizzes fast</h3>
        <p>
          Markdown‑friendly editor, bulk true/false creation, and an
          intuitive slider to set question counts. All changes save to
          the cloud instantly.
        </p>
      </article>

      <article className="feature">
        <h3>Study anywhere</h3>
        <p>
          Responsive design, offline cache, and zero‑install PWA
          support mean your practice sessions follow you on phone,
          tablet, or desktop.
        </p>
      </article>

      <article className="feature">
        <h3>Track your progress</h3>
        <p>
          Completed quizzes store scores locally and in your profile so
          you can revisit weak topics and celebrate improvements.
        </p>
      </article>

      
    </section>

    {/* team / tech blurb */}
    <section className="about__team">
      
      <h2>
        Have feedback or want to help? Write an Email
        us via the Contact page — every message will be read.
      </h2>
    </section>
  </main>
);

export default AboutPage;
