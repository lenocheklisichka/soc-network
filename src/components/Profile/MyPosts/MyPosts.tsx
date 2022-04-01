import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostType} from "../../../types/types"
import AddNewPostForm from "./AddNewPostForm";

type MyPostType = {
    posts: Array<PostType>
}
const MyPosts = React.memo((props: MyPostType) => {
    console.log("Render")

    let postsElements = [...props.posts].reverse().map(p => <div key={p.id}>
        <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/></div>)

    return (
        <div>
            <h2 className={classes.myPost}>My posts</h2>
            <AddNewPostForm/>
            <div className={classes.posts}>{postsElements}</div>
        </div>
    )
})
export default MyPosts