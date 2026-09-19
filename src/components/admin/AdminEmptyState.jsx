import React from 'react'

const AdminEmptyState = ({
  icon: Icon,
  message,
}) => {
  return (
    <div className="p-8 text-center">
      <Icon
        size={22}
        className="mx-auto text-(--text-muted)"
      />

      <p className="text-sm text-(--primary) mt-3">
        {message}
      </p>
    </div>
  );
};

export default AdminEmptyState