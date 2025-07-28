import "@style/components/businessHours.scss";

const hours = [
  { label: "Monday – Friday", value: "9:00 am – 8:00 pm" },
  { label: "Saturday", value: "9:00 am – 6:00 pm" },
  { label: "Sunday", value: "9:00 am – 5:00 pm" },
];

export default function BusinessHours() {
  return (
    <div className="business-hours">
      <h2 className="business-hours__title">BUSINESS HOURS</h2>
      {hours.map((hour) => (
        <div key={hour.label} className="business-hours__item">
          <span>{hour.label}</span>
          <span>{hour.value}</span>
        </div>
      ))}
    </div>
  );
}
