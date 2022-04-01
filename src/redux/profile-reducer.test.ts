import profileReducer, {addPostActionCreator, deletePostAC} from "./profile-reducer";
import {v1} from "uuid";
import {PostType, ProfileType} from "../types/types";

let state = {
    posts: [
        {id: v1(), message: "Hi, my name is Elena! I travel a lot around the world!", likesCount: 75},
        {id: v1(), message: "I'm studying to be a front-end developer!", likesCount: 85},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

test('length of post should be incremented', () => {
    let action = addPostActionCreator('it-kamasutra')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {
    //1.test data
    let action = addPostActionCreator('it-kamasutra')
    //2.action
    let newState = profileReducer(state, action)
    //3.expectation
    expect(newState.posts[2].message).toBe('it-kamasutra')
});

test('after deleting lenght of message should be decrement', () => {
    let action = deletePostAC('1')

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
});


