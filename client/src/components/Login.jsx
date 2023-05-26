import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  username: Yup.string().required(),
  pin: Yup.string().min(4, 'Too Small').max(8, 'Too Long').required(),
});

function Login() {
  return (
    <div className="p-2">
      <h1 className="text-3xl mb-2 font-bold">Login</h1>
      <h2>Heklas</h2>
    </div>
  );
}

export default Login; 
