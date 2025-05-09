import { useState } from 'react';
import CatGallery from './components/CatGallery';
import CatModal from './components/CatModal';
import './App.scss';

function App() {
  const [selectedCat, setSelectedCat] = useState(null);

  return (
    <div className="app-container">
      <h1>Cat Gallery</h1>
      <CatGallery onImageClick={setSelectedCat} />
      <CatModal imageUrl={selectedCat} onClose={() => setSelectedCat(null)} />
    </div>
  );
}

export default App;