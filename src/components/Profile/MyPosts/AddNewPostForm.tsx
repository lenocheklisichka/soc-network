import React from "react";
import classes from "./MyPosts.module.css";
import {useFormik} from "formik";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import {FormikErrorType} from "../../Login/LoginForm";

type FormErrorType = {
    newPostText?: string
}
const AddNewPostForm = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        validate: (values) => {
            const errors: FormErrorType = {}
            if (values.newPostText) {
                return undefined
            } else if (!values.newPostText) {
                errors.newPostText = 'Field is required!'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addPostActionCreator(values.newPostText))
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className={classes.form}>
            {formik.errors.newPostText && <span className={classes.span}>{formik.errors.newPostText}</span>}
            <div className={classes.form + " " + (formik.errors.newPostText ? classes.error : "")}>
                <textarea placeholder={'Enter a new post...'}
                          name={'newPostText'}
                          value={formik.values.newPostText}
                          className={classes.textarea}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                />
            </div>
            <div>
                <Button type={'submit'} variant={'contained'}
                        color={'primary'} style={{marginLeft: '10px'}}>Add</Button>
            </div>
        </form>
    )
}
export default AddNewPostForm;