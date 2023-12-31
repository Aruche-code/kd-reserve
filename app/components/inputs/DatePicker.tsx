import React from "react";

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  // CSSプロパティの型を正確に指定
  const inputStyle: React.CSSProperties = {
    maxWidth: "340px",
    width: "100%",
    height: "45px",
    padding: "0",
    border: "none",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "1rem",
    backgroundColor: "#1b4c6a",
    color: "#ffffff",
  };

  return <input style={inputStyle} {...props} ref={ref} readOnly />;
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
