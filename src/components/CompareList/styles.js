import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const Buttons = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  background-color: #f5f5f5;

  button {
    padding: 7px 14px;
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;

    &:hover {
      color: #fff;
      cursor: pointer;
    }

    i {
      margin-right: 3px;
    }

    &.primary {
      border: 1px solid #116088;
      background-color: #116088;

      &:hover {
        background-color: #0e5071;
      }
    }

    &.danger {
      border: 1px solid #c11927;
      background-color: #c11927;

      &:hover {
        background-color: #aa1622;
      }
    }
  }
`;
