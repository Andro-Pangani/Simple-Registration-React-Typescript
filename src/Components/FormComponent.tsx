import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Wrapper } from './FormComponent.styled'
import { FetchPost } from '../lib/Requests.lib'
import { User } from '../Interfaces'
import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from '@material-ui/core'
import { useFormik } from 'formik'

const _registration_url = 'http://localhost:5000/insert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      color: 'gray',
    },
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
  })
)

const validate = (values: User) => {
  const errors: any = {}
  if (values.firstName.length === 0) {
    errors.firstName = '* required'
  }
  if (values.lastName.length === 0) {
    errors.lastName = '* required'
  }
  if (values.idNumber.toString().length !== 11) {
    errors.idNumber = 'should contain 11 simbols'
  }
  if (values.gender.length === 0) {
    errors.gender = '* required'
  }
  if (values.birthDate.length === 0) {
    errors.birthDate = '* required'
  }
  return errors
}

export const FormComponent: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      idNumber: '',
      birthDate: '',
      gender: '',
    },
    validate,
    onSubmit: async (values: User) => {
      console.log(values, values.idNumber.toString().length, ' lenght')
      const res = await FetchPost(_registration_url, values)
      if (res.ok) history.push('/dashboard')
    },
  })

  return (
    <Wrapper>
      <div className="nav_link">
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <ul className="form_list">
          <li className="input_item">
            {/* <div className="input_label">First Name:</div> */}
            <TextField
              id="starndard-basic"
              className={classes.textField}
              label="First Name"
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.errors.firstName ? (
              <div className="validation-message">
                {formik.errors.firstName}
              </div>
            ) : null}
          </li>
          <li className="input_item">
            {/* <div className="input_label">Last Name:</div> */}
            <TextField
              type="text"
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.errors.lastName ? (
              <div className="validation-message">{formik.errors.lastName}</div>
            ) : null}
          </li>

          <li className="input_item">
            {/* <div className="input_label">Your id number: </div> */}
            <TextField
              type="number"
              name="idNumber"
              label="Id number"
              value={formik.values.idNumber}
              onChange={formik.handleChange}
            />
            {formik.errors.idNumber ? (
              <div className="validation-message">{formik.errors.idNumber}</div>
            ) : null}
          </li>
          <li className="input_item">
            {/* <div className="input_label">Date of birth</div> */}
            <TextField
              type="date"
              name="birthDate"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
            />
            {formik.errors.birthDate ? (
              <div className="validation-message">
                {formik.errors.birthDate}
              </div>
            ) : null}
          </li>
          <li className="input_item">
            {/* <div className="input_label">Gender: </div> */}
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <FormControl className={classes.formControl}>
              <InputLabel id="label">Gender</InputLabel>
              <Select
                id="select"
                labelId="label"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value="">
                  <em>Select Gender</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            {formik.errors.gender ? (
              <div className="validation-message">{formik.errors.gender}</div>
            ) : null}
          </li>
        </ul>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Wrapper>
  )
}
