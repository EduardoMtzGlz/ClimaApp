import { useState } from 'react'
import Buscador from './components/Buscador'
import Resultado from './components/Resultado'

function App() {
  

  return (
    <>
      <main className=' bg-slate-100 h-screen w-screen'>
        <div className='container sm:h-screen sm:mx-auto grid sm:grid-cols-2 content-center gap-4'>
          <Buscador/>
        </div>
      </main>
    </>
  )
}

export default App
