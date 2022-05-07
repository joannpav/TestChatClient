import React,  { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import TestScenarioButton from './TestScenarioButton';
import { AuthContext } from '../context/auth';

function StoryCard({ story: { body, acceptanceCriteria, createdAt, id, username, likeCount, commentCount, testScenarioCount, likes }}) {
    const { user } = useContext(AuthContext);
    
    return (
        <Card fluid>
            <Card.Content>                
                <Image 
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description as={Link} to={`/stories/${id}`}>{body}</Card.Description>                
            </Card.Content>
            <Card.Content extra>
                <TestScenarioButton count={testScenarioCount} user={user} />                
                <LikeButton user={user} storyId={id} likeCount={likeCount} likes={likes} />
                <Button as='div' labelPosition='right'>
                    <Button labelPosition='right' as={Link} to={`/stories/${id}`}>
                        <Button basic color='blue'>
                            <Icon name='comments' />
                            Comments
                        </Button>
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && <DeleteButton storyId={id} />}                      
            </Card.Content>
        </Card>
    )
}

export default StoryCard;
