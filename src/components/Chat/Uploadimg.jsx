// import React, { useState, useEffect } from "react";

// function UploadImg() {
//   const [stream, setStream] = useState(null);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: false })
//       .then((stream) => {
//         setStream(stream);
//         const video = document.getElementById("video");
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch((error) => {
//         console.error("Error accessing camera:", error);
//       });
//   }, []);

//   const handleTakePhoto = () => {
//     const canvas = document.getElementById("canvas");
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL("image/png");
//     setImage(imageData);
//   };

//   return (
//     <div>
//       <video clas id="video" width="640" height="480"></video>
//       <canvas id="canvas" width="640" height="480"></canvas>
//       <button onClick={handleTakePhoto}>Take Photo</button>
//       {image && <img src={image} alt="Snapped image" />}
//     </div>
//   );
// }

// export default UploadImg;
