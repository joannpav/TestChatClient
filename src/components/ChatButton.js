import React from 'react';
import { Comment, Popup, Icon, Feed } from 'semantic-ui-react';
import moment from 'moment';


function ScenarioChatButton({handleShowComments, user, story, testScenario: {id, commentCount, comments}}) {    
    

    const scenarioChatButton = user ? (
        commentCount > 0 ? (
            <>                
                {/* <Popup     
                    flowing     
                    mouseLeaveDelay={50000} 
                    style={{ 
                        top: 10,
                        bottom: 10,
                        overflowY: 'auto',
                        
                        
                      }}             
                    content={comments && comments.map((comment) => (
                        <>
                        <Comment.Group key={comment.id}>
                            <Comment key={comment.id}>
                                <Comment.Avatar as="a" src="https://react.semantic-ui.com/images/avatar/small/molly.png" />
                                <Comment.Content key={id}>
                                    <Comment.Author as='a'>{comment.username}</Comment.Author>
                                    <Comment.Metadata><span>{moment(comment.createdAt).fromNow()}</span></Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                </Comment.Content>
                                </Comment>
                        </Comment.Group>
                        
                        </>
                        ))}
                    trigger={<Icon size="small" circular inverted name='comments' color='teal'/> }              
                    /> */}
                    {/* onClick={handleShowComments(comments, commentCount)}  */}
                    <Icon  size="small" circular inverted name='comments' color='teal'/>
                    
                    <span style={{color:commentCount > 0 ? "teal" : "grey" }}>{commentCount} </span>
            </>
        ) : (
            <><Icon size="small" circular inverted name='comments' color='grey'/> {commentCount } </>
        )
    ) : (
        <><Icon size="small" circular inverted name='comments'color='grey' to="/login"/> {commentCount } </>
    )

    return (        
        <Feed.Like>
            &nbsp;{scenarioChatButton} 
        </Feed.Like>        
    )
}

export default ScenarioChatButton;