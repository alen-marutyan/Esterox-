import React, {useEffect, useState} from "react";

function App() {
  const [file, setFile] = useState([]);
  const [result, setResult] = useState(null);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/jpeg");

  useEffect(()=>{
    setResult(null)
  },[file])

  const sendHandle = async (e) => {
    e.preventDefault();
    fetch("/upload", {
      method: 'POST',
      headers: myHeaders,
      body: file,
    })
        .then(response => response.text())
        .then(result => setResult(result))
        .catch(error => setResult( error));
  }

  return (
    <div className="App">
      <h1>Result: {result}</h1>
      <form encType="multipart/form-data">
        <input onChange={event => setFile(event.target.files[0])} type="file"/>
        <input onClick={event => sendHandle(event)} type="submit" value='Send'/>
      </form>
    </div>
  );
}

export default App;

