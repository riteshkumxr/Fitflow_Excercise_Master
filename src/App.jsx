import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Workout from './pages/Workout'
import Tutorials from './pages/PersonalizedExcercise'
import DietPlan from './pages/DietPlan'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Squart from './pages/Excercise/Squart'
import Pushup from './pages/Excercise/Pushup'
import PullUp from './pages/Excercise/Pullup'
import Shoulderpress from './pages/Excercise/Shoulderpress'
import BicepCurl from './pages/Excercise/Bicepcurl'
import Frontraises from './pages/Excercise/Frontraises'
import Lunges from './pages/Excercise/Lunges'
import Morning from './pages/Excercise/Morning'
import HighKnees from './pages/Excercise/HighKnees'
import Knee from './pages/Excercise/DeskExcercise/Knee'
import DeskCurls from './pages/Excercise/DeskExcercise/DeskCurls'
import Hand from './pages/Excercise/DeskExcercise/Hand'
import Pricing from './pages/Pricing'
import FitFlowAIAssistant from './components/FitFlowAIAssistant'
import PaymentGatewayModal from './components/PaymentGatewayModal'
import { TokenProvider } from './context/TokenContext'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <TokenProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/diet" element={<DietPlan />} />
            <Route path="/diet-plan" element={<DietPlan />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Auth defaultMode="login" />} />
            <Route path="/signup" element={<Auth defaultMode="signup" />} />
            <Route path="/lower-body/squats" element={<Squart />} />
            <Route path="/upper-body/pushup" element={<Pushup />} />
            <Route path="/upper-body/pullup" element={<PullUp />} />
            <Route path="/upper-body/shoulder-press" element={<Shoulderpress />} />
            <Route path="/upper-body/bicep-curls" element={<BicepCurl />} />
            <Route path="/upper-body/front-raises" element={<Frontraises />} />
            <Route path="/lower-body/lunges" element={<Lunges />} />
            <Route path="/lower-body/morning" element={<Morning />} />
            <Route path="/lower-body/highknees" element={<HighKnees />} />

            <Route path="/desk/knee" element={<Knee />} />
            <Route path="/desk/curls" element={<DeskCurls />} />
            <Route path="/desk/hand" element={<Hand />} />
          </Routes>
        </main>
        <FitFlowAIAssistant />
        <PaymentGatewayModal />
        <Footer />
      </div>
    </TokenProvider>
  )
}

export default App