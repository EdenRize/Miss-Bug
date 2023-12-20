export function UserPreview({ user }) {
  return (
    <article className="user-preview">
      <h2>UserName: {user.username}</h2>
      <h4>Fullname: {user.fullname}</h4>
      <h4>Score: {user.score}</h4>
      {user.isAdmin && <h4>User is admin</h4>}
    </article>
  )
}
