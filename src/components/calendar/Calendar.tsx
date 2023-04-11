import dayjs from 'dayjs';
// import dayOfYear from 'dayjs/plugin/dayOfYear';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';
import { For } from 'solid-js';
import { Month } from './Month';

dayjs.locale('es');
dayjs.extend(localeData);
// dayjs.extend(dayOfYear);

export function Calendar() {
  const months = dayjs.months();

  // const today = dayjs().dayOfYear();

  return (
    <For each={months}>{(month, i) => <Month month={month} index={i()} />}</For>
  );
}
