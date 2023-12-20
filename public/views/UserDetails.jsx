import { BugList } from '../cmps/BugList.jsx'
import { bugService } from '../services/bug.service.js'
import { userService } from '../services/user.service.js'

const { useEffect, useState } = React
const { useNavigate } = ReactRouter

export function UserDetails() {
  const [bugs, setBugs] = useState([])
  const user = userService.getLoggedinUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    loadBugs()
  }, [])

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

  return (
    <section className="user-details full main-layout">
      <h1>user details</h1>
      <h2>Full Name: {user.fullname}</h2>
      <h3>Your Bugs:</h3>
      <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
    </section>
  )
}
