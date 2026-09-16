import React from 'react'

const QuickAction = ({
  icon: Icon,
  title,
  description,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        p-5
        text-left
        hover:bg-(--bg-light)/50
        transition
      "
    >
      <Icon
        size={19}
        className="text-(--primary)"
      />

      <p className="text-sm font-semibold text-(--primary) mt-4">
        {title}
      </p>

      <p className="text-xs text-(--text-muted) mt-1">
        {description}
      </p>
    </button>
  );
};

export default QuickAction