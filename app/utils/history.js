import { createBrowserHistory, createHashHistory } from 'history';

// Electron loads the bundle from file://, where browser history paths
// don't resolve. Detect that case and fall back to hash routing.
const useHashHistory =
  typeof window !== 'undefined' && window.location.protocol === 'file:';

const history = useHashHistory ? createHashHistory() : createBrowserHistory();

export default history;
