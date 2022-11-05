// todo
import Avatar from "react-avatar";

// todo
export default function AvatarIcon({ name }) {
  return (
    <Avatar
      name={name}
      round={true}
      size="50"
      style={{ pointerEvents: "none", fontSize: "60px" }}
    />
  );
}
