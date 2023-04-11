import type { Component } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Calendar } from './Calendar';

const StyledMain = styled('main')`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  h1 {
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
      </header>
      <main>
        <p>the app goes here</p>
        <Calendar />
      </main>
    </StyledMain>
  );
};

export default App;
