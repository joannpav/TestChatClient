import React, { useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom";
import { Feed, Card, Message } from 'semantic-ui-react';
import { FETCH_EPICS_QUERY } from "../util/graphql";
import moment from 'moment';
import {AuthContext} from "../context/auth";
import SectionBreadCrumb from "../components/SectionBreadCrumb";
import DeleteEpicButton from "../components/DeleteEpicButton";
import EpicCreationOptions from "../components/EpicCreationOptions";

function EpicFeed() {
    const [epicFeed, setEpicFeed] = useState();
    const { user } = useContext(AuthContext);
    const { orgName } = useParams();
    const { data, error, loading, fetchMore } = useQuery(FETCH_EPICS_QUERY, {        
        variables: {
            orgName
        },
        fetchPolicy: "cache-and-network"
    });

    let navigate = useNavigate();

    if (loading) return <p>Loading ...</p>;
    if (error){
        if (error?.message?.includes("Authorization token must be provided")) {
            navigate("/login")
        }    
    }
    if(!user) { navigate("/login")}

    const handleCallback = (childData) => {
        setEpicFeed({data: childData})
    }

    let feedItemListMarkup = ""
    if (!data?.getEpics?.length ||  data.getEpics.length === 0) {
        feedItemListMarkup = (
            <>           
            <EpicCreationOptions />
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch="Epics" leaf="" />
            <Message info>
                <Message.Header>No epics found</Message.Header>
                <p>Why don't you create one?</p>
            </Message>            
            </>
        )
    } else {   
        feedItemListMarkup = (
            <>           
            <EpicCreationOptions />            
            <SectionBreadCrumb trunk={user?.orgName ? user.orgName : ""} branch="Epics" leaf="" />

            {/* <Feed
                entries={data.getEpics || []}
                
                onLoadMore={() => {
                    const currentLength = data.getEpics.length;
                    fetchMore({
                    variables: {
                        offset: currentLength,
                        limit: 10,
                    },
                    }).then(fetchMoreResult => {
                    // Update variables.limit for the original query to include
                    // the newly added feed items.
                    setLimit(currentLength + fetchMoreResult.data.getEpics.length);
                    });
                }}
            /> */}


            <Feed data-cy="feedContainer">
                <Card.Group itemsPerRow={4}>
                {data && 
                    data.getEpics.map((epic) => (                     
                        <Card key={epic.id}>
                        <Card.Content >   
                            <Feed.Event data-cy={epic.EpicName}>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.Label><a href={`${epic.id}/stories`}>{epic.epicName}</a></Feed.Label>
                                        <Feed.Date>{moment(epic.createdAt).fromNow()}</Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra>
                                        <Feed.Meta>{epic.storyCount} Stories</Feed.Meta>
                                        <Feed.Meta>{epic.scenarioCount} Scenarios</Feed.Meta>
                                        <Feed.Meta>{epic.owner?.username}</Feed.Meta>
                                        {user && user.username === epic.owner?.username && <DeleteEpicButton handleCallback={handleCallback} epicId={epic.id} orgName={user.orgName} />}                                          
                                    </Feed.Extra>
                                </Feed.Content>
                            </Feed.Event>
                        </Card.Content>
                        </Card>
                ))}
                </Card.Group>
            </Feed>            
            </>
        )}
    
    return feedItemListMarkup
  
};

export default EpicFeed;