import {Routes, Route} from 'react-router-dom'
import {LoginPage} from './pages/Login'
import {SignUpPage} from './pages/Signup'
import {HomePage} from './pages/Home'
import {DepositPage} from './pages/Deposit'
import {WithdrawPage} from './pages/Withdraw'
import {TransferPage} from './pages/Transfer'
import {StatementPage} from './pages/Statement'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/deposit' element={<DepositPage/>}/> 
      <Route path='/withdraw' element={<WithdrawPage/>}/>
      <Route path='/transfer' element={<TransferPage/>}/>
      <Route path='/statement' element={<StatementPage/>}/>
    </Routes>
  );
}

export default App;
