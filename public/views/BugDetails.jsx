import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BugDetails() {
  const [bug, setBug] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBug()
  }, [])

  function loadBug() {
    bugService
      .get(params.bugId)
      .then(setBug)
      .catch((err) => {
        showErrorMsg('Wait for a bit')
        setBug('Wait for a bit')
        setTimeout(() => {
          navigate('/bug')
        }, 2500)
        console.log('Had issued in bug details:', err)
      })
  }

  function onBack() {
    navigate('/bug')
    // navigate(-1)
  }

  if (!bug) return <div>Loading...</div>
  if (typeof bug === 'string') return <div>{bug}</div>
  return (
    <section className="bug-details">
      <h2>Bug Title: {bug.title}</h2>
      <h4>Description: {bug.description}</h4>
      <h4>Severity: {bug.severity}</h4>
      <h4>
        Labels:
        {bug.labels.map((label, idx) => {
          return <li key={idx}>{label}</li>
        })}
      </h4>
      <h1>🐛</h1>
      {/* <img src={`../assets/img/audu.png`} alt="" /> */}
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, velit
        reiciendis sed optio eum saepe! Aliquid necessitatibus atque est quasi
        unde odit voluptate! Vero, dolor sunt molestiae possimus labore
        suscipit?
      </p>
      <button onClick={onBack}>Back</button>
    </section>
  )
}
