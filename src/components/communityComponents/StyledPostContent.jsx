// src/components/StyledPostContent.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you have 'react-router-dom' installed

// This component takes the raw content string from your database as a prop
const StyledPostContent = ({ content }) => {
  // This Regex is designed to find and capture the parts of the mention markup
  // It looks for the pattern: @[DisplayName](ID)
  const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;

  // We split the content string by this pattern. 
  // The captured parts (DisplayName and ID) will be included in the resulting array.
  const parts = content.split(mentionRegex);

  return (
    // whitespace-pre-wrap ensures that line breaks from the input are preserved
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        // The logic for reassembling the parts into text and links
        // Based on how split() works with a capturing regex, the DisplayName will always be at indices 1, 4, 7, etc.
        if (index > 0 && (index - 1) % 3 === 0) {
          const displayName = part;
          const username = parts[index + 1]; // The ID/username immediately follows the DisplayName in the array
          
          // Render a clickable Link for the mention
          return (
            <Link key={index} to={`/profile/${username}`} className="mention-highlight">
              @{displayName}
            </Link>
          );
        }
        
        // This is the ID/username part of the array. We've already used it, so we render nothing.
        if (index > 0 && (index - 2) % 3 === 0) {
          return null;
        }

        // This is a regular piece of text, so we render it as is.
        return part;
      })}
    </p>
  );
};

export default StyledPostContent;