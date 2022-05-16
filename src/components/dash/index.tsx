import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';

interface Game {
  user: string;
  opponent: string;
  scoreUser: number;
  scoreOpponent: number;
}

export function Dash() {
  const [user, setUser] = useState<string>('');
  const [games, setGames] = useState<Game[] | null>(null);
  const [newGameForm, setNewGameForm] = useState(false);
  const opponent = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = localStorage.getItem('user#tictactoe');
    if (!getUser) {
      navigate('/');
      return;
    }
    const user = JSON.parse(getUser);
    setUser(user);

    const gamesLocal = localStorage.getItem(`games#${user}`) as string;
    const gamesParse: Game[] = JSON.parse(gamesLocal);
    if (gamesLocal && gamesParse.length > 0) {
      setGames(gamesParse);
    }
  }, []);

  const startGame = () => {
    const games = localStorage.getItem(`games#${user}`) as string;
    if (games) {
      let gamesParse: Game[] = JSON.parse(games);
      const idx = gamesParse.findIndex(
        (game: Game) =>
          game.user === user && game.opponent === opponent.current?.value
      );

      if (idx >= 0) {
        alert('This game alredy exists');
        return;
      } else {
        if (opponent.current?.value) {
          const newGame: Game = {
            user,
            opponent: opponent.current?.value,
            scoreUser: 0,
            scoreOpponent: 0
          };

          gamesParse.push(newGame);

          localStorage.setItem('game#tictactoe', JSON.stringify(newGame));
          navigate('/game');
        }
      }
    }

    if (opponent.current?.value) {
      const currentGame = {
        user,
        opponent: opponent.current?.value,
        scoreUser: 0,
        scoreOpponent: 0
      };

      localStorage.setItem('game#tictactoe', JSON.stringify(currentGame));

      const gamesLocal = localStorage.getItem(`games#${user}`) as string;
      if (gamesLocal) {
        let gamesParse: Game[] = JSON.parse(gamesLocal);
        gamesParse.push(currentGame);
        localStorage.setItem(`games#${user}`, JSON.stringify(gamesParse));
      } else {
        localStorage.setItem(`games#${user}`, JSON.stringify([currentGame]));
      }

      navigate('/game');
    }
  };

  const resumeGame = (game: Game) => {
    localStorage.setItem('game#tictactoe', JSON.stringify(game));
    navigate('/game');
  };

  const deleteGame = (index: number) => {
    const games = localStorage.getItem(`games#${user}`) as string;
    if (games) {
      let gamesParse: Game[] = JSON.parse(games);
      gamesParse.splice(index, 1);
      localStorage.setItem(`games#${user}`, JSON.stringify(gamesParse));
      setGames(gamesParse);
      updateLocalStorageGames();
    }
  };

  const updateLocalStorageGames = () => {
    const games = localStorage.getItem(`games#${user}`) as string;
    if (games) {
      let gamesParse: Game[] = JSON.parse(games);
      if (gamesParse.length === 0) {
        localStorage.removeItem(`games#${user}`);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('user#tictactoe');
    setUser('');
    navigate('/');
  };

  const enter = (e: any) => {
    if (e.key === 'Enter') {
      startGame();
    }
  };

  return (
    <div>
      <nav className={styles.profileBar}>
        <button className={styles.exit} onClick={() => logout()}>
          Logout
        </button>
        <button className={styles.button} onClick={() => setNewGameForm(true)}>
          +
        </button>
        <div>
          <span>
            {' '}
            {user.toLowerCase().charAt(0).toUpperCase() +
              user.substring(1)}{' '}
          </span>
        </div>
      </nav>

      <div>
        {newGameForm ? (
          <div className={styles.form}>
            <div className={styles.inputs}>
              <input
                autoFocus
                type="text"
                placeholder="Nome do competidor"
                ref={opponent}
                onKeyPress={(e: any) => enter(e)}
              />
            </div>
            <div className={styles.formNewGameButtons}>
              <button
                className={styles.button}
                onClick={() => setNewGameForm(false)}
              >
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 1.5L1.5 5.87062L6.5 10.8706"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <button className={styles.button} onClick={() => startGame()}>
                Jogar
              </button>
            </div>
          </div>
        ) : games && games?.length > 0 ? (
          <>
            <div className={styles.containerHistoryGames}>
              {games?.map((game: Game, index: number) => (
                <>
                  <div className={styles.cardHistoryGames} key={index}>
                    <div className={styles.gameCard}>
                      <div className={styles.user}>{game.user}</div>
                      <div className={styles.score}>{game.scoreUser}</div>
                      <div className={styles.score}>{game.scoreOpponent}</div>
                      <div className={styles.user}>{game.opponent}</div>
                    </div>
                    <div className={styles.actions}>
                      <div
                        className={styles.resumeGame}
                        onClick={() => resumeGame(game)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 50 57"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M42.525 28.1155L6.25 7.07178V49.1593L42.525 28.1155ZM47.475 23.7655C48.2413 24.2042 48.878 24.8376 49.3209 25.6014C49.7638 26.3653 49.997 27.2326 49.997 28.1155C49.997 28.9985 49.7638 29.8658 49.3209 30.6296C48.878 31.3935 48.2413 32.0268 47.475 32.4655L7.70625 55.5405C4.45625 57.428 0 55.2718 0 51.1905V5.04053C0 0.959279 4.45625 -1.19697 7.70625 0.690528L47.475 23.7655Z"
                            fill="white"
                          />
                        </svg>
                        Resume
                      </div>
                      <div
                        className={styles.deleteGame}
                        onClick={() => deleteGame(index)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 82 94"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.375 34.375C26.2038 34.375 26.9987 34.7042 27.5847 35.2903C28.1708 35.8763 28.5 36.6712 28.5 37.5V75C28.5 75.8288 28.1708 76.6237 27.5847 77.2097C26.9987 77.7958 26.2038 78.125 25.375 78.125C24.5462 78.125 23.7513 77.7958 23.1653 77.2097C22.5792 76.6237 22.25 75.8288 22.25 75V37.5C22.25 36.6712 22.5792 35.8763 23.1653 35.2903C23.7513 34.7042 24.5462 34.375 25.375 34.375V34.375ZM41 34.375C41.8288 34.375 42.6237 34.7042 43.2097 35.2903C43.7958 35.8763 44.125 36.6712 44.125 37.5V75C44.125 75.8288 43.7958 76.6237 43.2097 77.2097C42.6237 77.7958 41.8288 78.125 41 78.125C40.1712 78.125 39.3763 77.7958 38.7903 77.2097C38.2042 76.6237 37.875 75.8288 37.875 75V37.5C37.875 36.6712 38.2042 35.8763 38.7903 35.2903C39.3763 34.7042 40.1712 34.375 41 34.375V34.375ZM59.75 37.5C59.75 36.6712 59.4208 35.8763 58.8347 35.2903C58.2487 34.7042 57.4538 34.375 56.625 34.375C55.7962 34.375 55.0013 34.7042 54.4153 35.2903C53.8292 35.8763 53.5 36.6712 53.5 37.5V75C53.5 75.8288 53.8292 76.6237 54.4153 77.2097C55.0013 77.7958 55.7962 78.125 56.625 78.125C57.4538 78.125 58.2487 77.7958 58.8347 77.2097C59.4208 76.6237 59.75 75.8288 59.75 75V37.5Z"
                            fill="white"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M81.625 18.75C81.625 20.4076 80.9665 21.9973 79.7944 23.1694C78.6223 24.3415 77.0326 25 75.375 25H72.25V81.25C72.25 84.5652 70.933 87.7446 68.5888 90.0888C66.2446 92.433 63.0652 93.75 59.75 93.75H22.25C18.9348 93.75 15.7554 92.433 13.4112 90.0888C11.067 87.7446 9.75 84.5652 9.75 81.25V25H6.625C4.9674 25 3.37768 24.3415 2.20558 23.1694C1.03348 21.9973 0.375 20.4076 0.375 18.75V12.5C0.375 10.8424 1.03348 9.25268 2.20558 8.08058C3.37768 6.90848 4.9674 6.25 6.625 6.25H28.5C28.5 4.5924 29.1585 3.00269 30.3306 1.83058C31.5027 0.65848 33.0924 0 34.75 0L47.25 0C48.9076 0 50.4973 0.65848 51.6694 1.83058C52.8415 3.00269 53.5 4.5924 53.5 6.25H75.375C77.0326 6.25 78.6223 6.90848 79.7944 8.08058C80.9665 9.25268 81.625 10.8424 81.625 12.5V18.75ZM16.7375 25L16 25.3688V81.25C16 82.9076 16.6585 84.4973 17.8306 85.6694C19.0027 86.8415 20.5924 87.5 22.25 87.5H59.75C61.4076 87.5 62.9973 86.8415 64.1694 85.6694C65.3415 84.4973 66 82.9076 66 81.25V25.3688L65.2625 25H16.7375ZM6.625 18.75V12.5H75.375V18.75H6.625Z"
                            fill="white"
                          />
                        </svg>
                        Delete
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <span>No games started</span>
          </div>
        )}
      </div>
    </div>
  );
}
