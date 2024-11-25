import { useState } from "react"


export const Qrcode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("");
    const [qrSize, setQrSize] = useState("");
    console.log(img);
    async function gernerateQR() {
        if (!/^\d+$/.test(qrSize)) {
            alert("Image size must be a number.");
            setQrData("");
            setQrSize("");
            return;
        }
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code//?data=${encodeURIComponent(qrData)}&size=${qrSize}x${qrSize}`;
            setImg(url);

        } catch (err) {
            console.error("Error generating QR code", err)

        } finally {
            setLoading(false)

        }
    }
    function downloadQR() {
        fetch(img).then((response) => response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert("Downloaded");
        }).catch((error) => {
            console.error("Error while downlading QR", error)
        })

    }
    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please wait...</p>}
            {img && <img src={img} alt="QR code" className="qrImage" />}
            <div class="app-content">
                <label htmlFor="dataInput" className="input-label" >
                    Data for QR code
                </label>
                <input type="text" id="dataInput" placeholder="Enter data for generating QR code" value={qrData} onChange={(e) => setQrData(e.target.value)} />
                <label htmlFor="sieInput" className="input-label">
                    Image size(e.g., 150):
                </label>
                <input type="text" value={qrSize} id="sizeInput" placeholder="Enter Image size in pixels" onChange={(e) => setQrSize(e.target.value)} />
                <button className="generate-button" disabled={loading} onClick={gernerateQR}>Generate QR code</button>
                <button className="download-button" onClick={downloadQR}>Download QR code</button>
            </div>
            <p className="footer">Designed By <a href="https://github.com/Subi-coder">Subi-coder!</a></p>
        </div>
    )
}



