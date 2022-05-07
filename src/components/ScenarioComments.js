import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';


function ScenarioComments({user, comments, commentCount}) {    
    const scenarioComments = user ? (
        commentCount > 0 ? (
            <>                
            {comments && comments.map((comment) => (
                <>
                <Comment.Group key={comment.id}>
                    <Comment key={comment.id}>
                        <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/molly.png" />
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.username}</Comment.Author>
                            <Comment.Metadata><span>{moment(comment.createdAt).fromNow()}</span></Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                        </Comment.Content>
                        </Comment>
                </Comment.Group>                        
                </>
                ))}                                     
            </>
        ) : (
            <></>
        )
    ) : (
        <></>
    )
    return scenarioComments
}

export default ScenarioComments;