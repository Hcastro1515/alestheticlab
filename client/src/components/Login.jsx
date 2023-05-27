import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomErrorMessage from "./customErrorMessage";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  pin: Yup.string().min(4, 'Too Small').max(8, 'Too Long').required(),
});

const handleSubmit = (values, { setSubmitting, setStatus }) => {
  // Simulate an API call
  setTimeout(() => {
    console.log(values);
    setStatus({ success: true });
    setSubmitting(false);
  }, 500);
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

            <button className='py-2 px-4 bg-secondaryColor1 rounded-md hover:bg-secondaryColor2 transition duration-500 ease-in-out' disabled={isSubmitting}>
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
