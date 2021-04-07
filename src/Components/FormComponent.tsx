import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrapper } from './FormComponent.styled'
import { Input } from './FormComponent.styled'

interface Form {
  firstName: string | null
  lastName: string | null
  idNumber: number | null
  birthDate: string | null
  gender: string | null
}

export const FormComponent: React.FC = ({ history }) => {
  const [formData, setFormDate] = useState<Form>({
    firstName: null,
    lastName: null,
    idNumber: null,
    birthDate: null,
    gender: null,
  })

  const [formIsValid, setFormIsValid] = useState(false)

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target
    const value = e.target.value
    setFormDate({ ...formData, [target.name]: value })

    console.log(formData, target.name, target.value)
  }

  // const registerUser = () =>

  const registerHandler = (e) => {
    e.preventDefault()

    let formIsValid = true

    for (const prop in formData) {
      if (!formData[prop] || formData.idNumber?.length !== 11) {
        formIsValid = false
        setFormIsValid(false)
        break
      }
    }
    if (!formIsValid) return

    fetch('http://localhost:5000/insert', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          setFormDate({
            firstName: null,
            lastName: null,
            idNumber: null,
            birthDate: null,
            gender: null,
          })
          history.push('/dashboard')
          console.log(result, 'Success')
        } else {
          console.log('Something went wrong ')
        }
      })
  }

  return (
    <Wrapper>
      <div className="nav_link">
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
      <form>
        <ul className="form_list">
          <li className="input_item">
            <div className="input_label">First Name:</div>
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={onChangeHandler}
            />
          </li>
          <li className="input_item">
            <div className="input_label">Last Name:</div>
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={onChangeHandler}
            />
          </li>

          <li className="input_item">
            <div className="input_label">Your id number: </div>
            <Input
              style={formData.idNumber?.length !== 11 ? { color: 'red' } : null}
              type="number"
              placeholder="Id number"
              name="idNumber"
              onChange={onChangeHandler}
            />
            {formData.idNumber?.length !== 11 && (
              <div className="id_caption">id should contain 11 integers</div>
            )}
          </li>
          <li className="input_item">
            <div className="input_label">Date of birth</div>
            <Input type="date" name="birthDate" onChange={onChangeHandler} />
          </li>
          <li className="input_item">
            <div className="input_label">Gender: </div>
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select onChange={onChangeHandler} name="gender">
              <option selected={true} disabled={true}>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </li>
        </ul>

        <button onClick={registerHandler}>Register</button>
      </form>
    </Wrapper>
  )
}
