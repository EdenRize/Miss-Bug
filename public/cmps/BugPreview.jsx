export function BugPreview({ bug }) {
  return (
    <article className="bug-preview">
      <h2>Bug Title: {bug.title}</h2>
      <h4>Description: {bug.description}</h4>
      <h4>Severity: {bug.severity}</h4>
      <h4>
        Labels:
        {bug.labels.map((label, idx) => {
          return <li key={idx}>{label}</li>
        })}
      </h4>
      <h3>Creator: {bug.creator.fullname}</h3>
      <h1>🐛</h1>
    </article>
  )
}
