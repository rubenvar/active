import { Setter, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';

const StyledDayPopup = styled.div`
  position: fixed;
  top: 5vh;
  left: 5vw;
  background: #300;
  padding: 48px;
  width: calc(90vw - 48px * 2);
  height: calc(90vh - 48px * 2);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  color: white;
  h3 {
    text-align: center;
  }
  button {
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

interface IDayPopup {
  monthName: string;
  month: number;
  day: number;
  setIsOpen: Setter<boolean>;
}

export function DayPopup(props: IDayPopup) {
  onMount(() => {
    window.addEventListener('keydown', handler);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handler);
  });

  // close popup when Escape is pressed
  function handler(e: KeyboardEvent) {
    if (e.key === 'Escape') props.setIsOpen(false);
  }

  return (
    <StyledDayPopup>
      <h3>
        Editar {props.day} de {props.monthName}
      </h3>
      <button onClick={() => props.setIsOpen(false)}>close</button>
    </StyledDayPopup>
  );
}
