import React, { useContext } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, List } from 'semantic-ui-react';

import { AuthContext } from "../context/auth";
import StoryCard from '../components/StoryCard';
import StoryForm from "../components/StoryForm";
import { FETCH_STORIES_QUERY } from "../util/graphql";


function Home() {
  const { user } = useContext(AuthContext);    
  const { loading, data: {getStories: stories} = {} 
  } = useQuery(FETCH_STORIES_QUERY);
    
  return (
    <Grid columns={3}>
        <Grid.Row className="page-title">
            <h1>Recent Stories</h1>
        </Grid.Row>        
        <Grid.Row>
            {user && (
              <Grid.Column>
                <StoryForm />
              </Grid.Column>
            )}
            {loading ? (
                <h1>Loading stories...</h1>                
            ) : (
              <Transition.Group
                as={List}
                duration={600}
                divided
                size='mini'
                verticalAlign='middle'
              >
                {stories &&
                stories.map((story) => (                    
                    <Grid.Column key={story.id} style={{ marginBottom: 20 }}>
                        <StoryCard story={story} />
                    </Grid.Column>
                ))}
                </Transition.Group>
            )}            
        </Grid.Row>
    </Grid>
    
  );
}

export default Home;
