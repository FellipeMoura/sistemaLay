import styled, {css} from 'styled-components'

export const Days = styled.div`

display: inline-block;
width: 14%;
height: 17vh;
padding: 3px;
transform: scale(0.9);
transition: all ease 0.2s;
cursor: pointer;
border-radius: 20px;
text-align: center;
font-size: 1.5em;
vertical-align: center;

margin: 1px;
${(props) =>
  props.state === "selected" &&
  css`
    background-color: #20deae;
    color: #fff;
  `}
${(props) =>
  props.state === "nonPertenceMonth" &&
  css`
    opacity: 0.3;
    cursor: default;
  `}

`