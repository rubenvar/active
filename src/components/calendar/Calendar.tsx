import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { For } from 'solid-js';
import { Month } from './Month';

dayjs.locale('es');

export function Calendar() {
  const months = dayjs.months();

  return (
    <For each={months}>{(month, i) => <Month month={month} index={i()} />}</For>
  );
}
