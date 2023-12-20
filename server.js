import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

// App Configuration
app.use(express.static('public'))
app.use(cookieParser()) // for using cookies
app.use(express.json())

//  routing express
// List
app.get('/api/bug', (req, res) => {
  const filterBy = {
    txt: req.query.txt || '',
    minSeverity: req.query.minSeverity || 0,
    sort: req.query.sort,
    labels: req.query.labels,
    pageIdx: req.query.pageIdx,
  }

  bugService
    .query(filterBy)
    .then((bugs) => {
      res.send(bugs)
    })
    .catch((err) => {
      loggerService.error('Cannot get bugs', err)
      res.status(400).send('Cannot get bugs')
    })
})

// Get Bug (READ)
app.get('/api/bug/:id', (req, res) => {
  const bugId = req.params.id

  const { visitCountMap = [] } = req.cookies
  if (visitCountMap.length >= 3 && !visitCountMap.includes(bugId.toString()))
    return res.status(401).send('Wait for a bit')
  if (!visitCountMap.includes(bugId.toString())) visitCountMap.push(bugId)
  res.cookie('visitCountMap', visitCountMap, { maxAge: 1000 * 7 })

  bugService
    .getById(bugId)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot get bug', err)
      res.status(400).send('Cannot get bug')
    })
})

// Add Bug (CREATE)
app.post('/api/bug', (req, res) => {
  const bugToSave = {
    title: req.body.title,
    severity: req.body.severity,
    description: req.body.description,
    labels: req.body.labels,
  }

  bugService
    .save(bugToSave)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot save bug', err)
      res.status(400).send('Cannot save bug')
    })
})

// Edit Bug (UPDATE)
app.put('/api/bug', (req, res) => {
  const bugToSave = {
    _id: req.body._id,
    title: req.body.title,
    severity: req.body.severity,
    description: req.body.description,
    labels: req.body.labels,
    createdAt: req.body.createdAt,
  }

  bugService
    .save(bugToSave)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot save bug', err)
      res.status(400).send('Cannot save bug')
    })
})

// Remove Bug (DELETE)
app.delete('/api/bug/:id', (req, res) => {
  const bugId = req.params.id
  bugService
    .remove(bugId)
    .then(() => res.send(bugId))
    .catch((err) => {
      loggerService.error('Cannot remove bug', err)
      res.status(400).send('Cannot remove bug')
    })
})

// Listen will always be the last line in our server!
const PORT = 3031
app.listen(PORT, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)
