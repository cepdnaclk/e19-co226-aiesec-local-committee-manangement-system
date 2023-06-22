import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Formik, Form, Field } from "formik";
import { TextField, Button } from "@mui/material";
import * as yup from "yup";

const LOGIN_URL = "/login";

/* TODO
 * [x] Integrate Formik to form
 * [x] Define validation scheme using Yup
 * [ ] Handle errors after form submission using hooks
 * [ ] JWT Authorization
 * [ ] Redirect to homepage after login
 * [ ] Show "You are already logged in" with homepage link if ever redirected to this page after login
 * [ ] Complete page design with MUI
 */

export default function Login() {
  // const { setAuth } = useContext(AuthContext);

  // Define initial state of login
  const initialState = {
    email: "",
    password: "",
  };

  // Define validation schema with yup
  const loginSchema = yup.object().shape({
    email: yup.string().required("Email required").email("Invalid email"),
    password: yup.string().required("Password required"),
  });

  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (credentials, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await axios.post(LOGIN_URL, credentials, {
        headers: { "Content-Type": "application/json" },
        //   withCredentials: true,
      });
      console.log(JSON.stringify(response.data));

      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // setAuth({ response.data.email, response.data,password, roles, accessToken });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrMsg("Missing User");
      } else if (err.response?.status === 401) {
        setErrMsg("Password Mismatch");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
    setSubmitting(false);
    // resetForm();
  };

  return (
    <div>
      <p ref={errRef}>{errMsg}</p>
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   if (!values.password) {
        //     errors.password = "Required";
        //   }
        //   return errors;
        // }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Field
              name="email"
              type="email"
              as={TextField}
              label="Email"
              variant="outlined"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              variant="outlined"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button type="submit" disabled={isSubmitting} variant="outlined">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// export default function Login() {
//   const { setAuth } = useContext(AuthContext);

//   const userRef = useRef();
//   const errRef = useRef();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setErrMsg("");
//   }, [email, password]);

//   //   function isValidEmail(email) {
//   //     return /\S+@\S+\.\S+/.test(email);
//   //   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // // prevent form submission if email is invalid
//     // if (!isValidEmail(email)) {
//     //   setErrMsg("Invalid Email");
//     //   errRef.current.focus();
//     //   return;
//     // }

//     try {
//       const response = await axios.post(
//         LOGIN_URL,
//         JSON.stringify({ email, password }),
//         {
//           headers: { "Content-Type": "application/json" },
//           //   withCredentials: true,
//         }
//       );
//       console.log(JSON.stringify(response.data));

//       const accessToken = response?.data?.accessToken;
//       const roles = response?.data?.roles;
//       setAuth({ email, password, roles, accessToken });
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 404) {
//         setErrMsg("Missing User");
//       } else if (err.response?.status === 401) {
//         setErrMsg("Password Mismatch");
//       } else {
//         setErrMsg("Login Failed");
//       }
//       errRef.current.focus();
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <p ref={errRef}>{errMsg}</p>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           ref={userRef}
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//           required
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           ref={userRef}
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }