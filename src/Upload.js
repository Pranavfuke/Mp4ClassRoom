    import React from 'react';

    const Upload = ({ onUpload }) => {
    const handleUpload = (e) => {
        const files = e.target.files;
        onUpload(files);
    };

    return (
        <div style={{ padding: 40 }}>
        <h2 style={{ color: '#e0e0e0' }}>Upload Your Content ;)</h2>
        <input
            type="file"
            multiple
            accept="video/*"
            webkitdirectory="true"
            onChange={handleUpload}
            style={{
            backgroundColor: '#2c2c2c',
            color: '#ccc',
            padding: '10px',
            border: '1px solid #444',
            borderRadius: '5px',
            marginTop: '20px'
            }}
        />
        </div>
    );
    };

    export default Upload;


// import React from "react";

// export default function Upload({ videos, setVideos }) {
//   // Handle files upload and create object URLs
//   const handleUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newVideos = files.map((file) => ({
//       name: file.name,
//       url: URL.createObjectURL(file),
//     }));
//     setVideos((prev) => [...prev, ...newVideos]);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Upload Videos (MP4 only)</h2>
//       <input
//         type="file"
//         accept="video/mp4"
//         multiple
//         webkitdirectory="true"
//         onChange={handleUpload}
//         style={{ marginBottom: 20 }}
//         />

//       <div>
//         <h3>Uploaded Videos:</h3>
//         <ul>
//           {videos.map((vid, i) => (
//             <li key={i}>{vid.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
