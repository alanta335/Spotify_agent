import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, isUser, timestamp }) => {
  // Parse the message if it's from the AI (JSON response)
  const renderMessage = () => {
    if (isUser) {
      return <p className="text-sm leading-relaxed">{message}</p>;
    }
    
    try {
      // If message is already parsed JSON, use it directly
      const content = typeof message === 'string' ? message : message.content?.message || message;
      
      return (
        <div className="text-sm leading-relaxed">
          <ReactMarkdown 
            components={{
              // Custom renderers for markdown elements
              h1: ({children}) => <h1 className="text-xl font-bold mt-2 mb-1">{children}</h1>,
              h2: ({children}) => <h2 className="text-lg font-bold mt-2 mb-1">{children}</h2>,
              h3: ({children}) => <h3 className="text-base font-bold mt-2 mb-1">{children}</h3>,
              p: ({children}) => <p className="mb-2 text-sm">{children}</p>,
              ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
              li: ({children}) => <li className="mb-1 text-sm">{children}</li>,
              strong: ({children}) => <strong className="font-bold text-green-400">{children}</strong>,
              em: ({children}) => <em className="italic text-gray-300">{children}</em>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-green-500 pl-3 my-2 text-gray-300 italic">
                  {children}
                </blockquote>
              ),
              code: ({inline, children}) => 
                inline ? (
                  <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">{children}</code>
                ) : (
                  <pre className="bg-gray-900 p-2 rounded mb-2 overflow-x-auto">
                    <code className="text-xs">{children}</code>
                  </pre>
                ),
              hr: () => <hr className="my-3 border-gray-600" />,
              a: ({href, children}) => (
                <a href={href} className="text-green-400 hover:text-green-300 underline" 
                   target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    } catch (error) {
      // Fallback to plain text if parsing fails
      return <p className="text-sm leading-relaxed">{message}</p>;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isUser 
          ? 'bg-green-500 text-black' 
          : 'bg-gray-800 text-white'
      }`}>
        <div className="flex items-start space-x-3">
          {!isUser && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4.61 14.44c-.25.37-.77.49-1.14.24-3.11-1.9-7.02-2.33-11.62-1.28-.44.13-.88-.17-1.01-.61-.13-.44.17-.88.61-1.01 5.1-1.15 9.47-.67 12.98 1.48.37.25.49.77.24 1.14l-.06.04z"/>
              </svg>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">
              {isUser ? 'You' : 'Spotify AI'}
            </p>
            {renderMessage()}
            {timestamp && (
              <p className={`text-xs mt-2 ${
                isUser ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {timestamp}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
