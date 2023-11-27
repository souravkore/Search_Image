import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagesFetch from './ImagesFetch';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Image Search App</h1>
      <ImagesFetch />
    </div>
  );
}


export default App;
