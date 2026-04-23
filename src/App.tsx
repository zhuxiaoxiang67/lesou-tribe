import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import WorkDetailPage from './pages/WorkDetailPage';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="work/:id" element={<WorkDetailPage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
