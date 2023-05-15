import { styled } from 'solid-styled-components';

export const StyledDayPopup = styled.div`
  position: fixed;
  top: 5vh;
  left: 5vw;
  background: #300;
  padding: 48px;
  width: 90vw;
  height: 90vh;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  color: white;
  h3 {
    text-align: center;
    font-size: 30px;
    margin-bottom: 40px;
  }
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* popup height - paddings - h1 height */
    height: calc(90vh - 48px * 2 - 77px);
    width: 75%;
    margin: 0 auto;
    gap: 40px;
  }
  .close {
    position: absolute;
    top: 18px;
    right: 12px;
    font-size: 40px;
    line-height: 1;
    transition: color 0.3s;
    &:hover {
      color: #000;
    }
  }
`;

export const StyledPopupResults = styled.div`
  p {
    margin-bottom: 36px;
  }
  .fallback {
    color: grey;
  }
  .activities {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .dot {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      vertical-align: middle;
      background-color: var(--color);
      margin-right: 6px;
    }
  }
  .notes {
    white-space: pre;
  }
`;

export const StyledPopupInputs = styled.div`
  border: 1px solid #999;
  border-radius: 12px;
  padding: 24px;
  .intro {
    margin-bottom: 36px;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 18px;
    margin-bottom: 18px;
  }
  textarea {
    width: 100%;
    padding: 12px;
    background: #ddd;
  }
`;
