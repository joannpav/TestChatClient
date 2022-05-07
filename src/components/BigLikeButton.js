import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label, Feed } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


function BigLikeButton({user, storyId, likeCount, likes}) {
    const [liked, setLiked] = useState(false);
    const [errors, setErrors] = useState({});
    

    useEffect(() => {        
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)

        } else setLiked(false)
        return () => setLiked(false);
    }, [user, likes]);

    const [likeStory] = useMutation(LIKE_STORY_MUTATION, {
        variables: { storyId: storyId},
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);         
        }
    })
    

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
                Like
            </Button>
        ) : (
        <Button color='teal' basic>
            <Icon name='heart' />
            Like
        </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='heart' />
            Like
        </Button>
    )
    return (
        <Button as="div" labelPosition="right" onClick={likeStory}>
            {likeButton}
            <Label basic color="teal" pointing="left">
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_STORY_MUTATION = gql`
    mutation likeStory($storyId: ID!){
        likeStory(storyId: $storyId){
            id
            likes{
                id
                username                
            }
            likeCount
        }
    }
`;

export default BigLikeButton;