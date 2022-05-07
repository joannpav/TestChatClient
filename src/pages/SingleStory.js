import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Card, Grid, Image, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import TestScenarioButton from '../components/TestScenarioButton';
import TestScenarioList from '../components/TestScenarioList';
import TestScenarioForm from '../components/TestScenarioForm';
import StoryCommentGroup from '../components/StoryCommentGroup';
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import {FETCH_STORY_QUERY} from '../util/graphql';

function SingleStory() {  
    // TODO: Want te breadcrumb to be able to navigate back to the story, but since we are getting
    // to this page using the href from the feed, can't pass in a param.
    // Not sure why I wrote it like that. See if it can be refactored to use a component
    const { storyId } = useParams();
    const { user } = useContext(AuthContext);    
    const {data: {getStory: story} = {}, error, loading } = useQuery(FETCH_STORY_QUERY, {
        variables: {
            storyId
        }
    });
    
    let navigate = useNavigate();

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error}`}</p>
    if (!user) { navigate("/login") }

    const handleCallback = (childData) => {   
        story.testScenarios = [story.testScenarios, ...childData.testScenarios];
    }

    let storyMarkup;
    if(!story) {
        storyMarkup =  <p>Loading story...</p>
    } else {
        const { 
            id, 
            epic,
            body, 
            acceptanceCriteria, 
            createdAt, 
            username, 
            testScenarios, 
            comments            
        } = story;
        
        storyMarkup = (
            <>
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch={epic.epicName} leaf={body}/>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        size="small"
                        float="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Card fluid color='red'>
                            <Card.Content>
                                <Label data-cy="storyLabel" as='a' color='red' ribbon style={{marginBottom:'10px'}}>
                                    Story
                                </Label>  
                                <Label  color='purple' attached='top right'>
                                  {epic.epicName}
                                </Label>                              
                                <Card.Header>{body}</Card.Header>
                                <Card.Meta>{username}</Card.Meta>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>
                                    {acceptanceCriteria}
                                    <hr />
                                    <TestScenarioList key={id}                                           
                                        testScenarios={testScenarios}
                                        storyId={id}
                                        user={user}                           
                                    />                                
                                </Card.Description>                                
                            </Card.Content>
                            
                            <hr/>
                            <Card.Content extra>
                                <TestScenarioButton count={story.testScenarios.length} user={user}/>
                                <LikeButton user={user} storyId={story.id} likeCount={story.likeCount} likes={story.likes}  />                            
                            </Card.Content>
                        </Card>
                        
                        {user && (<TestScenarioForm 
                            handleCallback={handleCallback}
                            storyId={id}
                        />)}
                        
                        <StoryCommentGroup
                            comments={comments}
                            user={user}
                            storyId={id}
                        /> 
                       
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </>
        );
    }

    return storyMarkup;
}


export default SingleStory;