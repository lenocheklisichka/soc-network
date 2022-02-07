import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import TextField from "@mui/material/TextField"
import {useFormik} from "formik";
import classes from "./Login.module.css"
import {useDispatch} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

// export type LoginType = {
//     isAuth?: boolean
// }

export const LoginForm = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email field is required!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password field is required!'
            } else if (values.password.length < 3) {
                errors.password = "Password must be more than 3 characters!"
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values.email,values.password,values.rememberMe))
            formik.resetForm()
        },
    })
    // if(props.isAuth) {
    //     return <Redirect to={'/profile'}/>
    // }
    return (
        <Grid container justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit} className={classes.form}>

                {formik.touched.email && formik.errors.email ?
                    <div className={classes.span}>{formik.errors.email}</div> : null}

                <div className={classes.form + " " + (formik.errors.email ? classes.error : "")}>
                    <TextField label="Email"
                               margin="normal"
                        // name="email"
                        // onChange={formik.handleChange}
                        // value={formik.values.email}
                        // onBlur={formik.handleBlur}
                               {...formik.getFieldProps("email")}
                    />
                </div>
                {formik.touched.password && formik.errors.password ?
                    <div className={classes.span}>{formik.errors.password}</div> : null}
                <div className={classes.form + " " + (formik.errors.password ? classes.error : "")}>
                    <TextField type="password"
                               label="Password"
                               margin="normal"
                               {...formik.getFieldProps("password")}
                    />
                </div>
                <FormControlLabel label={'Remember me'}
                                  control={<Checkbox {...formik.getFieldProps("rememberMe")}/>}/>
                <Button type={'submit'} variant={'contained'} color={'primary'}>
                    Login
                </Button>
            </form>
        </Grid>
    )
}