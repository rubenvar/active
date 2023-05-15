import type { Component } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Calendar } from '$components/calendar/Calendar';
import { SettingsButton } from '$components/SettingsButton';
import { GithubCorner } from '$components/GithubCorner';

const StyledMain = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  h1 {
    margin-bottom: 12px;
    span {
      transform: rotateY(180deg);
      display: inline-block;
    }
  }
`;

const App: Component = () => {
  return (
    <StyledMain>
      <header>
        <h1>
          <span>🏃‍♂️</span> active
        </h1>
        <SettingsButton />
      </header>
      <main>
        <Calendar />
      </main>
      <GithubCorner />
    </StyledMain>
  );
};

export default App;
