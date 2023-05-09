import { createSignal } from 'solid-js';
import { useActivities } from './stores/ActivityContext';
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

export function CreateNewActivity(props: { close: () => void }) {
  const [, { add }] = useActivities();
  const [activity, setActivity] = createSignal<string>('');

  return (
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
          props.close();
        }}
      >
        Crear
      </button>
    </StyledNewActivity>
  );
}
