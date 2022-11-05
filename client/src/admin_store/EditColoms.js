// todo
import { MdPlaylistAdd, MdBorderColor, MdDelete } from "react-icons/md";

// todo
export function Edit() {
  // ?
  return (
    <MdBorderColor color="green" size={22} style={{ cursor: "pointer" }} />
  );
}

// todo
export function Del() {
  // ?
  return <MdDelete color="orange" size={25} style={{ cursor: "pointer" }} />;
}

// todo
export function Add({ str }) {
  // ?
  return (
    <button className="btn btn-info px-3 py-1 float-right">
      {str} <MdPlaylistAdd size={27} />
    </button>
  );
}
