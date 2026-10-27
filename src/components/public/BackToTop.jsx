import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      aria-label="Back to top"
      title="Back to top"
      className="
        fixed bottom-6 right-6 z-50
        flex h-11 w-11 items-center justify-center
        rounded-full
        bg-(--primary) text-white
        shadow-lg
        hover:bg-(--primary-dark)
        hover:-translate-y-1
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-(--primary)
        transition-all duration-200
      "
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;