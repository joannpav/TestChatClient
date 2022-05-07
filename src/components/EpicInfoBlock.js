import React from 'react'; 
import gql from 'graphql-tag';
import { Message } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

function EpicInfoBlock(epicId) {
    const theEpicId = epicId.epicId;
    const { data, error, loading } = useQuery(FETCH_EPIC_QUERY, {
        variables: {
            epicId: theEpicId
        }
    });
    
    if (loading) return (<p>Loading ...</p>)
    
    return (
        <Message info>            
            <Message.Header>Epic: {data.getEpic.epicName}</Message.Header>
            <p>{data.getEpic.description}</p>
            <p>{moment(data.getEpic.createdAt).fromNow()}</p>
            <p>By: {data.getEpic.users[0].username}</p>
        </Message>      
    )
    
    
}

const FETCH_EPIC_QUERY = gql`
query GetEpic($epicId: ID!) {
  getEpic(epicId: $epicId) {    
    epicName  
    description
    createdAt
    users {
        username
    }
  }
}
`;

export default EpicInfoBlock;