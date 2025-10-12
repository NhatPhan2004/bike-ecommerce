import React, { useState } from "react";
import "@style/components/filterSidebar.scss";
const filters = [
  {
    type: "brand",
    title: "THƯƠNG HIỆU",
    options: [
      { label: "MARTIN", value: "Martin" },
      { label: "ASAMA", value: "Asama" },
      { label: "GALAXY", value: "Galaxy" },
      { label: "FORNIX", value: "Fornix" },
    ],
  },

  {
    type: "color",
    title: "MÀU SẮC",
    options: [
      { label: "Đen", value: "Black" },
      { label: "Trắng", value: "White" },
      { label: "Khác", value: "Other" },
    ],
  },
  {
    type: "price",
    title: "MỨC GIÁ",
    options: [
      { label: "Giá dưới 5,000,000₫", value: "under-5m" },
      { label: "10,000,000₫ - 15,000,000₫", value: "10m-15m" },
      { label: "15,000,000₫ - 20,000,000₫", value: "15m-20m" },
      { label: "Giá trên 20,000,000₫", value: "above-20m" },
    ],
  },
];

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (groupType, value) => {
    setSelectedFilters((prev) => {
      const currentValue = prev[groupType]?.[0];

      const updated = {
        ...prev,
        [groupType]: currentValue === value ? [] : [value],
      };

      onFilterChange && onFilterChange(updated);
      return updated;
    });
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
                checked={(selectedFilters[group.type] || []).includes(
                  opt.value
                )}
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
