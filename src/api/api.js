const BASE = import.meta.env.VITE_API_BASE;

const getToken = () => localStorage.getItem('accessToken');

const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const jsonPost = (url, body, extra = {}) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...extra },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const apiLogin = (email, password) =>
  jsonPost(`${BASE}/auth/login`, { email, password });

export const apiSignup = (body) =>
  jsonPost(`${BASE}/auth/signup`, body);

export const apiSetLivingArea = (city, district) =>
  jsonPost(`${BASE}/users/living-area`, { method: 'MANUAL', city, district }, authHeader());

export const apiProtecteeLink = (protecteeEmail) =>
  jsonPost(`${BASE}/users/protectee-link`, { protecteeEmail }, authHeader());

export const apiGetDangerZones = (lat, lng, radius = 500) =>
  fetch(`${BASE}/danger-zones?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&radius=${radius}`, {
    headers: authHeader(),
  }).then((r) => r.json());

export const apiGetBriefing = (lat, lng) =>
  fetch(`${BASE}/briefing?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}`, {
    headers: authHeader(),
  }).then((r) => r.json());

// Haversine distance in meters
export const calcDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const USER_TYPE_MAP = {
  어르신: 'SENIOR',
  어린이: 'CHILD',
  보호자: 'GUARDIAN',
};

export const LIVING_AREAS = [
  { label: '경기도 용인시 (한국외대 글로벌캠퍼스)', city: '경기도', district: '용인시', lat: 37.3375, lng: 127.264 },
  { label: '서울 종로구', city: '서울', district: '종로구', lat: 37.5665, lng: 126.978 },
];

export const DEFAULT_LAT = 37.3375;
export const DEFAULT_LNG = 127.264;

export const getSavedCoords = () => ({
  lat: parseFloat(localStorage.getItem('lat')) || DEFAULT_LAT,
  lng: parseFloat(localStorage.getItem('lng')) || DEFAULT_LNG,
});

export const saveCoords = (lat, lng) => {
  localStorage.setItem('lat', lat);
  localStorage.setItem('lng', lng);
};
