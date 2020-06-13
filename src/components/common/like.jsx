import React from 'react';

const Like = (props) => {
  let classes = 'fa';
  classes += props.liked ? 's' : 'r';
  classes += ' fa-heart';
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
