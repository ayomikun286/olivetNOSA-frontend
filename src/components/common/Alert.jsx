import React from "react";
import "./Loader.css"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const Alert = ({
  type = "success",
  title,
  message,
  onClose,
}) => {
  const icons = {
    success: <CheckCircle />,
    error: <XCircle />,
    warning: <AlertTriangle />,
    info: <Info />,
  };

  return (
    <div className={`nosa-alert nosa-alert-${type}`}>
      <div className="nosa-alert-icon">
        {icons[type]}
      </div>

      <div className="nosa-alert-content">
        {title && <h4>{title}</h4>}
        <p>{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          className="nosa-alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;