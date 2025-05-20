import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-24 transition duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-24 transition duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa]" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold mb-4">Vite + React</h1>

      <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-md">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          Edit <code className="bg-gray-200 dark:bg-zinc-700 px-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="mt-6 text-gray-400 text-sm">Click on the logos to learn more</p>
    </main>
  )
}

export default App
