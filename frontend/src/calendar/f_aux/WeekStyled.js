import styled, {css} from 'styled-components'

export const Days = styled.div`

display: inline-block;
width: 20%;
height: 100%;
transition: all ease 0.2s;
border-radius: 10px;

font-size: 1.5em;



${(props) =>
  props.state === "selected" &&
  css`
    background-color: #20deae;
    color: #fff;
  `}
${(props) =>
  props.state === "nonPertenceMonth" &&
  css`

  `}
${(props) =>
    css`
      border-bottom: 2px solid ${props.color}
    `}
  


`