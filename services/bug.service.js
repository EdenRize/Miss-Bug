import fs from 'fs'
import { utilService } from './util.service.js'
import { loggerService } from './logger.service.js'

const PAGE_SIZE = 3
export const bugService = {
  query,
  getById,
  remove,
  save,
}

const bugs = utilService.readJsonFile('data/bug.json')

function query(filterBy) {
  let bugsToReturn = bugs

  if (filterBy.txt) {
    const regExp = new RegExp(filterBy.txt, 'i')
    bugsToReturn = bugsToReturn.filter((bug) => regExp.test(bug.title))
  }

  if (filterBy.minSeverity) {
    bugsToReturn = bugsToReturn.filter(
      (bug) => bug.severity >= filterBy.minSeverity
    )
  }

  if (filterBy.labels && filterBy.labels.length > 0) {
    bugsToReturn = bugsToReturn.filter((bug) =>
      bug.labels.some((label) => filterBy.labels.includes(label))
    )
  }

  if (filterBy.creatorId) {
    bugsToReturn = bugsToReturn.filter(
      (bug) => bug.creator._id === filterBy.creatorId
    )
  }

  if (filterBy.sort) {
    switch (filterBy.sort) {
      case 'txt':
        bugsToReturn.sort((b1, b2) => b1.title.localeCompare(b2.title))
        break

      case 'severity':
        bugsToReturn.sort((b1, b2) => b1.severity - b2.severity)
        break

      case 'createdAt':
        bugsToReturn.sort((b1, b2) => b2.createdAt - b1.createdAt)
        break
    }
  }

  if (filterBy.pageIdx !== undefined) {
    const startIdx = filterBy.pageIdx * PAGE_SIZE
    bugsToReturn = bugsToReturn.slice(startIdx, startIdx + PAGE_SIZE)
  }

  return Promise.resolve(bugsToReturn)
}

function getById(bugId) {
  const bug = bugs.find((bug) => bug._id === bugId)
  if (!bug) return Promise.reject('Bug not found!')
  return Promise.resolve(bug)
}

function remove(bugId, loggedinUser) {
  const idx = bugs.findIndex((bug) => bug._id === bugId)
  if (idx === -1) return Promise.reject('No Such Bug')
  const bug = bugs[idx]
  if (!loggedinUser.isAdmin && bug.creator._id !== loggedinUser._id) {
    return Promise.reject('Not your bug')
  }
  bugs.splice(idx, 1)
  return _saveBugsToFile()
}

function save(bug, loggedinUser) {
  if (bug._id) {
    const idx = bugs.findIndex((currBug) => currBug._id === bug._id)
    if (!loggedinUser.isAdmin && bugs[idx].creator._id !== loggedinUser._id) {
      return Promise.reject('Not your bug')
    }
    bugs[idx] = bug
  } else {
    bug._id = utilService.makeId()
    bug.createdAt = Date.now()
    bug.creator = loggedinUser
    bugs.unshift(bug)
  }

  return _saveBugsToFile().then(() => bug)
}

function _saveBugsToFile() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bugs, null, 2)
    fs.writeFile('data/bug.json', data, (err) => {
      if (err) {
        loggerService.error('Cannot write to bugs file', err)
        return reject(err)
      }
      console.log('The file was saved!')
      resolve()
    })
  })
}
