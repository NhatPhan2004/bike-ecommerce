// src/components/LoadingSpinner.jsx
import React from "react";
import "@style/components/loadingSpinner.scss";
const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
