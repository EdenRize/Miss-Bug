const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const { txt, minSeverity, sort, labels } = filterByToEdit
  const bugsLabels = [
    'critical',
    'performance',
    'security',
    'invalid',
    "won't fix",
  ]

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

  function handleLabelChange(newLabel) {
    const labelIdx = labels.findIndex((label) => label === newLabel)
    const newLabels = [...labels]

    if (labelIdx === -1) {
      newLabels.push(newLabel)
    } else newLabels.splice(labelIdx, 1)

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: newLabels }))
  }

  return (
    <section className="bug-filter full">
      <div className="filter-container">
        <h2>Filter Our Bugs</h2>

        <form onSubmit={onSetFilterBy}>
          <label htmlFor="txt">Title:</label>
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

          <label htmlFor="labels">Labels:</label>
          <div className="checkbox-container">
            {bugsLabels.map((label, idx) => {
              return (
                <label key={idx}>
                  {label}
                  <input
                    type="checkbox"
                    onChange={() => handleLabelChange(label)}
                    checked={labels.includes(label)}
                    name={label}
                  />
                </label>
              )
            })}
          </div>

          <button>Filter Bugs</button>
        </form>
      </div>

      <div className="sorting-container">
        <h2>Sort By</h2>
        <select value={sort} name="sort" onChange={handleChange}>
          <option value="txt">Title</option>
          <option value="severity">severity</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>
    </section>
  )
}
