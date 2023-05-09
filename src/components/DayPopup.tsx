import { For, Setter, createSignal, onCleanup, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { CreateNewActivity } from './CreateNewActivity';
import {
  StyledDayPopup,
  StyledPopupInputs,
  StyledPopupResults,
} from './styles/StyledDayPopup';
import { useActivities } from './stores/ActivityContext';

interface IDayPopup {
  monthName: string;
  month: number;
  day: number;
  setIsOpen: Setter<boolean>;
}

export function DayPopup(props: IDayPopup) {
  // get activities list from context
  const [contextActivities] = useActivities();
  // create list of available activities to choose from
  const [selected, setSelected] = createStore(
    contextActivities.map((activity) => ({ activity, selected: false }))
  );
  const [notes, setNotes] = createSignal<string>('');
  const [showNewActivity, setShowNewActivity] = createSignal(false);

  // close popup when Escape is pressed
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });
  onCleanup(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
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
      (obj) => obj.activity === e.currentTarget.value,
      'selected',
      (sel) => !sel
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
            when={selected.some((obj) => obj.selected === true)}
            fallback={<p class="fallback">Sin actividades</p>}
          >
            <ul>
              <For each={selected}>
                {(obj) => (
                  <Show when={obj.selected}>
                    <li>{obj.activity}</li>
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
            <For each={selected}>
              {(obj) => (
                <label>
                  <input
                    type="checkbox"
                    value={obj.activity}
                    checked={obj.selected}
                    onChange={handleInput}
                  />
                  <span>{obj.activity}</span>
                </label>
              )}
            </For>
            <Show
              when={showNewActivity()}
              fallback={
                <button type="button" onClick={() => setShowNewActivity(true)}>
                  nueva actividad
                </button>
              }
            >
              <CreateNewActivity
                close={() => {
                  setShowNewActivity(false);
                }}
              />
            </Show>
          </form>
          <textarea
            placeholder="notas del día"
            value={notes()}
            onInput={(e) => setNotes(e.currentTarget.value)}
          />
        </StyledPopupInputs>
      </div>
      <button
        class="close"
        type="button"
        onClick={() => props.setIsOpen(false)}
      >
        &times;
      </button>
    </StyledDayPopup>
  );
}
