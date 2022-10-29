import React from "react";

const Loading = () => {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border spinner-border-lg" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
