import React, { useState } from 'react';
import Upload from './Upload';
import Playground from './Playground';

function App() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState('upload');

  const handleUpload = (files) => {
    const videoFiles = Array.from(files).filter(file => file.type.includes('video'));
    setVideos(videoFiles);
    setPage('playground');
  };

  return (
    <div style={{ backgroundColor: '#1e1e1e', minHeight: '100vh', color: '#ccc' }}>
      <header style={{ padding: 20, textAlign: 'center', borderBottom: '1px solid #333' }}>
        <h1 style={{ color: '#e0e0e0' }}>MP4 to ClassRoom</h1>
      </header>
      {page === 'upload' ? (
        <Upload onUpload={handleUpload} />
      ) : (
        <Playground videos={videos} />
      )}
    </div>
  );
}

export default App;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Upload from "./Upload";
// import Playground from "./Playground";

// export default function App() {
//   // State for uploaded videos (array of {name, url})
//   const [videos, setVideos] = useState([]);

//   return (
//     <Router>
//       <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
//         <Link to="/" style={{ marginRight: 20, color: "white" }}>
//           Upload
//         </Link>
//         <Link to="/playground" style={{ color: "white" }}>
//           Playground
//         </Link>
//       </nav>
//       <Routes>
//         <Route
//           path="/"
//           element={<Upload videos={videos} setVideos={setVideos} />}
//         />
//         <Route path="/playground" element={<Playground videos={videos} />} />
//       </Routes>
//     </Router>
//   );
// }
