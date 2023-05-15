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
  padding: 12px;
  padding-left: 18px;
  margin: 1px;
  border-radius: 1.5px;
  transition: border-color 0.5s;
  border: 1px solid #282c34;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: start;
  justify-items: start;
  gap: 8px;
  &:hover {
    border-color: #800b;
    transition: border-color 0.25s;
  }
  .day {
    margin: 0;
    font-family: monospace;
    text-align: right;
    font-size: 18px;
    justify-self: end;
  }
  .notes {
    justify-self: end;
    font-size: 9px;
    line-height: 1;
    display: block;
    text-align: right;
    color: #fffd;
  }
  .hasNotes {
    background-color: #940c0c;
    display: block;
    position: absolute;
    top: -5px;
    right: -5px;
    rotate: 45deg;
    width: 10px;
    height: 10px;
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
          <span class="day">{props.day}</span>
          <Show when={!!dayData()?.notes}>
            <Show
              when={dayData()?.notes?.length < 26}
              fallback={<span class="hasNotes" />}
            >
              <span class="notes">{dayData()?.notes}</span>
            </Show>
          </Show>
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
