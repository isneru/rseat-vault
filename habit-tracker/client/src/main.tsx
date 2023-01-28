import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./styles/global.css"
import { ToastProvider } from "./utils/ToastProvider"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
)
