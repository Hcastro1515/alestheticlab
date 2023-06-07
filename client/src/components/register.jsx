import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomErrorMessage from "./customErrorMessage";
import axios from 'axios';

const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  pin: Yup.string().min(4, 'Too Small').max(8, 'Too Long').required(),
  confirmPin: Yup.string().oneOf([Yup.ref('pin'), null], 'Pin must match').required('Required'),
});

const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/user/register', values);

    // Do something with response.data
    console.log(response.data);

    setStatus({ success: true });
  } catch (error) {
    console.error("Error during API call", error);
    setStatus({ success: false });
  } finally {
    setSubmitting(false);
  }
};

function Register() {
  return (
    <div className="p-2">
      <h1 className="text-3xl mb-2 font-bold">Register</h1>
      <Formik
        initialValues={{ username: '', pin: '', confirmPin: '' }}
        validationSchema={registerSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
          actions.resetForm();
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <Field type="username" name="username" placeholder="username" />
            <ErrorMessage name="username" component={CustomErrorMessage} />

            <Field type="password" name="pin" placeholder="PIN" />
            <ErrorMessage name="pin" component={CustomErrorMessage} />

            <Field type="password" name="confirmPin" placeholder="PIN" />
            <ErrorMessage name="pin" component={CustomErrorMessage} />

            <button type="submit" className='py-2 px-4 bg-secondaryColor1 rounded-md hover:bg-secondaryColor2 transition duration-500 ease-in-out' disabled={isSubmitting}>
              Register
            </button>
            {status && status.success && <div>User registration is successfull</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register; 
