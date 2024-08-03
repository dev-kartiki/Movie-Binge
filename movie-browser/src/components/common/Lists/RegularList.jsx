import React from "react";
import "../../MovieSearch.css";
const RegularList = ({ items, resourceName, itemComponent: ItemComponent }) => {
  return (
    <div className="display">
      {items.map((item, i) => {
        return (
          <>
            <ItemComponent key={i} {...{ [resourceName]: item }} />
          </>
        );
      })}
    </div>
  );
};

export default RegularList;
