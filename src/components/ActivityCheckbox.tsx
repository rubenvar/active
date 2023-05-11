import { styled } from 'solid-styled-components';

interface IStyledLabel {
  actColor: string;
  selected: boolean;
}

const StyledLabel = styled.label<IStyledLabel>`
  border-color: ${({ actColor }) => actColor};
  border-style: solid;
  border-width: ${({ selected }) => (selected ? `3px` : `1px`)};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  background: #fff2;
  transition: background-color 0.3s;
  margin: ${({ selected }) => (selected ? 0 : `2px`)};
  &:hover {
    background-color: ${({ actColor }) => actColor};
  }
  input {
    display: none;
  }
`;

interface IActivityCheckbox {
  value: string;
  color: string;
  selected: boolean;
  handleInput: (
    // eslint-disable-next-line no-unused-vars
    e: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => void;
}

export function ActivityCheckbox(props: IActivityCheckbox) {
  return (
    <StyledLabel actColor={props.color} selected={props.selected}>
      <input
        type="checkbox"
        value={props.value}
        checked={props.selected}
        onChange={(e) => props.handleInput(e)}
      />
      <span>{props.value}</span>
    </StyledLabel>
  );
}
