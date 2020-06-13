import React from 'react';

const Like = ({ liked, onClick }) => {
  let classes = `fa${liked ? 's' : 'r'} fa-heart`;
  return (
    <i
      onClick={onClick}
      className={`${classes} clickable`}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
