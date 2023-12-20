import { BugList } from '../cmps/BugList.jsx'
import { bugService } from '../services/bug.service.js'
import { userService } from '../services/user.service.js'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouter

export function UserDetails() {
  const params = useParams()
  const loggedInUser = userService.getLoggedinUser()
  const [user, setUser] = useState(null)
  const [bugs, setBugs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    if (user) loadBugs()
  }, [user])

  function loadUser() {
    userService
      .getUser(params.userId)
      .then(setUser)
      .catch((err) => console.log('err:', err))
  }

  function loadBugs() {
    bugService
      .query({ creatorId: user._id })
      .then(setBugs)
      .catch((err) => console.log('err:', err))
  }

  function onRemoveBug(bugId) {
    bugService
      .remove(bugId)
      .then(() => {
        setBugs((prevBugs) => {
          return prevBugs.filter((bug) => bug._id !== bugId)
        })
        showSuccessMsg(`Bug successfully removed! ${bugId}`)
      })
      .catch((err) => console.log('err:', err))
  }

  if (!user) return <div>Loading...</div>
  return (
    <section className="user-details full main-layout">
      <h1>user details</h1>
      <h2>Full Name: {user.fullname}</h2>
      <h3>{`${user.fullname}'s Bugs:`}</h3>
      <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
    </section>
  )
}
