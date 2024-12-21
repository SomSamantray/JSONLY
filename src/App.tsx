import { useState } from 'react';
import { Header } from './components/Header';
import { Tagline } from './components/Tagline';
import { OutputPane } from './components/OutputPane';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { InputPane } from './components/InputPane';

function App() {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('beautify');
  const [shouldProcess, setShouldProcess] = useState(false);

  const handleProcess = () => {
    setShouldProcess(true);
  };

  const handleProcessComplete = () => {
    setShouldProcess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <Tagline />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <InputPane 
            input={input} 
            onInputChange={setInput} 
            onProcess={handleProcess} 
          />
          <OutputPane 
            input={input}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            shouldProcess={shouldProcess}
            onProcessComplete={handleProcessComplete}
          />
        </div>
        
        <Features />
      </main>

      <Footer />
    </div>
  );
}

export default App;