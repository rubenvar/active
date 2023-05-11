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
  const [value, setValue] = createSignal<string>('');
  const [color, setColor] = createSignal<string>('');

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
          value={value()}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <input
          name="value"
          type="color"
          value={color()}
          onChange={(e) => setColor(e.currentTarget.value)}
        />
        <button
          type="button"
          onClick={() => {
            add({ value: value(), color: color() });
            setValue('');
            setColor('');
            setShowNewActivity(false);
          }}
        >
          Crear
        </button>
      </StyledNewActivity>
    </Show>
  );
}
