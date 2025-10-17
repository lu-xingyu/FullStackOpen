import ReactDOM from 'react-dom/client'

import App from './App' // euqals to: import App from './App.jsx'; building tools will automatically try to find: js, jsx, ts, tsx..
// import App from './AppSec'  
// import App from './AppClick'
// import App from './AppReuse'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)