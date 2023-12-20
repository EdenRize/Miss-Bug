const { useState } = React

// const Router = ReactRouterDOM.BrowserRouter
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { Team } from './cmps/Team.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Vision } from './cmps/vision.jsx'
import { About } from './views/About.jsx'
import { BugDetails } from './views/BugDetails.jsx'
import { BugEdit } from './views/BugEdit.jsx'
import { BugIndex } from './views/BugIndex.jsx'
import { Home } from './views/Home.jsx'
import { UserDetails } from './views/UserDetails.jsx'

export function App() {
  const [page, setPage] = useState('bug')

  function onSetPage(page) {
    setPage(page)
  }

  return (
    <Router>
      <section className="app main-layout">
        <AppHeader onSetPage={onSetPage} />

        <main className="main-layout full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />}>
              <Route path="team" element={<Team />} />
              <Route path="vision" element={<Vision />} />
            </Route>
            <Route path="/bug/:bugId" element={<BugDetails />} />
            <Route path="/bug/edit/:bugId" element={<BugEdit />} />
            <Route path="/bug/edit" element={<BugEdit />} />
            <Route path="/bug" element={<BugIndex />} />
            <Route path="/user" element={<UserDetails />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
