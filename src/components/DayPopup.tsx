import {
  For,
  Setter,
  createSignal,
  onCleanup,
  onMount,
  Show,
  createEffect,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { CreateNewActivity } from './CreateNewActivity';
import {
  StyledDayPopup,
  StyledPopupInputs,
  StyledPopupResults,
} from './styles/StyledDayPopup';
import { useActivities } from '$src/stores/ActivityContext';
import { currentYear } from '$src/config';
import { DbDay, db } from '$src/lib/db';
import { ActivityCheckbox } from './ActivityCheckbox';

interface IDayPopup {
  monthName: string;
  month: number;
  day: number;
  setIsOpen: Setter<boolean>;
  refetch: () => DbDay | Promise<DbDay | undefined> | null | undefined;
}

export function DayPopup(props: IDayPopup) {
  // get activities list from context
  const [contextActivities] = useActivities();
  // create list of available activities to choose from
  const [selected, setSelected] = createStore(
    contextActivities.map((activity) => ({ ...activity, selected: false }))
  );
  const [notes, setNotes] = createSignal<string>('');

  onMount(async () => {
    // add event listener for keydown handler
    window.addEventListener('keydown', handleKeydown);

    // on mount, try to get activities for this day from indexedDB
    // if there are, populate the selected array so they are marked in the popup
    const dayFromDb = await db.days.get(
      `${currentYear}-${props.month + 1}-${props.day}`
    );
    if (dayFromDb?.activities) {
      dayFromDb.activities.forEach((act) => {
        setSelected((obj) => obj.value === act, 'selected', true);
      });
    }
    if (dayFromDb?.notes) setNotes(dayFromDb.notes);
  });

  onCleanup(() => {
    // remove event listener for keydown handler
    window.removeEventListener('keydown', handleKeydown);
  });
  // close popup when Escape is pressed
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      props.setIsOpen(false);
      props.refetch(); // when popup closes, refetch day data from DB for calendar view
    }
  }

  function handleInput(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) {
    // toggle only the clicked value and update the whole signal array of objects
    setSelected(
      (obj) => obj.value === e.currentTarget.value,
      'selected',
      (sel) => !sel
    );
  }

  createEffect(() => {
    // try to save (add/update) to db when the "selected" or the "notes" stores change
    db.days.put({
      date: `${currentYear}-${props.month + 1}-${props.day}`,
      activities: selected
        .filter((obj) => obj.selected)
        .map((obj) => obj.value),
      notes: notes(),
    });
  });

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
            <p class="activities">
              <For each={selected}>
                {(obj) => (
                  <Show when={obj.selected}>
                    <span>
                      <span style={{ '--color': obj.color }} class="dot" />
                      {obj.value}
                    </span>
                  </Show>
                )}
              </For>
            </p>
          </Show>
          <Show
            when={notes() && notes() !== ''}
            fallback={<p class="fallback">Sin notas</p>}
          >
            <p class="notes">{notes()}</p>
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
                <ActivityCheckbox
                  value={obj.value}
                  color={obj.color}
                  selected={obj.selected}
                  handleInput={handleInput}
                />
              )}
            </For>
            <CreateNewActivity />
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
        onClick={() => {
          props.setIsOpen(false);
          props.refetch(); // when popup closes, refetch day data from DB for calendar view
        }}
      >
        &times;
      </button>
    </StyledDayPopup>
  );
}
