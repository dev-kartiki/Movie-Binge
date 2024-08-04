import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RegularList = ({ items, resourceName, itemComponent: ItemComponent }) => {
  console.log(items);

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {items ? (
          items.map((item, i) => (
            <div className="col" key={i}>
              <ItemComponent {...{ [resourceName]: item }} />
            </div>
          ))
        ) : (
          <span className="text-light">No items found</span>
        )}
      </div>
    </div>
  );
};

export default RegularList;
