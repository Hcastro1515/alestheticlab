import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomErrorMessage from "./customErrorMessage";
import axios from 'axios';

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  pin: Yup.string().min(4, 'Too Small').max(8, 'Too Long').required(),
});

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  // Simulate an API call
  try {
    const response = await axios.get('http://localhost:3000/api/user/login', values);

    console.log(response.data);
    localStorage.setItem('token', response.data.token);
    setStatus({ success: true });
  } catch (error) {
    console.log(error);
    setStatus({ success: false });
  } finally {
    setSubmitting(false);
  }
};

function Login() {
  return (
    <div className="p-2">
      <h1 className="text-3xl mb-2 font-bold">Login</h1>
      <Formik
        initialValues={{ username: '', pin: '' }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
          actions.resetForm();
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <Field type="username" name="username" placeholder="username" />
            <ErrorMessage name="username" component={CustomErrorMessage} />

            <Field type="text" name="pin" placeholder="PIN" />
            <ErrorMessage name="pin" component={CustomErrorMessage} />

            <button type="submit" className='py-2 px-4 bg-secondaryColor1 rounded-md hover:bg-secondaryColor2 transition duration-500 ease-in-out' disabled={isSubmitting}>
              Log In
            </button>
            {status && status.success && <div>Login successfull</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login; 
