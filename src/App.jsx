import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tickets from './pages/Tickets'
import Program from './pages/Program'
import News from './pages/News'
import Suggestions from './pages/Suggestions'
import { isTelegram } from './lib/telegram'

export default function App() {
  const inTelegram = isTelegram()

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#F0FFF4',
            border: '1px solid #B7E4C7',
            color: '#1B2D1F',
          },
          success: {
            iconTheme: { primary: '#2D6A4F', secondary: '#fff' },
          },
        }}
      />
      {!inTelegram && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chipta" element={<Tickets />} />
          <Route path="/dastur" element={<Program />} />
          <Route path="/yangiliklar" element={<News />} />
          <Route path="/taklif" element={<Suggestions />} />
        </Routes>
      </main>
      {!inTelegram && <Footer />}
    </BrowserRouter>
  )
}
