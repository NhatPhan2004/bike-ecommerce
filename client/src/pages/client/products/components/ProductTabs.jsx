// Tabs chuyển đổi giữa mô tả, đổi trả, giao hàng
import React, { useState } from "react";
import "@style/components/productTabs.scss";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="tabs__content active">
            <p>
              In today's fast-paced world, the demand for bicycles transcends
              mere transportation – they must deliver convenience, aesthetic
              appeal, and superior comfort. The Alight 3 DD Disc stands as the
              ultimate urban cycling solution for modern women, masterfully
              fulfilling all these expectations.
            </p>
            <h3>STANDOUT FEATURES::</h3>
            <ul>
              <li>
                <strong>Shimano 3x7 Speed Drivetrain</strong> (21-speed gearing)
                enables effortless speed adjustment for varied terrain – from
                flat city streets to gentle urban slopes.
              </li>
              <li>
                <strong>Mechanical Disc Brakes</strong> Delivering powerful,
                consistent stopping power – especially reliable in wet weather
                and slippery road conditions.
              </li>
              <li>
                <strong>700C Wheels with Sleek Tires,</strong> Featuring
                lightweight tread patterns for quick acceleration, smooth
                rolling, and effortless urban riding.
              </li>
              <li>
                <strong>Integrated Kickstand,</strong> Ready when you are – park
                instantly anywhere in the city.
              </li>
            </ul>
            <h3>Ideal For:</h3>
            <ul>
              <li>
                {" "}
                Women seeking a beautiful, lightweight bicycle that’s easy to
                handle and versatile for all occasions.
              </li>
              <li>
                Office workers, students, and daily riders – perfect for both
                transportation and light fitness.
              </li>
              <li>
                Beginners who want a comfortable, stable introduction to
                cycling.
              </li>
            </ul>
          </div>
        );
      case 1:
        return (
          <div className="tabs__content active">
            <p>
              EGA Bike is committed to providing a convenient and fast shopping
              experience for customers through flexible and professional
              delivery policies. Below are the detailed delivery policy
              information:
            </p>
            <h3>1. Delivery Coverage</h3>
            <ul>
              <li>
                EGA Bike offers nationwide delivery services, including both
                urban and rural areas.
              </li>
            </ul>
            <h3>2. Delivery Time</h3>
            <ul>
              <li>
                <strong>Urban areas:</strong> For orders within the city,
                delivery time is 1–2 working days.
              </li>
              <li>
                <strong>Suburban and other provinces:</strong> Delivery time
                ranges from 3–5 working days depending on distance and transport
                conditions.
              </li>
            </ul>
            <h3>3. Delivery Fees</h3>
            <ul>
              <li>
                <strong>Urban areas:</strong> Free shipping for orders worth
                500,000 VND or more. For orders under 500,000 VND, the shipping
                fee will be calculated based on distance.
              </li>
              <li>
                <strong>Suburban and other provinces:</strong> Shipping fees are
                based on the product’s weight, size, and delivery distance.
                Customers will be informed of the specific shipping cost before
                completing the order.
              </li>
            </ul>
            <h3>4. Product Packaging</h3>
            <ul>
              <li>
                Products are carefully packed to ensure safety during
                transportation. For fragile or high-value items, we apply
                special protective measures.
              </li>
            </ul>
            <h3>5. Order Tracking</h3>
            <ul>
              <li>
                Customers can track the status of their orders via the tracking
                code provided once the order is shipped. This information will
                be sent via email or SMS.
              </li>
            </ul>
            <h3>6. Return & Exchange Policy</h3>
            <ul>
              <li>
                In case of damaged, incorrect, or mismatched products, customers
                may request a return or exchange within 7 days from the delivery
                date. EGA Bike will cover shipping costs for returns due to our
                fault.
              </li>
            </ul>
            <h3>7. Customer Support</h3>
            <ul>
              <li>
                If you have any questions or need support regarding delivery
                issues, please contact EGA Bike’s customer service team via
                phone or email. We are always ready to assist you.
              </li>
            </ul>
            <p>
              We aim to bring absolute satisfaction to our customers with every
              order. Trust and choose EGA Bike for your biking journeys!
            </p>
          </div>
        );

      case 2:
        return (
          <div className="tabs__content active">
            <h3>1. Return & Exchange Conditions</h3>
            <p>
              Customers are required to check the condition of the goods and may
              return or exchange the products at the time of delivery/receipt in
              the following cases:
            </p>
            <ul>
              <li>
                The item is not the correct type or model as ordered, or does
                not match the description on the website at the time of
                purchase.
              </li>
              <li>
                The quantity is incorrect, or the item set is incomplete
                compared to the order.
              </li>
              <li>
                The product is externally damaged such as torn packaging,
                peeling, or breakage, etc.
              </li>
            </ul>
            <p>
              Customers are responsible for providing supporting documents to
              prove the issue in order to complete the return/exchange process.
            </p>

            <h3>2. Regulations on Notification Time and Product Return</h3>
            <ul>
              <li>
                <strong>Notification time for return/exchange:</strong> within
                48 hours from the time of receiving the product, in cases such
                as missing accessories, gifts, or product damage.
              </li>
              <li>
                <strong>Time to send back the product:</strong> within 14 days
                from the date of receiving the product.
              </li>
              <li>
                <strong>Return address:</strong> Customers may return products
                directly to our office/store or send them by post.
              </li>
            </ul>
            <p>
              If you have any feedback or complaints regarding product quality,
              please contact our customer care hotline.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="tabs">
      <div className="tabs__nav">
        <div
          className={`tabs__tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          Product Description
        </div>
        <div
          className={`tabs__tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Shipping Policy
        </div>
        <div
          className={`tabs__tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Return Policy
        </div>
      </div>

      <div className="tabs__body">{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;
