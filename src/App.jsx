import React, { useEffect, useState } from 'react';
import axios from 'axios';
import he from 'he';
import './App.css';

function App() {
  const [datas, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.reddit.com/r/reactjs.json');
        setData(response.data.data.children);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="app-container">
      <h1 style={{ color: '#ff0000' }}>reddit</h1>
        {datas &&
          datas.map((post, index) => (
            <div key={index} className="post-card" >
              <h2>{post.data.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.data.selftext_html ? he.decode(post.data.selftext_html) : '' }}></div>
              <p>
                URL: <a href={post.data.url} target="_blank" rel="noopener noreferrer">{post.data.url}</a>
              </p>
              <p>Score: {post.data.score}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
