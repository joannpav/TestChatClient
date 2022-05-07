import React from 'react';
import { Icon, Feed } from 'semantic-ui-react';

function CommentButton({user, commentCount}) {    

    const commentButton = user ? (
        commentCount > 0 ? (
            <><Icon name='comments' color='teal'/> {commentCount } {commentCount === 1 ? "Comment" : "Comments"}</>
        ) : (
            <><Icon name='comments' /> {commentCount } {commentCount === 1 ? "Comment" : "Comments"}</>
        )
    ) : (
        <><Icon name='comments' to="/login"/> {commentCount } {commentCount === 1 ? "Comment" : "Comments"}</>
    )

    return (        
        <Feed.Like>
            {commentButton} 
        </Feed.Like>        
    )
}

export default CommentButton;