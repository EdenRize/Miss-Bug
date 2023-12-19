const { useEffect, useState, useRef } = React
const { Link } = ReactRouterDOM

import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugList } from '../cmps/BugList.jsx'
import { bugService } from '../services/bug.service.js'
import { utilService } from '../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

  useEffect(() => {
    loadBugs()
  }, [filterBy])

  function loadBugs() {
    bugService
      .query(filterBy)
      .then(setBugs)
      .catch((err) => console.log('err:', err))
  }

  function onRemoveBug(bugId) {
    console.log('bugId', bugId)
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

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      ...filterBy,
      pageIdx: isUndefined(prevFilter.pageIdx) ? undefined : 0,
    }))
  }

  function onChangePageIdx(diff) {
    if (isUndefined(filterBy.pageIdx)) return
    setFilterBy((prevFilter) => {
      let newPageIdx = prevFilter.pageIdx + diff
      if (newPageIdx < 0) newPageIdx = 0
      return { ...prevFilter, pageIdx: newPageIdx }
    })
  }

  function onTogglePagination() {
    setFilterBy((prevFilter) => {
      return {
        ...prevFilter,
        pageIdx: isUndefined(prevFilter.pageIdx) ? 0 : undefined,
      }
    })
  }

  function isUndefined(value) {
    return value === undefined
  }

  const { txt, minSeverity, sort, labels, pageIdx } = filterBy

  if (!bugs) return <div>Loading...</div>
  return (
    <section className="bug-index full main-layout">
      <section className="pagination">
        <button onClick={() => onChangePageIdx(1)}>+</button>
        {pageIdx + 1 || 'No Pagination'}
        <button onClick={() => onChangePageIdx(-1)}>-</button>
        <button onClick={onTogglePagination}>Toggle pagination</button>
      </section>

      <BugFilter
        filterBy={{ txt, minSeverity, sort, labels }}
        onSetFilter={debounceOnSetFilter.current}
      />
      <Link to="/bug/edit">Add Bug</Link>
      <BugList bugs={bugs} onRemoveBug={onRemoveBug} />
    </section>
  )
}
