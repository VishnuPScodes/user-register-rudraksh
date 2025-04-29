import { useState, useEffect } from "react";

// DotsLoader without Tailwind CSS
export default function DotsLoader({
  size = 20,
  color = "white",
  loading = true,
}) {
  const [dotOpacity, setDotOpacity] = useState([1, 0.5, 0.2]);

  // Animation effect
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDotOpacity((prev) => [prev[2], prev[0], prev[1]]);
    }, 300);

    return () => clearInterval(interval);
  }, [loading]);

  // Container style
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: size,
  };

  // Dot style function
  const getDotStyle = (opacity) => ({
    width: size / 3,
    height: size / 3,
    backgroundColor: color,
    borderRadius: "50%",
    opacity: opacity,
    margin: "0 4px",
  });

  // Only render if loading is true
  if (!loading) return null;

  return (
    <div style={containerStyle}>
      {dotOpacity.map((opacity, i) => (
        <div key={i} style={getDotStyle(opacity)} />
      ))}
    </div>
  );
}
