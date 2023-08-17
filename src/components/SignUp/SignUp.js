import "./SignUp.css";
import customAxios from "../../axios";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

function SignUp() {
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    name: yup
      .string()

      .required("!Cannot be empty"),
    username: yup
      .string()

      .required("!Cannot be empty"),
    password: yup
      .string()
      .typeError(
        "Password must contain number,punctuation mark,uppercase and lowercase letters "
      )
      .required("!Cannot be empty"),
  });
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          customAxios.post("users", values);
          navigate("/auth/signin");
          resetForm();
        }}
        validateOnBlur
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className="signUpContainer">
              <form className="form" onSubmit={handleSubmit}>
                  <div className="title">Registration</div>
                  <div className="inputContainer">
                      <input
                        className="input"
                        type={`text`}
                        name={`name`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Write your name"
                      />
                      <div className="div1"></div>
                      <label htmlFor="name" className="placeholder"></label>
                      {touched.name && errors.name && (
                          <p className="error">{errors.name}</p>
                      )}
                  </div>

                  <div className="inputContainer">
                      <input
                        className="input"
                        type={`text`}
                        name={`username`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Write your username"
                      />
                      <div className="div1"></div>
                      <label htmlFor="username" className="placeholder"></label>
                      {touched.username && errors.username && (
                          <p className="error">{errors.username}</p>
                      )}
                  </div>

                  <div className="inputContainer">
                      <input
                        className="input"
                        type={`password`}
                        name={`password`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Write your password"
                      />

                      <label htmlFor="password" className="placeholder"></label>
                      {touched.password && errors.password && (
                          <p className="error">{errors.password}</p>
                      )}
                  </div>

                  <button
                    className="submitBtn"
                    disabled={!isValid || !dirty}
                    type={`submit`}
                  >
                      Registration
                  </button>
                  <button
                    className="submitBtn"
                    type={`button`}
                    onClick={() => navigate("/auth/signin")}
                  >
                      I have account
                  </button>
              </form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default SignUp;
