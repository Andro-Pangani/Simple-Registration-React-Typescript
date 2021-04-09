import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrapper } from './Dashboard.styled'

// interface Props {}

export const Dashboard: React.FC = () => {
  const [users, setUsers] = useState([])
  const [content, setContent] = useState([])

  const [filterKeyword, setfilterKeyword] = useState('firstName')

  const getUsers = () => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((result) => {
        console.log(result.users, ' Registered Users')
        setUsers(result.users)
        setContent(result.users)
      })
  }

  useEffect(() => {
    getUsers()
    console.log('Dashboard Mounted !!! ')
    return () => {
      console.log('Dashboard Unmounted !!! ')
    }
  }, [])

  const filterKeywordHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setfilterKeyword(e.target.value)
    console.log(e.target.value, 'Filter Keyword')
  }

  const filterByHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, ' Filtering on change')
    if (!filterKeyword) return
    const value = e.target.value
    const result = users.filter((user) => user[filterKeyword] === value)
    console.log(result, 'Filtered Results ', filterKeyword, value)
    setContent(result)
  }

  console.log('**** Dashboard Rendered', users)

  return (
    <Wrapper>
      <div className="nav_link">
        <Link to="/">Home</Link>
      </div>
      <div className="filter_section">
        <div>Filter By: </div>
        {/*  eslint-disable-next-line jsx-a11y/no-onchange */}
        <select name="filter_by" onChange={filterKeywordHandler}>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="gender">Gender</option>
          <option value="idNumber">Id Number</option>
          <option value="birthDate">Date of Birth</option>
        </select>
        {filterKeyword ? (
          <input type="text" onChange={filterByHandler} />
        ) : null}
      </div>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Name</th>
            <th>Id Number</th>
            <th>Gender</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {content.map((user: { [key: string]: string }, i) => {
            return (
              <tr key={i}>
                <td>
                  {user.firstName || '-'} {user.lastName || '-'}
                </td>
                <td>{user.idNumber || '-'}</td>
                <td>{user.gender || '-'}</td>
                <td>{user.birthDate || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}
