import dayjs from 'dayjs';
import { For, Show, createSignal, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import { DayPopup } from '$components/DayPopup';
import { db } from '$components/lib/db';
import { currentYear } from '$src/config';

interface IStyledDay {
  isToday: boolean;
}

const StyledDay = styled.button<IStyledDay>`
  background: ${({ isToday }) => (isToday ? '#5002' : '#0002')};
  text-align: center;
  padding: 12px;
  margin: 1px;
  border-radius: 1.5px;
  transition: border-color 0.5s;
  border: 1px solid #282c34;
  &:hover {
    border-color: #800b;
    transition: border-color 0.25s;
  }
  p {
    font-size: 10px;
  }
`;

interface IDay {
  monthName: string;
  month: number;
  day: number;
}

export function Day(props: IDay) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [dayData, setDayData] = createSignal<string[]>();

  const day = dayjs(
    // eslint-disable-next-line solid/reactivity
    `${props.day}-${props.month + 1}-${currentYear}-12`,
    'D-M-YYYY-H',
    'es'
  );
  const isToday = dayjs().isSame(day, 'day');

  // on mount, get the current activities for this day
  onMount(async () => {
    const d = await db.days.get(
      `${currentYear}-${props.month + 1}-${props.day}`
    );
    if (d) setDayData(d.activities);
  });

  return (
    <>
      <Show when={props.day !== 0} fallback={<span />}>
        <StyledDay isToday={isToday} onClick={() => setIsOpen((curr) => !curr)}>
          {props.day}
          <For each={dayData()}>{(dd) => <p>{dd}</p>}</For>
        </StyledDay>
      </Show>
      <Show when={isOpen()}>
        <Portal>
          <DayPopup
            monthName={props.monthName}
            month={props.month}
            day={props.day}
            setIsOpen={setIsOpen}
          />
        </Portal>
      </Show>
    </>
  );
}
