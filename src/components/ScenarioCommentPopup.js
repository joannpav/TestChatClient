import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'
import { Card, Comment, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const ScenarioCommentPopup = ({user, storyId, scenarioId, handleCallback}) => {       
    const[comment, setComment] = useState('');
    const [submitComment, { loading, error }] = useMutation(SUBMIT_SCENARIO_COMMENT_MUTATION, {
        update() {
            setComment('');
            if (handleCallback) handleCallback(comment);
        },
        variables: {
            storyId,
            scenarioId,
            body: comment
        }
    });

    // let navigate = useNavigate();
    // if (!user) { navigate("/login") }
    
    let commentGroupMarkup = (
        <Comment.Group>            
                {user && (
                    <Card fluid>
                        <Card.Content>
                            
                            <Form>
                            <div className="ui action input fluid">
                                <input
                                type="text"
                                placeholder="Comment.."
                                name="comment"
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                                error={error ? true : false}
                                />
                                <button type="submit"
                                className="ui button teal"
                                disabled={comment.trim() === ''}
                                onClick={submitComment}
                                error={error ? true : false}
                                >Submit</button>
                                </div> 
                            </Form>
                            {error && (
                                <div className="ui error message">
                                <ul className="list">
                                    <li>{error.graphQLErrors[0].message}</li>
                                </ul> </div>
                            )}
                        </Card.Content>
                    </Card>
                )}               
            
        </Comment.Group>
    );
    return commentGroupMarkup;
};


const SUBMIT_SCENARIO_COMMENT_MUTATION = gql`
   mutation CreateScenarioComment($scenarioId: ID!, $body: String!, $storyId: ID!) {
        createScenarioComment(scenarioId: $scenarioId, body: $body, storyId: $storyId) {
            comments {
                id
                createdAt
                username
                body
                }
            commentCount
        }
    }
`;
export default ScenarioCommentPopup