import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36D7B7;
`;
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=KEAhuYS0_qKr014BfWVEI0QBqV6B25Ue5ehKj4tsQbQ`
      );

      setImages(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      setLoading(true);
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.click();

      // Clean up by revoking the Object URL
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mb-7">
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Search Object"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-2">
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {images.map((image) => (
          <div key={image.id} className="m-2 position-relative">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '8px' }}
              className="img-fluid"
            />
            <button
              onClick={() => handleDownload(image.urls.full, `${image.id}.jpg`)}
              className="btn btn-dark position-absolute bottom-0 end-0 m-3"
            >
              Download
            </button>
          </div>
        ))}
      </div>

      <ClipLoader color="#36D7B7" loading={loading} css={override} size={50} />
    </div>
  );
};

export default App;
