import styles from "./header.module.css";
import FilmLogo from "../../../src/assets/img/FilmLogo.svg";
import { useEffect, useState } from "react";

interface Stats {
  total: number;
  watched: number;
  averageRating: number;
}

export function Header() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    watched: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/getFilms")
      .then((response) => response.json())
      .then((data: Stats) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(true)
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <img src={FilmLogo} alt="логотип сайта" className={styles.brandLogo} />
        <p className={styles.brandName}>Коллекция Фильмов</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsValueWrapper}>
          {loading ? (
            <div className={styles.statsValueSkeleton} />
          ) : (
            <p className={styles.statsValue}>{stats.total}</p>
          )}
          {loading ? (
            <div className={styles.statsLabelSkeleton} />
          ) : (
            <p className={styles.statsLabel}>Всего фильмов</p>
          )}
        </div>

        <div className={styles.statsValueWrapper}>
          {loading ? (
            <div className={styles.statsValueSkeleton} />
          ) : (
            <p className={styles.statsValue}>{stats.watched}</p>
          )}
          {loading ? (
            <div className={styles.statsLabelSkeleton} />
          ) : (
            <p className={styles.statsLabel}>Просмотрено</p>
          )}
        </div>

        <div className={styles.statsValueWrapper}>
          {loading ? (
            <div className={styles.statsValueSkeleton} />
          ) : (
            <p className={styles.statsValue}>{stats.averageRating}</p>
          )}
          {loading ? (
            <div className={styles.statsLabelSkeleton} />
          ) : (
            <p className={styles.statsLabel}>Средний рейтинг</p>
          )}
        </div>
      </div>
    </div>
  );
}
