import React from "react";
import classes from "./Post.module.css";
import {PostType} from "../../../../redux/types";

const Post: React.FC<PostType> = (props) => {
    return (
        <div>
            <div className={classes.item}>
                <img src="https://www.meme-arsenal.com/memes/74a9592e66a76c818ed95c1216487fa7.jpg" alt=""/>
                <p className={classes.post}>{props.message}</p>
            </div>
            <div>
                <span className={classes.like}>like</span> <span>{props.likesCount}</span>
            </div>
        </div>
    );
}
export default Post;