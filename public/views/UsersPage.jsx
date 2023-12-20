import { UserList } from '../cmps/UserList.jsx'
import { bugService } from '../services/bug.service.js'
import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React
const { useNavigate } = ReactRouter

export function UsersPage() {
  const [users, setUsers] = useState([])
  const user = userService.getLoggedinUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/')
    }
    loadUsers()
  }, [])

  function loadUsers() {
    userService
      .getUsers()
      .then(setUsers)
      .catch((err) => console.log('err:', err))
  }

  function onRemoveUser(userId) {
    userService
      .removeUser(userId)
      .then(loadUsers)
      .catch((err) => {
        showErrorMsg('User owns bugs, can`t remove')
        console.log('err:', err)
      })
  }

  return (
    <section className="users-page">
      <h1>Users Page</h1>
      <UserList users={users} onRemoveUser={onRemoveUser} />
    </section>
  )
}
