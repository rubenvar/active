import { createSignal } from 'solid-js';
import { useActivities } from './stores/ActivityContext';
import { styled } from 'solid-styled-components';

const StyledNewActivity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  padding: 12px;
  border-radius: 12px;
  gap: 12px;
  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    input {
      width: 120px;
    }
  }
  button {
    padding: 4px 12px;
    background: #f99;
  }
`;

export function CreateNewActivity(props: { close: () => void }) {
  const [, { add }] = useActivities();
  const [value, setValue] = createSignal<string>('');
  const [label, setLabel] = createSignal<string>('');

  return (
    <StyledNewActivity>
      <label>
        <span>value (unique)</span>
        <input
          name="value"
          value={value()}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </label>
      <label>
        <span>label</span>
        <input
          name="label"
          value={label()}
          onChange={(e) => setLabel(e.currentTarget.value)}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          add({ value: value(), label: label() });
          setValue('');
          setLabel('');
          props.close();
        }}
      >
        Crear
      </button>
    </StyledNewActivity>
  );
}
