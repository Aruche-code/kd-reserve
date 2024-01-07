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
    outline: "none",
    border: "none",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "1rem",
    backgroundColor: "#1facf3",
    color: "#ffffff",
  };

  return <input style={inputStyle} {...props} ref={ref} readOnly />;
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
