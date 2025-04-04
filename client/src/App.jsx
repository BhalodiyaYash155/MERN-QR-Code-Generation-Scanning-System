import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";
import "./App.css"; // Add styles here

function App() {
  const [qr, setQr] = useState("");
  const [url, setUrl] = useState("");

  const QrCodeDownload = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    const dataURL = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = dataURL;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const QrCodeCopy = async () => {
    const canvas = await html2canvas(document.getElementById("canvas"));
    const dataURL = canvas.toDataURL();
    setQr(dataURL);
    navigator.clipboard.writeText(dataURL);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Generate QR Code</h1>
        <p>Enter text or a link to generate a QR code instantly.</p>

        <input
          type="text"
          placeholder="Enter your data..."
          onChange={(e) => setUrl(e.target.value)}
          className="input-box"
        />

        <div className="qr-section">
          <div id="canvas" className="qr-box">
            <QRCodeCanvas
              value={url || "https://example.com"}
              size={250}
              bgColor={"#ffffff"}
              fgColor={"#2d89ef"}
              level={"H"}
              includeMargin={false}
            />
          </div>
        </div>

        <div className="btn-group">
          <button onClick={QrCodeDownload} className="btn download">
            <AiOutlineDownload /> Download
          </button>
          <button onClick={QrCodeCopy} className="btn copy">
            <AiFillCopy /> Copy
          </button>
        </div>
      </div>

      <footer>
        <p>Built with ❤️ by Yash Bhalodiya</p>
      </footer>
    </div>
  );
}

export default App;
