import React from "react";

const Loading = ({ loading, error, children }) => {
  return (
    <>
      {loading ? (
        <p>loading please wait...</p>
      ) : error ? (
        <p style={{color: "red"}}>{error}</p>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;