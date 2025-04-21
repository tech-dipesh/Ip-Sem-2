import React from 'react';

interface SuggestionsProps {
  data: string[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ data }) => {
  return (
    <div className="suggestions">
      <h2>Suggestions</h2>
      <ul>
        {data.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
