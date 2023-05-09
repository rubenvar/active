import { styled } from 'solid-styled-components';

export const StyledDayPopup = styled.div`
  position: fixed;
  top: 5vh;
  left: 5vw;
  background: #300;
  padding: 48px;
  width: calc(90vw);
  height: calc(90vh);
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
  .fallback {
    color: grey;
    margin-bottom: 36px;
  }
`;

export const StyledPopupInputs = styled.div`
  border: 1px solid grey;
  border-radius: 12px;
  padding: 24px;
  .intro {
    margin-bottom: 36px;
  }
  form {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 18px;
  }
  textarea {
    width: 100%;
    padding: 12px;
  }
`;
