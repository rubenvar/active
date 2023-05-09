import { activities } from '$src/config';
import { For, Setter, createSignal, onCleanup, onMount, Show } from 'solid-js';
import { styled } from 'solid-styled-components';

const StyledDayPopup = styled.div`
  position: fixed;
  top: 5vh;
  left: 5vw;
  background: #300;
  padding: 48px;
  width: calc(90vw);
  height: calc(90vh);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  color: white;
  h3 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 40px;
  }
  .inner {
    display: grid;
    grid-template-rows: 1fr 1.5fr;
    width: 75%;
    margin: 0 auto;
    gap: 40px;
  }
  .close {
    position: absolute;
    top: 18px;
    right: 12px;
    font-size: 40px;
    line-height: 1;
    transition: color 0.3s;
    &:hover {
      color: #000;
    }
  }
`;

const StyledPopupResults = styled.div`
  .fallback {
    color: grey;
    margin-bottom: 36px;
  }
`;

const StyledPopupInputs = styled.div`
  border: 1px solid grey;
  border-radius: 12px;
  padding: 24px;
  .intro {
    margin-bottom: 36px;
  }
  form {
    display: flex;
    gap: 18px;
    margin-bottom: 18px;
  }
  textarea {
    width: 100%;
    padding: 12px;
    font-size: inherit;
    font-family: inherit;
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
  const [notes, setNotes] = createSignal<string>('');

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
      <div class="inner">
        <StyledPopupResults>
          <Show
            when={selected().some((obj) => obj.selected === true)}
            fallback={<p class="fallback">Sin actividades</p>}
          >
            <ul>
              <For each={selected()}>
                {(obj) => (
                  <Show when={obj.selected}>
                    <li>{obj.label}</li>
                  </Show>
                )}
              </For>
            </ul>
          </Show>
          <Show
            when={notes() && notes() !== ''}
            fallback={<p class="fallback">Sin notas</p>}
          >
            <p>{notes()}</p>
          </Show>
        </StyledPopupResults>
        <StyledPopupInputs>
          <p class="intro">
            Selecionas las actividades diarias. Deja notas. Los cambios se
            guardan automáticamente
          </p>
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
          <textarea
            placeholder="notas del día"
            value={notes()}
            onInput={(e) => setNotes(e.currentTarget.value)}
          />
        </StyledPopupInputs>
      </div>
      <button class="close" onClick={() => props.setIsOpen(false)}>
        &times;
      </button>
    </StyledDayPopup>
  );
}
