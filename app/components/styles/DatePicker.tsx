import React from "react";
import { TextField, IconButton, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    width: "auto", // Adjust width as needed
    height: "30px", // Adjust height as needed
    margin: "4px",
    fontWeight: "500",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "&:hover": {
      boxShadow: "0 0 10px rgba(0, 0, 255, 0.2)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // ボーダーを消す
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none", // ホバー時もボーダーを消す
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem", // Reduce font size
    padding: "2px",
  },
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  padding: 2, // Reduced padding
  marginRight: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.4rem", // Reduce icon size
  },
}));

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onClick?: () => void;
};

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ onClick, ...props }, ref) => {
    // colorプロパティを除外
    const { size, color, ...otherProps } = props;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <CustomTextField
          {...otherProps}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <CustomIconButton onClick={onClick}>
                <CalendarTodayIcon sx={{ color: "#1b4c6a" }} />
              </CustomIconButton>
            ),
            readOnly: true,
          }}
          inputRef={ref}
        />
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
