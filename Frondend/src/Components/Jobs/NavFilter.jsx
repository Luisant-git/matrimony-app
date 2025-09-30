import React, { useState } from "react";
import { Drawer, Button, Menu } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "./NavBar.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";


const NavBar = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track the open dropdown

  const handleMouseEnter = (key) => {
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleMenuClick = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
 

  const categories = [
    {
      title: "Electronics",
      items: [
        {
          header: "Mobiles",
          links: ["Smartphones", "Feature Phones", "Accessories"],
        },
        {
          header: "Laptops",
          links: ["Gaming Laptops", "Business Laptops", "Ultrabooks", "Accessories"],
        },
        {
          header: "Tablets",
          links: ["iPads", "Android Tablets", "Accessories"],
        },
      ],
    },
    {
      title: "TVs & Appliances",
      items: [
        {
          header: "Televisions",
          links: ["LED TVs", "OLED TVs", "4K TVs"],
        },
        {
          header: "Washing Machines",
          links: ["Fully Automatic", "Semi Automatic", "Top Load"],
        },
        {
          header: "Air Conditioners",
          links: ["Split AC", "Window AC", "Inverter AC"],
        },
      ],
    },
    { title: "Men", items: [] },
    { title: "Women", items: [] },
    { title: "Baby & Kids", items: [] },
  ];

  return (
    <div className="w-100">
      {/* Desktop Navigation Bar */}
      <div className="navbar-container">
      <Menu mode="horizontal" className="navbar-menu">
        {categories.map((category, index) => (
          <Menu.Item
            key={index}
            className="nav-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              type="text"
              className="nav-button"
              onClick={() => handleMenuClick(index)}
            >
              {category.title}{" "}
              {openDropdown === index ? <UpOutlined /> : <DownOutlined />}
            </Button>
            {category.items.length > 0 && openDropdown === index && (
              <div
                className="dropdown-container"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {category.items.map((item, idx) => (
                  <div className="dropdown-column" key={idx}>
                    <h6>{item.header}</h6>
                    {item.links.map((link, linkIdx) => (
                      <a href="#" key={linkIdx} className="dropdown-link">
                        {link}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu>
    </div>

      {/* Mobile Filter Drawer */}
      <div className="navbar-mobile">
        <Button type="primary" onClick={showDrawer}>
          Filter
        </Button>
        <Drawer
          title="Filter Options"
          placement="bottom"
          closable={true}
          onClose={closeDrawer}
          open={isDrawerVisible}
          height="70%"
        >
          <div className="filter-options">
            <h5>Sort By</h5>
            <p>Price: Low to High</p>
            <p>Price: High to Low</p>
            <h5>Brand</h5>
            <p>Apple</p>
            <p>Samsung</p>
            <p>Xiaomi</p>
            <h5>Discount</h5>
            <p>10% or more</p>
            <p>20% or more</p>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
