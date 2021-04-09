import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 18px;
  .nav_link {
    margin-bottom: 15px;
    a {
      color: #8095ff;
      font-size: 18px;
    }
  }

  .validation-message {
    color: #d84c4c;
    font-style: italic;
  }

  form {
    width: fit-content;
  }
  .form_validation_caption {
    color: red;
  }

  .input_label {
    color: #7c7aff;
  }

  .input_item {
    margin-bottom: 8px;
    /* input {
      border-radius: 5px;
      padding: 5px;
      font-size: 15px;
      color: #588f5e;
      border-width: 1px;
      background-color: black;
      border-left-color: #8095ff;
      border-right-color: #6d84f5;
      border-top-color: #8095ff;
      border-bottom-color: #515fa7;
    } */
    /* input[type='date']::-webkit-calendar-picker-indicator {
      color: red;
      background-color: #5487d3;
      border-radius: 3px;
    } */
  }

  .id_caption {
    margin-top: 5px;
    padding-left: 3px;
    font-size: 15px;
    color: #b32929;
  }
`
export const Input = styled.input`
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #64424e;
    opacity: 1; /* Firefox */
  }
`
