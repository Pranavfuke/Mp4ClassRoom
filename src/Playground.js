import React, { useState, useEffect, useRef } from 'react';

const Playground = ({ videos }) => {
  const [current, setCurrent] = useState(0);
  const [videoURLs, setVideoURLs] = useState([]);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  // Create object URLs when videos change
  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const urls = videos.map((video) => URL.createObjectURL(video));
    setVideoURLs(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      setVideoURLs([]);
    };
  }, [videos]);

  // Keyboard controls: left/right arrow to seek video, 'f' for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return; // ignore typing

      if (!videoRef.current) return;

      switch (e.key) {
        case 'ArrowRight':
          // Forward 10 seconds
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration,
            videoRef.current.currentTime + 5
          );
          break;
        case 'ArrowLeft':
          // Backward 10 seconds
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          break;
        case 'f':
        case 'F':
          if (
            document.fullscreenElement === videoRef.current ||
            document.webkitFullscreenElement === videoRef.current
          ) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
          } else {
            if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
            else if (videoRef.current.webkitRequestFullscreen) videoRef.current.webkitRequestFullscreen();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay next video with 3s delay after current video ends
  useEffect(() => {
    const videoEl = videoRef.current;

    if (!videoEl) return;

    const handleEnded = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % videos.length);
      }, 3000); // 3 seconds delay
    };

    videoEl.addEventListener('ended', handleEnded);

    return () => {
      videoEl.removeEventListener('ended', handleEnded);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, videos.length]);

  if (!videos.length) return <p style={{ padding: 40, color: '#ccc' }}>No videos loaded</p>;

  return (
    <div style={{ padding: 40, display: 'flex', gap: '30px', height: '80vh' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <video
          ref={videoRef}
          key={current}
          controls
          autoPlay
          style={{ width: '100%', height: '100%', backgroundColor: '#000', borderRadius: '8px' }}
          src={videoURLs[current]}
        />
        {/* <p style={{ marginTop: 10, color: '#ccc', userSelect: 'text' }}>{videos[current].name}</p>
        <p style={{ color: '#666', fontSize: '0.9em' }}>
          Controls: ←/→ to seek 10s backward/forward, F for fullscreen
        </p>
        <p style={{ color: '#666', fontSize: '0.8em', marginTop: 5 }}>
          Next video in 5 seconds after current ends...
        </p> */}
      </div>

      <div
        style={{
          width: '280px',
          backgroundColor: '#2c2c2c',
          borderRadius: '8px',
          padding: '10px',
          overflowY: 'auto',
          maxHeight: '100%',
          border: '1px solid #444',
        }}
      >
        <h3 style={{ color: '#e0e0e0', marginBottom: '10px' }}>Playlist</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {videos.map((video, index) => (
            <li
              key={index}
              onClick={() => setCurrent(index)}
              style={{
                backgroundColor: current === index ? '#505050' : '#2c2c2c',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#ccc',
                border: current === index ? '2px solid #777' : '1px solid #444',
                userSelect: 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (current !== index) e.currentTarget.style.backgroundColor = '#3a3a3a';
              }}
              onMouseLeave={(e) => {
                if (current !== index) e.currentTarget.style.backgroundColor = '#2c2c2c';
              }}
            >
              {index + 1}. {video.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playground;






