import { Page } from '@/types';
import RegisterComponent from './components/registerLawyer/Register.component';

const Register: Page = () => {
  return (
    <><RegisterComponent /></>
  );
};

Register.rootLayoutProps = {
  pageType: 'auth',
  title: 'Register',
  footer: false,
  header: false,
};

export default Register;