interface InputPaneProps {
  input: string;
  onInputChange: (value: string) => void;
  onProcess: () => void;
}

export function InputPane({ input, onInputChange, onProcess }: InputPaneProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Input JSON</h2>
      </div>
      <textarea
        className="w-full h-[400px] p-4 border rounded-lg font-mono text-sm"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Paste your JSON here..."
      />
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          onClick={onProcess}
          disabled={!input.trim()}
        >
          Process
        </button>
      </div>
    </div>
  );
} 