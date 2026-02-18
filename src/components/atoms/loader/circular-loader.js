import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Image from "next/image";
import { Dialog, DialogContent } from "@mui/material";
import { callAsset } from "@/utils/asset";

export const CircularProgressModal = ({ open, progress = 0, title, description }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="circular-progress-modal"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "400px",
            padding: "15px 0",
          },
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        },
      }}
    >

      <DialogContent
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ width: 130, height: 130 }} className="justify-self-center">
          <CircularProgressbar
            value={progress}
            styles={buildStyles({
              pathColor: "#00529C",
              trailColor: "#d6d6d6",
            })}
          />
          <div
            style={{
              position: "absolute",
              top: "36%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 100,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Image
              src={callAsset("/images/brispot-logo.png")}
              alt="center-logo"
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
        <div className="text-lg font-bold text-center mt-3 mb-2"> {title} </div>
        <div className="text-center"> {description} </div>
      </DialogContent>
    </Dialog>
  );
};