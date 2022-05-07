import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'


const SectionBreadCrumb = ({trunk, branch, leaf}) => (  
  <>
  <Breadcrumb>
    <Breadcrumb.Section  href={`/${trunk}/epics`}>{trunk}</Breadcrumb.Section>
    {branch ? <Breadcrumb.Divider /> : <></> }
    
    <Breadcrumb.Section>{branch ? branch : ""}</Breadcrumb.Section>
    {leaf ? <Breadcrumb.Divider /> : <></>}    
    <Breadcrumb.Section active>{leaf}</Breadcrumb.Section>    
  </Breadcrumb>
  <div style={{paddingBottom: "1%"}}></div>
  </>
)


export default SectionBreadCrumb