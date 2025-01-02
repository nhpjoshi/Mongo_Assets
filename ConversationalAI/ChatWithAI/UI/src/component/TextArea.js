// src/component/TextArea.js
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TextArea.css"; // Import custom CSS

const TextArea = ({ value, readOnly, rows, placeholder }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the bottom whenever the `value` changes
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [value]);

  return (
    <div className="form-group mt-3">
      <textarea
        ref={textAreaRef}
        value={value}
        readOnly={readOnly}
        rows={rows}
        className="form-control invisible-textarea" // Apply the invisible class
        placeholder={placeholder}
      />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  readOnly: true,
  rows: 6,
  placeholder: "The AI response will appear here.",
};

export default TextArea;
