import { utilService } from './util.service.js'

const BASE_URL = '/api/bug/'

export const bugService = {
  query,
  get,
  remove,
  save,
  getEmptyBug,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return axios.get(BASE_URL, { params: filterBy }).then((res) => res.data)
}

function get(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data)
}

function remove(bugId) {
  return axios.delete(BASE_URL + bugId).then((res) => res.data)
}

function save(bug) {
  if (bug._id) {
    return axios.put(BASE_URL, bug).then((res) => res.data)
  } else {
    if (!bug.description) bug.description = utilService.makeLorem(5)
    return axios.post(BASE_URL, bug).then((res) => res.data)
  }
}

function getEmptyBug() {
  const labels = [
    'critical',
    'need-CR',
    'ui/ux',
    'performance',
    'dev-branch',
    'security',
    'documentation',
    'invalid',
    'enhancement',
    'duplicate',
    'invalid',
    "won't fix",
    'in-progress',
    'review-needed',
    'backend',
    'frontend',
    'browser-specific',
    'data-related',
    'testing-needed',
  ]

  return {
    title: '',
    description: '',
    severity: 5,
    labels: labels.splice(
      utilService.getRandomIntInclusive(0, labels.length - 4),
      3
    ),
  }
}

function getDefaultFilter() {
  return { txt: '', minSeverity: 0, pageIdx: 0, sort: 'txt', labels: [] }
}
