import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  
  const [searchTerm, setSearchTerm] = useState('whiplash');
  const [meanings, setMeanings] = useState([]);

  useEffect(()=>{
    //calling API here
    const searchCall = async () =>{
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: searchTerm,
        },
      });
      setMeanings(data.query.search);
    }
    searchCall();

  },[searchTerm]);

  const renderedResults = meanings.map((meaning)=>{
    return (
      <div key={meaning.pageid} className = "item">
        <div className = "right floated content">
          <a className = "ui button" 
            href = {`https://en.wikipedia.org?curid=${meaning.pageid}`}
          >Source</a>
        </div>
        <div className = "content">
          <div className = "header">{meaning.title}</div>
            <span dangerouslySetInnerHTML={{ __html: meaning.snippet}}></span>
        </div>
      </div>
    )
  })
  
  return (
    <div className = "ui container">
      <h1>Wiki-Search</h1>
      <div className = "ui form">
        <div className = "field">
          <input
            className = "input"
            placeholder = "Look up meanings"
            value = {searchTerm}
            onChange = {(e)=>{setSearchTerm(e.target.value)}}
          />
        </div>

        <div className = "ui celled list">
          {renderedResults}
        </div>

      </div>
    </div>
    )
}

export default App;
