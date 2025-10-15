import ReactDOM from 'react-dom/client'

import App from './App'  // euqals to: import App from './App.jsx'; building tools will automatically try to find: js, jsx, ts, tsx..

ReactDOM.createRoot(document.getElementById('root')).render(<App />)