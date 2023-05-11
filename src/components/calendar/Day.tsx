/* eslint-disable solid/reactivity */
import dayjs from 'dayjs';
import { For, Show, createResource, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import { DayPopup } from '$components/DayPopup';
import { db } from '$src/lib/db';
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

  const dateString = `${currentYear}-${props.month + 1}-${props.day}`;
  const [dayData, { refetch }] = createResource(
    dateString,
    async () => await db.days.get(dateString)
  );

  const day = dayjs(
    `${props.day}-${props.month + 1}-${currentYear}-12`,
    'D-M-YYYY-H',
    'es'
  );
  const isToday = dayjs().isSame(day, 'day');

  return (
    <>
      <Show when={props.day !== 0} fallback={<span />}>
        <StyledDay isToday={isToday} onClick={() => setIsOpen((curr) => !curr)}>
          {props.day}
          <For each={dayData()?.activities}>{(dd) => <p>{dd}</p>}</For>
        </StyledDay>
      </Show>
      <Show when={isOpen()}>
        <Portal>
          <DayPopup
            monthName={props.monthName}
            month={props.month}
            day={props.day}
            setIsOpen={setIsOpen}
            refetch={refetch}
          />
        </Portal>
      </Show>
    </>
  );
}
