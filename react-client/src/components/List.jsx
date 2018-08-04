import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.websites.length } websites.
    { props.websites.map(website => <ListItem website={website}/>)}
  </div>
)

export default List;