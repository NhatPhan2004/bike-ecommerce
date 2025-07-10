import React, { useState } from "react";
import "../../../../style/components/filterSidebar.scss";

const filters = [
  {
    type: "brand",
    title: "BRAND",
    options: [
      { label: "BlueSolis Bike", value: "Solis Bike" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    type: "color",
    title: "COLOR",
    options: [
      { label: "Black", value: "Black" },
      { label: "White", value: "White" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    type: "price",
    title: "PRICE LEVEL",
    options: [
      { label: "Price under 5,000,000₫", value: "under-5m" },
      { label: "10,000,000₫ - 15,000,000₫", value: "10m-15m" },
      { label: "15,000,000₫ - 20,000,000₫", value: "15m-20m" },
      { label: "Price above 20,000,000₫", value: "above-20m" },
    ],
  },
];

const FilterSidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (groupType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [groupType]: prev[groupType] === value ? null : value, // toggle nếu click lại
    }));
  };

  return (
    <aside className="filter-sidebar">
      <h2 className="filter-sidebar__title">BIKE-BLUESOLIS</h2>
      {filters.map((group) => (
        <div key={group.type} className="filter-group" data-type={group.type}>
          <h4 className="filter-group__title">{group.title}</h4>
          {group.options.map((opt, i) => (
            <label key={i} className="filter-group__option">
              <input
                type="checkbox"
                value={opt.value}
                checked={selectedFilters[group.type] === opt.value}
                onChange={() => handleCheckboxChange(group.type, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
