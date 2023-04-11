import { currentYear } from '$src/config';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { styled } from 'solid-styled-components';

dayjs.extend(customParseFormat);

const StyledMonth = styled.article`
  border: 1px solid;
  padding: 12px;
  table {
    border-collapse: collapse;
    width: 100%;
    td {
      border: 1px solid;
    }
  }
`;

interface IMonth {
  month: string;
  index: number;
}

export function Month(props: IMonth) {
  const first = dayjs(
    `1-${props.index + 1}-${currentYear}-12`,
    'D-M-YYYY-H',
    'es'
  );
  const firstDayOfWeek = first.day();

  return (
    <StyledMonth>
      <h3>
        {props.index}. {props.month}
      </h3>
      <table>
        <tbody>
          <tr>
            <td>{firstDayOfWeek === 1 && 'start'}</td>
            <td>{firstDayOfWeek === 2 && 'start'}</td>
            <td>{firstDayOfWeek === 3 && 'start'}</td>
            <td>{firstDayOfWeek === 4 && 'start'}</td>
            <td>{firstDayOfWeek === 5 && 'start'}</td>
            <td>{firstDayOfWeek === 6 && 'start'}</td>
            <td>{firstDayOfWeek === 0 && 'start'}</td>
          </tr>
        </tbody>
      </table>
    </StyledMonth>
  );
}
