import axios from 'axios'

const cache = {
  profiles: {},
  langs: {},
  me: null
}

function listLanguages() {
  if (cache.languages) {
    return cache.languages
  }
  cache.languages = axios.get('/stldevs-api/toplangs')
  return cache.languages
}

function listDevelopers() {
  if (cache.developers) {
    return cache.developers
  }
  cache.developers = axios.get('/stldevs-api/topdevs')
  return cache.developers
}

function listOrganizations() {
  if (cache.organizations) {
    return cache.organizations
  }
  cache.organizations = axios.get('/stldevs-api/toporgs')
  return cache.organizations
}

function getProfile(login) {
  if (cache.profiles[login]) {
    return cache.profiles[login]
  }
  cache.profiles[login] = axios.get(`/stldevs-api/profile/${login}`)
  return cache.profiles[login]
}

function getLang(lang) {
  lang = lang.replace('#', '%23')
  if (cache.langs[lang]) {
    return cache.langs[lang]
  }
  cache.langs[lang] = axios.get(`/stldevs-api/lang/${lang}`)
  return cache.langs[lang]
}

function search(type, query) {
  return axios.get(`/stldevs-api/search?type=${type}&q=${query}`)
}

function login() {
  cache.me = axios.get(`/stldevs-api/login`)
  return cache.me
}

async function logout() {
  await axios.get(`/stldevs-api/logout`, {withCredentials: true})
  cache.me = null
}

function getMe() {
  if (cache.me) {
    return cache.me
  }
  cache.me = axios.get(`/stldevs-api/me`, {withCredentials: true})
  return cache.me
}

export default {
  listLanguages,
  listDevelopers,
  listOrganizations,
  getProfile,
  getLang,
  search,
  login,
  logout,
  getMe
}
