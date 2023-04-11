import { Show } from 'solid-js';
import { styled } from 'solid-styled-components';

const StyledDay = styled.div`
  background: #0002;
  text-align: center;
  padding: 12px;
  margin: 2px;
  border-radius: 1.5px;
`;

interface IDay {
  day: number;
}

export function Day(props: IDay) {
  return (
    <Show when={props.day !== 0} fallback={<span />}>
      <StyledDay>{props.day}</StyledDay>
    </Show>
  );
}
