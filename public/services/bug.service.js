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
  // return axios
  //   .get(BASE_URL)
  //   .then((res) => res.data)
  //   .then((bugs) => {
  //     if (filterBy.txt) {
  //       const regExp = new RegExp(filterBy.txt, 'i')
  //       bugs = bugs.filter(
  //         (bug) => regExp.test(bug.title) || regExp.test(bug.description)
  //       )
  //     }

  //     if (filterBy.severity) {
  //       bugs = bugs.filter((bug) => bug.severity >= filterBy.severity)
  //     }
  //     return bugs
  //   })
}

function get(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data)
  // return axios
  //   .get(BASE_URL + bugId)
  //   .then((res) => {
  //     console.log(res)
  //     return res.data
  //   })
  //   .catch((error) => {
  //     console.log('error.response', error.response)
  //     if (error.response && error.response.status === 401) {
  //       // The backend returned a 401 status code
  //       console.log('Error message from backend:', error.response.data)
  //     } else {
  //       // Handle other types of errors
  //       console.error('Errorbaba:', error)
  //     }
  //     throw error.response.data // Propagate the error
  //   })
}

function remove(bugId) {
  return axios.delete(BASE_URL + bugId).then((res) => res.data)
  // return axios.get(BASE_URL + bugId + '/remove').then((res) => res.data)
}

function save(bug) {
  if (bug._id) {
    return axios.put(BASE_URL, bug).then((res) => res.data)
  } else {
    return axios.post(BASE_URL, bug).then((res) => res.data)
  }
  // const url = BASE_URL + 'save'
  // let queryParams = `?title=${bug.title}&description=${bug.description}&severity=${bug.severity}`
  // if (bug._id) queryParams += `&_id=${bug._id}`
  // return axios.get(url + queryParams)
}

function getEmptyBug() {
  return { title: '', description: '', severity: 5 }
}

function getDefaultFilter() {
  return { txt: '', minSeverity: 0, pageIdx: 0 }
}
