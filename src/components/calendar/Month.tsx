import { styled } from 'solid-styled-components';
import { For } from 'solid-js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import { currentYear } from '$src/config';
import { Day } from './Day';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);

const StyledMonth = styled.article`
  margin: 12px 0;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
  .day-name {
    text-align: center;
    padding: 4px;
    margin: 1px;
    color: #999;
  }
`;

const StyledDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 130px);
`;

interface IMonth {
  month: string;
  index: number;
}

export function Month(props: IMonth) {
  // gets the first day of month to use object to calculate number of days in month and first day of the week
  const firstDay = dayjs(
    // eslint-disable-next-line solid/reactivity
    `1-${props.index + 1}-${currentYear}-12`,
    'D-M-YYYY-H',
    'es'
  );

  // array of numbers: days in month
  const totalDaysInMonth = firstDay.daysInMonth();
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  // add an amount of zeros equal to offset, before days in month
  const offset = firstDay.weekday();
  const zeros = Array.from({ length: offset === -1 ? 6 : offset }, () => 0);
  daysArray.unshift(...zeros);

  return (
    <StyledMonth>
      <h3>{props.month}</h3>
      <StyledDays>
        {/* <For each={dayjs.weekdays(true)}>
          {(day) => <div class="day-name">{day}</div>}
        </For> */}
        <For each={daysArray}>{(day) => <Day day={day} />}</For>
      </StyledDays>
    </StyledMonth>
  );
}
