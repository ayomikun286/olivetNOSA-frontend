import React from 'react'

const AdminSection = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
      <div className="p-5 border-b border-(--border)">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-(--primary)">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-(--secondary) mt-1">
                {description}
              </p>
            )}
          </div>

          {Icon && (
            <Icon
              size={20}
              className="text-(--secondary)"
            />
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default AdminSection