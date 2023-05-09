import { activities } from '$src/config';
import { For, Setter, createSignal, onCleanup, onMount, Show } from 'solid-js';
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
    font-size: 30px;
  }
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 40px;
    line-height: 1;
    transition: color 0.3s;
    &:hover {
      color: #000;
    }
  }
`;

interface IDayPopup {
  monthName: string;
  month: number;
  day: number;
  setIsOpen: Setter<boolean>;
}

export function DayPopup(props: IDayPopup) {
  const [selected, setSelected] = createSignal(
    activities.map((act) => ({ ...act, selected: false }))
  );

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onCleanup(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  // close popup when Escape is pressed
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') props.setIsOpen(false);
  }

  // function handleForm(e: SubmitEvent) {
  //   e.preventDefault();
  //   console.log(e);
  //   // setSelected()
  // }

  function handleInput(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    // toggle only the clicked value and update the whole signal array of objects
    setSelected(
      selected().map((act) =>
        act.value !== e.currentTarget.value
          ? act
          : { ...act, selected: !act.selected }
      )
    );
  }

  return (
    <StyledDayPopup>
      <h3>
        Editar {props.day} de {props.monthName}
      </h3>
      <form>
        <For each={selected()}>
          {(obj) => (
            <label>
              <input
                type="checkbox"
                value={obj.value}
                checked={obj.selected}
                onChange={handleInput}
              />
              <span>{obj.label}</span>
            </label>
          )}
        </For>
      </form>
      <ul>
        <For each={selected()}>
          {(obj) => (
            <Show when={obj.selected}>
              <li>{obj.label}</li>
            </Show>
          )}
        </For>
      </ul>
      <button class="close" onClick={() => props.setIsOpen(false)}>
        &times;
      </button>
    </StyledDayPopup>
  );
}
