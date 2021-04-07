import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin: 0 auto;
  padding-top: 20px;
  color: #acacac;

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
  th {
    text-align: left;
  }

  td {
    border: 1px solid gray;
    padding: 5px;
  }
  .nav_link {
    margin-bottom: 20px;
    a {
      font-size: 20px;
      color: #8298ee;
    }
  }

  .filter_section {
    display: flex;
    margin-bottom: 10px;
  }
`
