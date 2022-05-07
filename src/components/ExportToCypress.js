import { update } from 'lodash'
import React, { useEffect, useState } from 'react'

export const ExportToCypress = ({testCases}) => {
  // set up local state for generating the download link
  const [downloadLink, setDownloadLink] = useState('')

  // function for generating file and set download link
  const makeTextFile = (testCases) => {
    // This creates the file. 
    // In my case, I have an array, and each item in 
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const startBlock = `
        describe('scenarios', () => {    
    `
    const testTemplate = `            
        it('storyName', () => {
            assert.fail('Not implemented');            
        })    
    `
    const endBlock = `
        })
    `
    
    
    let updatedTemplate;
    let finalTemplate=[];
    testCases = ["abc", "def"];
    
    finalTemplate.push(startBlock);
    Object.values(testCases).map((testCase) => {
        updatedTemplate = testTemplate
            .replace('storyName', "hello story")
            .replace('epicName', "the epic");
        finalTemplate.push(updatedTemplate);
    })
    finalTemplate.push(endBlock);

    const data = new Blob(finalTemplate, { type: 'text/plain' })

    // this part avoids memory leaks
    if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data))
  }

  // Call the function if list changes
  useEffect(() => {
    makeTextFile()
  }, [testCases])

  return (
    <a
      // this attribute sets the filename
      download='testcases.js'
      // link to the download URL
      href={downloadLink}
    >
      download
    </a>
  )
}

export default ExportToCypress