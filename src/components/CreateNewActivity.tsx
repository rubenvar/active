import { Show, createSignal } from 'solid-js';
import { useActivities } from '$src/stores/ActivityContext';
import { styled } from 'solid-styled-components';

const StyledNewActivity = styled.div`
  display: flex;
  gap: 12px;
  border: 1px solid #999;
  padding: 12px;
  border-radius: 6px;
  div {
    display: flex;
    gap: 12px;
  }
  button {
    padding: 3px 16px;
    background: #f99;
    &.cancel {
      border: 1px solid #f99;
      background: none;
    }
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
        <div>
          <input
            name="value"
            value={value()}
            onChange={(e) => setValue(e.currentTarget.value)}
            required
            placeholder="Correr"
          />
          <input
            name="color"
            type="color"
            value={color()}
            onChange={(e) => setColor(e.currentTarget.value)}
            required
          />
        </div>
        <div>
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
          <button
            class="cancel"
            type="button"
            onClick={() => {
              setValue('');
              setColor('');
              setShowNewActivity(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </StyledNewActivity>
    </Show>
  );
}
