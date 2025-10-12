import "@style/components/businessHours.scss";

const hours = [
  { label: "Thứ 2 – Thứ 6", value: "9:00 am – 8:00 pm" },
  { label: "Thứ 7", value: "9:00 am – 6:00 pm" },
  { label: "Chủ nhật", value: "9:00 am – 5:00 pm" },
];

export default function BusinessHours() {
  return (
    <div className="business-hours">
      <h2 className="business-hours__title">Giờ làm việc</h2>
      {hours.map((hour) => (
        <div key={hour.label} className="business-hours__item">
          <span>{hour.label}</span>
          <span>{hour.value}</span>
        </div>
      ))}
    </div>
  );
}
