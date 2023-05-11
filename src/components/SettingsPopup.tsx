import { For, Setter, onCleanup, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { CreateNewActivity } from './CreateNewActivity';
import { useActivities } from '$src/stores/ActivityContext';

const StyledSettingsPopup = styled.aside`
  position: fixed;
  top: 10vh;
  left: 15vw;
  background: #300;
  padding: 48px;
  width: 70vw;
  height: 50vh;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  color: white;
  p {
    margin-bottom: 24px;
    &.intro {
      text-align: center;
    }
  }
  ul {
    li {
      color: var(--color);
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
      <p class="intro">intro text</p>
      <p>manage activities here:</p>
      <ul>
        <For each={contextActivities}>
          {(obj) => <li style={{ '--color': obj.color }}>{obj.value}</li>}
        </For>
        <li>
          <CreateNewActivity />
        </li>
      </ul>
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
