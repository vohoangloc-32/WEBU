import './Home.css';
function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <span className="home__badge">Cooking cooking cooking</span>
        <h1 className="home__title">
          Wibu wibu wibu wibu wibu
          <br />
          wibu wibu wibu wibu wibu
        </h1>
        <p className="home__subtitle">
          Học lập trình theo lộ trình được cá nhân hoá — phù hợp với trình độ,
          mục tiêu và tốc độ của riêng bạn.
        </p>

        <div className="home__actions">
          <button className="home__btn home__btn--primary" type="button">
            Bắt đầu học
          </button>
          <button className="home__btn home__btn--ghost" type="button">
            Tìm hiểu thêm
          </button>
        </div>
      </section>

      <section className="home__features">
        <article className="feature">
          <div className="feature__icon">🧭</div>
          <h3>Lộ trình cá nhân hoá</h3>
          <p>
            Nhận lộ trình học phù hợp với trình độ và mục tiêu nghề nghiệp của
            bạn.
          </p>
        </article>

        <article className="feature">
          <div className="feature__icon">💻</div>
          <h3>Học qua thực hành</h3>
          <p>
            Thực hành trực tiếp với các bài tập code và dự án thực tế, có phản
            hồi chi tiết.
          </p>
        </article>

        <article className="feature">
          <div className="feature__icon">🤖</div>
          <h3>Trợ lý AI</h3>
          <p>
            Được hỗ trợ bởi AI để giải đáp thắc mắc và gợi ý bài học tiếp theo
            cho bạn.
          </p>
        </article>
      </section>

      <footer className="home__footer">
        <p>Yahooooooo</p>
      </footer>
    </main>
  );
}

export default Home;
