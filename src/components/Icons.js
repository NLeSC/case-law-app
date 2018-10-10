import React from 'react';
const {PropTypes} = React;

const icons = {
  upload: 'M832 64h-640l-192 192v672c0 17.674 14.326 32 32 32h960c17.672 0 32-14.326 32-32v-672l-192-192zM640 640v192h-256v-192h-192l320-256 320 256h-192zM154.51 192l64-64h586.976l64 64h-714.976z',
  download: 'M832 64h-640l-192 192v672c0 17.674 14.326 32 32 32h960c17.672 0 32-14.326 32-32v-672l-192-192zM512 832l-320-256h192v-192h256v192h192l-320 256zM154.51 192l64-64h586.978l64 64h-714.978z',
};

const Icon = props => (
  <svg width="20px" height="20px" viewBox="0 0 1024 1024">
    <path d={icons[props.icon]} fill="#fff"></path>
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;