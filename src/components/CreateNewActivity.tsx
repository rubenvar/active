import { Show, createSignal } from 'solid-js';
import { useActivities } from '$src/stores/ActivityContext';
import { styled } from 'solid-styled-components';

const StyledNewActivity = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  gap: 12px;
  button {
    padding: 3px 16px;
    background: #f99;
  }
`;

export function CreateNewActivity() {
  const [showNewActivity, setShowNewActivity] = createSignal(false);
  const [, { add }] = useActivities();
  const [activity, setActivity] = createSignal<string>('');

  return (
    <Show
      when={showNewActivity()}
      fallback={
        <button type="button" onClick={() => setShowNewActivity(true)}>
          nueva actividad
        </button>
      }
    >
      <StyledNewActivity>
        <input
          name="value"
          value={activity()}
          onChange={(e) => setActivity(e.currentTarget.value)}
        />
        <button
          type="button"
          onClick={() => {
            add(activity());
            setActivity('');
            setShowNewActivity(false);
          }}
        >
          Crear
        </button>
      </StyledNewActivity>
    </Show>
  );
}
