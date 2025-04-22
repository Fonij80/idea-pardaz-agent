import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the direction for the entire app (RTL for Persian)
document.documentElement.dir = 'rtl';

createRoot(document.getElementById("root")!).render(<App />);
