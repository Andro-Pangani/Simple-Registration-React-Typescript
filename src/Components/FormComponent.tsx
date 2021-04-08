import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrapper, Input } from './FormComponent.styled'
import { FetchPost } from '../lib/Requests.lib'
import { Form } from '../Interfaces'

const _registration_url = 'http://localhost:5000/insert'

export const FormComponent: React.FC = ({ history }) => {
  const [formData, setFormDate] = useState<Form>({
    firstName: null,
    lastName: null,
    idNumber: null,
    birthDate: null,
    gender: null,
  })

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

  const registerHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    let formIsValid = true

    // checking if all inputs are fullfiled
    // and if id field contains 11 simbols

    for (const prop in formData) {
      if (!formData[prop] || formData.idNumber?.length !== 11) {
        formIsValid = false
        setFormIsValid(false)
        break
      }
    }
    if (!formIsValid) return

    const result = await FetchPost(_registration_url, formData)

    if (result.ok) {
      history.push('/dashboard')
    }
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
