import { Show, createSignal, onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { Activity } from '$src/config';
import { useActivities } from '$src/stores/ActivityContext';
import { IconPencil } from '@tabler/icons-solidjs';

interface IStyledEditActivity {
  color: string;
}

const StyledEditActivity = styled.li<IStyledEditActivity>`
  color: ${({ color }) => color};
  span {
    margin: 0;
  }
  button {
    padding: 3px 16px;
    &.save {
      color: #000;
      background: ${({ color }) => color};
    }
    &.cancel {
      color: #000;
      background: none;
    }
  }
  div,
  label {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

interface IEditActivity {
  activity: Activity;
}

export function EditActivity(props: IEditActivity) {
  const [, { update }] = useActivities();
  const [showEditActivity, setShowEditActivity] = createSignal(false);
  const [value, setValue] = createSignal('');
  const [color, setColor] = createSignal('');

  onMount(() => {
    setValue(props.activity.value);
    setColor(props.activity.color);
  });

  return (
    <StyledEditActivity color={props.activity.color}>
      <Show
        when={showEditActivity()}
        fallback={
          <button type="button" onClick={() => setShowEditActivity(true)}>
            {props.activity.value} <IconPencil />
          </button>
        }
      >
        <div>
          <label for="color">
            <span>Editar {props.activity.value}</span>
            <input
              name="color"
              type="color"
              id="color"
              value={color()}
              required
              onChange={(e) => setColor(e.currentTarget.value)}
            />
          </label>
          <div>
            <button
              class="save"
              type="button"
              onClick={() => {
                update({ value: value(), color: color() });
                setValue('');
                setColor('');
                setShowEditActivity(false);
              }}
            >
              Guardar
            </button>
            <button
              class="cancel"
              type="button"
              onClick={() => {
                setValue('');
                setColor('');
                setShowEditActivity(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Show>
    </StyledEditActivity>
  );
}
