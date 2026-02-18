import { TextLabel } from "@/components/atoms/typographies/label";
import { TextField } from "@mui/material";
import React, { useState } from "react";

const ImagePasteComponent = () => {
  const [imageSrc, setImageSrc] = useState("");

  const handlePaste = async (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedImage = clipboardData.items[0];

    if (pastedImage && pastedImage.type.startsWith("image")) {
      const blob = pastedImage.getAsFile();
      const imageUrl = URL.createObjectURL(blob);

      // Set the image source
      setImageSrc(imageUrl);
    }
  };

  const handleKeyDown = (event) => {
    // Check if backspace or delete key is pressed
    if (event.key === "Backspace" || event.key === "Delete") {
      // Clear the image source
      setImageSrc("");
    }
  };

  return (
    <div>
      <TextLabel className="my-2">Paste Image</TextLabel>
      {imageSrc ? (
        <input
          type="image"
          id="image"
          alt="image"
          src={imageSrc}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          width="60%"
        />
      ) : (
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          className="w-full"
          onPaste={handlePaste}
          placeholder="Paste your image here"
          disabled
          multiline
          rows={10}
          InputProps={{
            style: {
              borderRadius: "10px",
              width: "60%",
            },
          }}
        />
      )}
    </div>
  );
};

export default ImagePasteComponent;
