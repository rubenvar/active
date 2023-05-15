import type { Component } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Calendar } from '$components/calendar/Calendar';
import { SettingsButton } from '$components/SettingsButton';
import { GithubCorner } from '$components/GithubCorner';

const StyledPage = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  h1 {
    margin-bottom: 12px;
    span {
      transform: rotateY(180deg);
      display: inline-block;
    }
  }
  main {
    @media only screen and (max-width: 580px) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
  footer {
    font-size: 14px;
    padding: 48px 0 18px;
    a {
      color: inherit;
    }
  }
`;

const App: Component = () => {
  return (
    <StyledPage>
      <header>
        <h1>
          <span>🏃‍♂️</span> active
        </h1>
        <SettingsButton />
      </header>
      <main>
        <Calendar />
      </main>
      <footer>
        <p>
          Creado por{' '}
          <a href="https://rubenvara.io" target="_blank">
            RV 🚀
          </a>{' '}
          con SolidJS
        </p>
      </footer>
      <GithubCorner />
    </StyledPage>
  );
};

export default App;
