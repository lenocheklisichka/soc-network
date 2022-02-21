import React from "react";
import classes from "./Dialogs.module.css";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import {sendMessageActionCreator} from "../../redux/dialogs-reducer";
import {useDispatch} from "react-redux";

type ErrorType = {
    newMessageBody?: string
}

const AddMessageForm = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            newMessageBody: ''
        },
        validate: (values) => {
            const errors: ErrorType = {}
            if (values.newMessageBody) {
                return undefined
            } else if (!values.newMessageBody) {
                errors.newMessageBody = 'Field is required!'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(sendMessageActionCreator(values.newMessageBody))
            formik.resetForm()
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.errors.newMessageBody && <span className={classes.span}>{formik.errors.newMessageBody}</span>}
            <div className={classes.form + " " + (formik.errors.newMessageBody ? classes.error : "")}>
                <textarea placeholder="Enter your message..."
                          name="newMessageBody"
                          value={formik.values.newMessageBody}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={classes.textarea}
                />
            </div>
            <div>
                <Button type={'submit'} variant={'contained'} color={'primary'}>Send</Button>
            </div>
        </form>
    )
}
export default AddMessageForm;