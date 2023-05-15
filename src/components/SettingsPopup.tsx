import { For, Setter, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { CreateNewActivity } from './CreateNewActivity';
import { useActivities } from '$src/stores/ActivityContext';
import { EditActivity } from './EditActivity';

const StyledSettingsPopup = styled.aside`
  position: fixed;
  top: 10vh;
  left: 15vw;
  background: #300;
  padding: 48px;
  width: 70vw;
  min-height: 60vh;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  color: white;
  p {
    margin-bottom: 24px;
    &.intro {
    }
  }
  .close {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 40px;
    line-height: 1;
    transition: color 0.3s;
    &:hover {
      color: #000;
    }
  }
`;

interface ISettingsPopup {
  setIsOpen: Setter<boolean>;
}

export function SettingsPopup(props: ISettingsPopup) {
  // get activities list from context
  const [contextActivities] = useActivities();

  onMount(async () => {
    // add event listener for keydown handler
    window.addEventListener('keydown', handleKeydown);
  });

  onCleanup(() => {
    // remove event listener for keydown handler
    window.removeEventListener('keydown', handleKeydown);
  });
  // close popup when Escape is pressed
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') props.setIsOpen(false);
  }
  return (
    <StyledSettingsPopup>
      <p class="intro">
        Esta app te ayuda a llevar un track de qué actividades haces a diario.
      </p>
      <p>
        Selecciona un día del calendario y elige las actividades que has
        realizado. En la vista general podrás ver los días coloreados según las
        actividades realizadas.
      </p>
      <p>Aquí puedes ver la lista completa de actividades, y crear nuevas:</p>
      <ul>
        <For each={contextActivities}>
          {(obj) => <EditActivity activity={obj} />}
        </For>
      </ul>
      <CreateNewActivity />
      <button
        class="close"
        type="button"
        onClick={() => {
          props.setIsOpen(false);
        }}
      >
        &times;
      </button>
    </StyledSettingsPopup>
  );
}
