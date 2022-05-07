import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Container, Label, Message, Table, Card, Checkbox} from 'semantic-ui-react';
import ApprovalButton from './ApprovalButton';
import DisapprovalButton from './DisapprovalButton';
import DeleteScenarioButton from './DeleteScenarioButton';
import ChatButton from '../components/ChatButton';
import ScenarioCommentLink from '../components/ScenarioCommentLink';
import ScenarioComments from '../components/ScenarioComments';
import ExportToCypress from './ExportToCypress';
import moment from 'moment';
import {FETCH_STORY_QUERY} from '../util/graphql';


function  TestScenarioList({testScenarios, storyId, user}) {         
    const [scenarios, setScenarios] = useState();   
    const [scenarioComments, setScenarioComments] = useState("");
    const [showScenarioComments, setShowScenarioComments] = useState(false)
    const [getScenarioList, { loading, error, data}] = useLazyQuery(
      FETCH_STORY_QUERY, {
        fetchPolicy: "network-only",
        variables: {
          storyId
      }
  });
    const handleCallback = (childData) => {      
        setScenarios({data: childData})                              
    }

    const handleScenarioCommentCallback = (comment) => {
      // TODO: why is comment passed in?
      getScenarioList(storyId);
      
    }

    const toggleShowComments = (scenario) => {
      setScenarioComments(scenario.comments);      
      setShowScenarioComments(!showScenarioComments);
    }

    useEffect(() => {       
       setScenarios(testScenarios)
    }, [testScenarios, storyId, user]);


    let testMarkup = <p>Loading test scenarios...</p>            
    
    if (scenarios && scenarios.length === 0) {
      testMarkup = (
        <Message info>
            <Message.Header>No test scenarios yet</Message.Header>
            <p>Why don't you create one?</p>
        </Message>   
      )
    } else {
      testMarkup = (     
        <>       
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><Checkbox /></Table.HeaderCell>
                <Table.HeaderCell>Scenario</Table.HeaderCell> 
                <Table.HeaderCell>Reactions</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
            
            {scenarios && scenarios.map(scenario => (    
              <>          
              <Table.Row key={scenario.id}>
                <Table.Cell> <Checkbox /></Table.Cell>
                <Table.Cell  width="8">                     
                      {scenario.scenario}     
                      <br />
                      <Label size="mini" color="purple">Functional</Label> 
                      <Label size="mini" color="orange">Auto</Label>                            
                                                                      
                </Table.Cell>                                                
                <Table.Cell negative={scenario.approvalCount === 0 } textAlign="center">
                  <ApprovalButton key="abc" story={storyId} user={user} testScenario={scenario}></ApprovalButton>&nbsp;
                  <DisapprovalButton key="def" story={storyId} user={user} testScenario={scenario}></DisapprovalButton>&nbsp;
                  <span onClick={() => toggleShowComments(scenario)}><ChatButton key={storyId}   story={storyId} user={user} testScenario={scenario}></ChatButton>&nbsp;</span>
                </Table.Cell>
                <Table.Cell verticalAlign="middle">
                  <Card.Meta>
                    {scenario.username}<br /><i><span style={{fontSize:"xx-small"}}>{moment(scenario.createdAt).fromNow()}</span></i>
                  </Card.Meta>
                </Table.Cell>
                {user && user.username === scenario.username && (                     
                  <Table.Cell textAlign="center">
                    <ScenarioCommentLink handleCallback={handleScenarioCommentCallback} user={user} storyId={storyId} scenarioId={scenario}/>                    
                    <DeleteScenarioButton storyId={storyId} scenarioId={scenario.id} handleCallback={handleCallback} />
                  </Table.Cell>
                  )}
              </Table.Row> 
              {/* Would like to show comments under the scenario.  This is showing the comments under each row, need to fix */}
              {/* <Table.Row>
                <Table.Cell colSpan={4}>
              {showScenarioComments ? (
                <Container >              
                  <ScenarioComments user={user} scenarioId={scenario.id} comments={scenarioComments} commentCount={scenarioComments.length} />            
                </Container>
              ) : null }
              </Table.Cell>
              </Table.Row>   */}
              </>                          
            ))}     
             
            </Table.Body>
          </Table>
          <ExportToCypress 
            testCaseList={scenarios}
            />
          {showScenarioComments ? (
            <Container >                            
              <ScenarioComments user={user} comments={scenarioComments} commentCount={scenarioComments.length} />            
          </Container>
          ) : null }         
                
      </>
      )}
    return testMarkup;
}


export default TestScenarioList;