'use client';

interface PlaceholderComponentProps {
  title: string;
  height?: string;
}

export default function PlaceholderComponent({ title, height = "h-60" }: PlaceholderComponentProps) {
  return (
    <div className={`w-full ${height} bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4`}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 rounded-full bg-gray-200 mb-3 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 text-gray-400"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          This is a placeholder for the {title} component.
          <br />Data will be displayed here when available.
        </p>
      </div>
    </div>
  );
}