import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostType} from "../../../redux/types";

type MyPostType = {
    posts: Array<PostType>;
    addPost: () => void;
    newPostText: string
    changeNewPostText: (newText: string | undefined) => void

}
const MyPosts = (props: MyPostType) => {
    let postsElements = props.posts.map(p => <div key={p.id}><Post  key={p.id} id={p.id} message={p.message}
                                                                   likesCount={p.likesCount}/></div>);
    let newPostElement = React.createRef<HTMLTextAreaElement>();

    let onAddPost = () => {
        props.addPost()
    }

    let onChangePost = () => {
        console.log("Check function before " +  newPostElement.current?.value)
        let newText = newPostElement.current?.value
        props.changeNewPostText(newText)
    }
    return (
        <div>
            <h2 className={classes.myPost}>My posts</h2>
            <div className={classes.form}>
                <textarea placeholder={"New post..."} className={classes.textarea} ref={newPostElement} onChange={onChangePost} value={props.newPostText} >
                </textarea>
                <button onClick={onAddPost} className={classes.button}>add</button>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}
export default MyPosts;