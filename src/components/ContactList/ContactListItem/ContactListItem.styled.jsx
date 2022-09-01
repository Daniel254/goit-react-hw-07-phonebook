import styled from 'styled-components';

export const DeleteBtn = styled.button`
  /* height: 3em; */
  min-width: 5em;
  outline: 0;
  background: #4caf50;
  float: right;
  border: 0;
  padding: 3px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3 ease;
  cursor: pointer;
  :active:enabled,
  :focus,
  :hover:enabled {
    background: #43a047;
  }
  :disabled {
    background: #81ca85;
    cursor: default;
  }
`;
export const ListItem = styled.li`
  margin: 0 0 10px;
  display: flex;
  justify-content: space-between;
  :nth-child(even) {
    background-color: #f2f2f2;
  }
`;
