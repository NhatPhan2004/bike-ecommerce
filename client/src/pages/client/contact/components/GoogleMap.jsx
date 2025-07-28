import "@style/components/googleMap.scss";

export default function GoogleMap() {
  return (
    <div className="google-map">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.30126757086!2d105.78657997410318!3d20.98055738065668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1753543403895!5m2!1svi!2s"
        allowFullScreen=""
        loading="lazy"
        width="100%"
        height="400"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
