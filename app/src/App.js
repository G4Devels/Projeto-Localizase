import MainLogin from './components/login_page/main_login'
import { EmailAndPasswordProvider } from './contexts/authEmailAndPasswordContext';

function App() {
  return (
    <EmailAndPasswordProvider>
      <MainLogin/>
    </EmailAndPasswordProvider>
  );
}

export default App;
