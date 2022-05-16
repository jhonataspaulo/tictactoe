import {useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import styles from './styles.module.scss';

export function Home() {
  const username = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  function login() {
    if (username.current?.value.length === 0) {
      username.current.focus();
      return;
    }

    localStorage.setItem(
      'user#tictactoe',
      JSON.stringify(username.current?.value.toLowerCase())
    );
    navigate('/dash');
  }

  useEffect(() => {
    const getuser = localStorage.getItem('user#tictactoe');
    if (getuser) {
      navigate('/dash');
    }
  }, []);

  const enter = (e: any) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <main>
      <header className={styles.header}>
        <img src={Logo} alt="Simbolo de hashtag, logo do jogo tic tac toe" />
        <span>Tic Tac Toe</span>
      </header>
      <div className={styles.content}>
        <input
          autoFocus
          type="text"
          placeholder="username"
          ref={username}
          onKeyPress={(e: any) => enter(e)}
        />
      </div>
      <button className={styles.button} onClick={() => login()}>
        Entrar
      </button>
      <footer>
        Feito com 🤍 por{' '}
        <a href="https://github.com/jhonataspaulo">Jhonatas Paulo</a>
      </footer>
    </main>
  );
}
