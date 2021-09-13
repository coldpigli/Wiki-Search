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

      </div>
    </div>
    )
}

export default App;
