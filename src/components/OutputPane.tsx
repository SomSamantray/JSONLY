import { useEffect, useState } from 'react';
import { FileJson, FileText, FileSpreadsheet } from 'lucide-react';
import { OutputTab } from './OutputTab';
import { API_URL } from '../config';

interface OutputPaneProps {
  input: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  shouldProcess: boolean;
  onProcessComplete: () => void;
}

const tabs = [
  { id: 'beautify', label: 'Beautified', icon: FileJson },
  { id: 'xml', label: 'XML', icon: FileText },
  { id: 'csv', label: 'CSV', icon: FileSpreadsheet },
];

export function OutputPane({ input, activeTab, onTabChange, shouldProcess, onProcessComplete }: OutputPaneProps) {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (shouldProcess) {
      processData();
      onProcessComplete();
    }
  }, [shouldProcess, input, activeTab]);

  const processData = async () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Validate JSON before sending
      try {
        JSON.parse(input); // Check if input is valid JSON
      } catch (e) {
        throw new Error('Invalid JSON input. Please check your syntax.');
      }

      let endpoint = `${API_URL}/api/`;
      switch (activeTab) {
        case 'beautify':
          endpoint += 'beautify';
          break;
        case 'xml':
          endpoint += 'convert/xml';
          break;
        case 'csv':
          endpoint += 'convert/csv';
          break;
        default:
          endpoint += 'beautify';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          data: input 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        setError(result.error);
        setOutput('');
      } else {
        setOutput(result.data);
        setError('');
      }
    } catch (err) {
      console.error('Error details:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to process the request. Please try again.');
      }
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `output.${activeTab === 'beautify' ? 'json' : activeTab}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <OutputTab
            key={tab.id}
            {...tab}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
      
      <div className="h-[400px] p-4 border rounded-lg font-mono text-sm overflow-auto">
        {loading ? (
          <p className="text-gray-500">Processing...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <p className="text-gray-500">Click Process to see the output...</p>
        )}
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button 
          className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
            copySuccess ? 'bg-green-50 text-green-600' : ''
          }`}
          onClick={handleCopy}
          disabled={!output}
        >
          {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button 
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={handleDownload}
          disabled={!output}
        >
          Download
        </button>
      </div>
    </div>
  );
}