const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ onSetPage }) {
  return (
    <header className="app-header full main-layout">
      <div className="header-container">
        <h1>Miss Bug</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/bug">Bugs</NavLink>
        </nav>
      </div>
    </header>
  )
}
