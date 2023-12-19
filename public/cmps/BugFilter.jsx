const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function onSetFilterBy(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { txt, minSeverity } = filterByToEdit

  return (
    <section className="bug-filter full main-layout">
      <h2>Filter Our Bugs</h2>

      <form onSubmit={onSetFilterBy}>
        <label htmlFor="txt">Vendor:</label>
        <input
          value={txt}
          onChange={handleChange}
          name="txt"
          id="txt"
          type="text"
          placeholder="By Text"
        />

        <label htmlFor="severity">Severity:</label>
        <input
          value={minSeverity}
          onChange={handleChange}
          type="number"
          name="minSeverity"
          id="severity"
          placeholder="By Severity"
        />

        <button>Filter Bugs</button>
      </form>
    </section>
  )
}
