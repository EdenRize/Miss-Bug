import { userService } from '../services/user.service.js'
import { UserPreview } from './UserPreview.jsx'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

export function UserList({ users, onRemoveUser }) {
  const user = userService.getLoggedinUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/')
    }
  }, [])

  if (!users) return <div>Loading...</div>
  if (!users.length) return <div>No users to preview</div>
  return (
    <ul className="user-list clean-list">
      {users.map((user) => {
        return (
          <li key={user._id}>
            <UserPreview user={user} />
            <section>
              <button>
                <Link to={`/user/${user._id}`}>Details</Link>
              </button>
              <button onClick={() => onRemoveUser(user._id)}>Delete</button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
