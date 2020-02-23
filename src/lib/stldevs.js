import axios from 'axios'

const cache = {
  profiles: {},
  lang: {},
  me: null
}

// help cut down on some boiler-plate
function cached(entry, url) {
  return () => {
    if (cache[entry]) {
      return cache[entry]
    }
    cache[entry] = axios.get(url, {withCredentials: true}).then(r => r.data)
    return cache[entry]
  }
}

export const lastRun = cached('last-run', '/stldevs-api/last-run')
export const listLanguages = cached('langs', '/stldevs-api/toplangs')
export const listDevelopers = cached('devs', '/stldevs-api/devs')
export const listOrganizations = cached('orgs', '/stldevs-api/toporgs')
export const getMe = cached('me', '/stldevs-api/me')

export function getProfile(login) {
  if (cache.profiles[login]) {
    return cache.profiles[login]
  }
  cache.profiles[login] = axios.get(`/stldevs-api/devs/${login}`).then(r => r.data)
  return cache.profiles[login]
}

export function getLang(lang, offset, limit) {
  lang = lang.replace('#', '%23')
  const key = lang+offset+limit
  if (cache.lang[key]) {
    return cache.lang[key]
  }
  cache.lang[key] = axios.get(`/stldevs-api/lang/${lang}?offset=${offset}&limit=${limit}`).then(r => r.data)
  return cache.lang[key]
}

export function search(type, query) {
  return axios.get(`/stldevs-api/search?type=${type}&q=${query}`).then(r => r.data)
}

export async function logout() {
  await axios.get(`/stldevs-api/logout`, {withCredentials: true}).then(r => r.data)
  cache.me = null
}
