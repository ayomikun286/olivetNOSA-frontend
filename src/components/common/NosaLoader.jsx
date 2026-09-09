import "./Loader.css"

const NosaLoader = () => {
  return (
    <div className="nosa-loader">
      <div className="nosa-loader-container">
        <div className="nosa-loader-ring"></div>

        <img
          src="/images/olivetNOSA_logo.png"
          alt="Olivet NOSA"
          className="nosa-loader-logo"
        />
      </div>
    </div>
  );
};

export default NosaLoader;