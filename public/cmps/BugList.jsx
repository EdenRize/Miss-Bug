const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'
import { userService } from '../services/user.service.js'

export function BugList({ bugs, onRemoveBug }) {
  const user = userService.getLoggedinUser()

  function isCreator(bug) {
    if (!user) return false
    if (!bug.creator) return true
    return user.isAdmin || bug.creator._id === user._id
  }

  return (
    <ul className="bug-list clean-list">
      {bugs.map((bug) => (
        <li key={bug._id}>
          <BugPreview bug={bug} />
          <section>
            <button>
              <Link to={`/bug/${bug._id}`}>Details</Link>
            </button>
            {(isCreator(bug) || user.isAdmin) && (
              <div>
                <button onClick={() => onRemoveBug(bug._id)}>Remove</button>
                <button>
                  <Link to={`/bug/edit/${bug._id}`}>Edit</Link>
                </button>
              </div>
            )}
          </section>
        </li>
      ))}
    </ul>
  )
}
