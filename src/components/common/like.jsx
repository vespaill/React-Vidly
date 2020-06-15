import React from 'react';

const Like = ({ liked, onClick }) => {
  return (
    <i
      onClick={onClick}
      className={`fa${liked ? 's' : 'r'} fa-heart clickable`}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
