import React from "react";

const RegularList = ({ items, resourceName, itemComponent: ItemComponent }) => {
  return (
    <div className="container mt-4 pb-5">
      {/* 
        Use Bootstrap's responsive grid system to display items in a flexible layout.
        row-cols-* classes determine how many columns will be displayed on different screen sizes.
      */}
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3"
        role="list"
        aria-label="List of items"
      >
        {items ? (
          // Map through the items and render the passed ItemComponent for each item
          items.map((item, i) => (
            <div className="col" key={i} role="listitem">
              <ItemComponent {...{ [resourceName]: item }} />
            </div>
          ))
        ) : (
          // Display a message if no items are found
          <span className="text-light" role="status" aria-live="polite">
            No items found
          </span>
        )}
      </div>
    </div>
  );
};

export default RegularList;
