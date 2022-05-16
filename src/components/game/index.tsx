import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';

interface GameLocal {
  opponent: string;
  scoreOpponent: number;
  scoreUser: number;
  user: string;
}

function Game() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [symbol, setSymbol] = useState('X');
  const [winner, setWinner] = useState('');
  const [draw, setDraw] = useState(false);
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const [scoreP1, setScoreP1] = useState<number>(0);
  const [scoreP2, setScoreP2] = useState<number>(0);
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement[]>([]);
  const winnersScenaries = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  useEffect(() => {
    const getUser = localStorage.getItem('user#tictactoe');
    const getGame = localStorage.getItem('game#tictactoe');
    if (!getUser) {
      navigate('/');
      return;
    }

    if (!getGame) {
      navigate('/dash');
      return;
    }

    const getGameParse: GameLocal = JSON.parse(getGame);
    setPlayer1(getGameParse.user);
    setPlayer2(getGameParse.opponent);
    setScoreP1(getGameParse.scoreUser);
    setScoreP2(getGameParse.scoreOpponent);
  }, []);

  useEffect(() => {
    if (scoreP1 > 0 || scoreP2 > 0) {
      const currentGame: GameLocal = {
        user: player1,
        opponent: player2,
        scoreUser: scoreP1,
        scoreOpponent: scoreP2
      };

      localStorage.setItem('game#tictactoe', JSON.stringify(currentGame));

      const gamesSaved = localStorage.getItem(`games#${player1}`) as string;

      if (gamesSaved) {
        let gamesParse: GameLocal[] = JSON.parse(gamesSaved);
        const idx = gamesParse.findIndex(
          (game: GameLocal) =>
            game.user === player1 && game.opponent === player2
        );

        if (idx >= 0) {
          gamesParse[idx] = {
            ...currentGame
          };

          localStorage.setItem(`games#${player1}`, JSON.stringify(gamesParse));
        }
      }
    }
  }, [scoreP1, scoreP2]);

  const setPlay = (idx: number) => {
    if (winner || draw) return;
    if (!!board[idx]) return;
    poupalteBoard(idx);
    if (checkWinner()) {
      setWinner(symbol);
      if (symbol === 'X') {
        setScoreP1(scoreP1 + 1);
      } else {
        setScoreP2(scoreP2 + 1);
      }
      return;
    }
    if (board.filter(e => e).length === 9) {
      setDraw(true);
      setTimeout(() => {
        restartBoard()
      }, 500);
    }
  };

  const poupalteBoard = (idx: number) => {
    let cpBoard = board;
    cpBoard[idx] = symbol;
    cpBoard = [...cpBoard];
    setBoard(cpBoard);
    setSymbol(symbol === 'X' ? 'O' : 'X');
  };

  const paintWinner = (ids: number[]) => {
    ids.map(id => {
      divRef.current[id].animate(
        [
          {color: 'white', border: 'none'},
          {color: 'lightgreen', border: '1px solid lightgreen'}
        ],
        {
          duration: 200,
          iterations: 3
        }
      );
    });
    setTimeout(() => {
      restartBoard();
    }, 1000);
  };

  const checkWinner = () => {
    for (let i in winnersScenaries) {
      if (
        board[winnersScenaries[i][0]] === symbol &&
        board[winnersScenaries[i][1]] === symbol &&
        board[winnersScenaries[i][2]] === symbol
      ) {
        paintWinner(winnersScenaries[i]);
        return i;
      }
    }
  };

  function restartBoard() {
    let boardReset = board;
    boardReset.fill('');
    setBoard([...boardReset]);
    setWinner('');
    setDraw(false);
  }

  const logout = () => {
    localStorage.removeItem('game#tictactoe');
    navigate('/dash');
  };

  return (
    <>
      <div className={styles.boxScore}>
        <div className={styles.score}>X</div>
        <div
          className={styles.player}
          style={{color: `${symbol === 'X' ? '#2B36E5' : ''}`}}
        >
          {player1}
        </div>
        <div className={styles.score}>{scoreP1}</div>
        <div className={styles.score}>{scoreP2}</div>
        <div
          className={styles.player}
          style={{color: `${symbol === 'O' ? '#2B36E5' : ''}`}}
        >
          {player2}
        </div>
        <div className={styles.score}>O</div>
      </div>
      <div className={styles.container}>
        {board.map((item: string, index: number) => (
          <div
            key={index}
            ref={element => divRef.current.push(element as HTMLDivElement)}
            onClick={() => setPlay(index)}
            className={styles.board}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={() => restartBoard()}>Restart</button>
        <button onClick={() => logout()}>Voltar</button>
      </div>
    </>
  );
}

export {Game};
