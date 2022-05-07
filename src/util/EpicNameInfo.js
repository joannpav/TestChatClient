import React from 'react'; 
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function EpicNameInfo(epicId) {
    const { data, error, loading } = useQuery(FETCH_EPIC_QUERY, {
        variables: {
            epicId
        }
    });
    
    if (loading) return (<p>Loading ...</p>)
      return data.getEpic.epicName;
}

const FETCH_EPIC_QUERY = gql`
query GetEpic($epicId: ID!) {
  getEpic(epicId: $epicId) {    
    epicName  
  }
}
`;

export default EpicNameInfo;