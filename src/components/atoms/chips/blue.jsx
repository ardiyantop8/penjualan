import { ButtonDefault } from "../buttons/default";

export default function ChipsBlue({ items = [], selected, onClick, ...props }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <ButtonDefault
          key={index}
          sx={{
            position: "sticky",
            px: "22px",
            mb: "12px",
            borderRadius: "99999px",
          }}
          className="justify-center"
          model={item === selected ? "fill" : "outline"}
          color="#00529C"
          onClick={onClick}
          {...props}
        >
          {item}
        </ButtonDefault>
      ))}
    </div>
  );
}
