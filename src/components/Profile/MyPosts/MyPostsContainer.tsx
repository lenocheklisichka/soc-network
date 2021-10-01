
import {addPostActionCreator, changeNewTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {PostType} from "../../../redux/types";
import {connect} from "react-redux";
import {AppDispatch, AppRootState} from "../../../redux/redux-store";

type MapStateToPropsType = {
    posts: Array<PostType>;
    newPostText: string;
};

type MapDispatchToPropsType = {
    addPost: () => void;
    changeNewPostText: (newText: string | undefined) => void;
};

let mapStateToProps = (state: AppRootState): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: AppDispatch): MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        changeNewPostText: (newText: string | undefined) => {
            dispatch(changeNewTextActionCreator(newText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;