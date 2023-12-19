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

// Add Bug (CREATE)
app.post('/api/bug', (req, res) => {
  const bugToSave = {
    title: req.body.title,
    severity: req.body.severity,
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
    title: req.body.title,
    severity: req.body.severity,
    description: req.body.description,
    _id: req.body._id,
  }

  bugService
    .save(bugToSave)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot save bug', err)
      res.status(400).send('Cannot save bug')
    })
})

// Get Bug (READ)
app.get('/api/bug/:id', (req, res) => {
  const bugId = req.params.id
  bugService
    .getById(bugId)
    .then((bug) => res.send(bug))
    .catch((err) => {
      loggerService.error('Cannot get bug', err)
      res.status(400).send('Cannot get bug')
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
