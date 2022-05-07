import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Image, Feed, Card, Container, Segment, Message  } from 'semantic-ui-react';
import { FETCH_STORIES_QUERY } from "../util/graphql";
import moment from 'moment';
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import TestScenarioButton from "../components/TestScenarioButton";
import StoryForm from "../components/StoryForm";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import EpicNameInfo from "../util/EpicNameInfo";
import EpicInfoBlock from "../components/EpicInfoBlock";
import StoryCreationOptions from "../components/StoryCreationOptions";

function StoryFeed() {
    const [storyFeed, setStoryFeed] = useState();

    const { user } = useContext(AuthContext);    
    const { orgName, epicId } = useParams();
    const { data, error, loading } = useQuery(FETCH_STORIES_QUERY, {
        variables: {
            epicId
        }
    });
    const epicName = EpicNameInfo(epicId);

    let navigate = useNavigate();
  
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{`Error loading ${error.message}`}</p>
    if (!user) { navigate("/login") }

    
    const handleCallback = (childData) => { 
        setStoryFeed({data: childData})                
    }

    

    let feedItemListMarkup = ""
    if (data.getStories.length === 0) {
        feedItemListMarkup = (
            <>
            <StoryCreationOptions />            
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch="" leaf={epicName} />
            <EpicInfoBlock epicId={epicId} />

            <Message info>
                <Message.Header>No stories in this epic</Message.Header>
                <p>Why don't you create one?</p>
            </Message>            
            </>
        )
    } else {    
        feedItemListMarkup = (
        <>              
            <StoryCreationOptions />            
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch={epicName} leaf="Stories" />
            <EpicInfoBlock  epicId={epicId} />
            <Feed data-cy="feedContainer">
                {data &&
                    data.getStories.map((story) => (              
                    <Card fluid key={story.id}>
                    <Card.Content >   
                    <Feed.Event data-cy="feedItem">                                        
                        <Feed.Label>
                        <Image 
                            floated="left"
                            size="mini"
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        />                   
                        </Feed.Label>
                        <Feed.Content>
                            <Feed.Summary>                            
                                <Feed.Content><a href={`/${orgName}/${epicName}/stories/${story.id}`}>{story.body}</a></Feed.Content>                            
                                <Feed.Date>{moment(story.createdAt).fromNow()}</Feed.Date>                                                        
                            </Feed.Summary>
                            
                            <Feed.Extra>
                                <Feed.Meta>{story.acceptanceCriteria}</Feed.Meta>
                            </Feed.Extra>
                            <hr />
                                <Feed.Meta>
                                    <LikeButton user={user} storyId={story.id} likeCount={story.likeCount} likes={story.likes}  />                            
                                    <TestScenarioButton count={story.testScenarioCount} user={user} />                                   
                                    {user && user.username === story.username && <DeleteButton handleCallback={handleCallback} epicId={epicId} storyId={story.id} />}                                          
                                </Feed.Meta>
                            
                            
                        </Feed.Content>
                    </Feed.Event>
                    </Card.Content>
                    </Card>
                    
                ))}                                        
            </Feed>        
            </>); 
        }

    return feedItemListMarkup
        
};



export default StoryFeed;
