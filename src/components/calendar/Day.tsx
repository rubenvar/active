/* eslint-disable solid/reactivity */
import dayjs from 'dayjs';
import { Show, createResource, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import { DayPopup } from '$components/DayPopup';
import { db } from '$src/lib/db';
import { currentYear } from '$src/config';
import { useActivities } from '$src/stores/ActivityContext';

interface IStyledDay {
  isToday: boolean;
  colors: string[] | undefined;
}

const StyledDay = styled.button<IStyledDay>`
  /* if array of colors, hard-edged-gradient */
  /* if one color, show it. else, chekc if today and show default colors */
  background: ${({ colors, isToday }) =>
    colors && colors[0]
      ? colors.length > 1
        ? `linear-gradient(135deg, ${colors.map((col, i) => {
            // calculate stos for each color so the gradient is hard-edged
            const stop = 100 / colors.length;
            return `${col} ${i * stop}% ${(i + 1) * stop}%`;
          })})`
        : colors[0]
      : isToday
      ? '#2e262d'
      : '#23262d'};
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
  const [activities] = useActivities();

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
        <StyledDay
          isToday={isToday}
          onClick={() => setIsOpen(true)}
          colors={dayData()
            ?.activities?.map(
              (act) => activities.find((obj) => obj.value === act)?.color
            )
            .filter((st): st is string => !!st)}
        >
          {props.day}
          {/* <For each={dayData()?.activities}>{(act) => <p>{act}</p>}</For> */}
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
