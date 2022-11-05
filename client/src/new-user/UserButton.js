// todo
import { Link } from "react-router-dom";
import { useCookieContext } from "../context/CookieContext";
import AvatarIcon from "../hooksAndComps/AvatarIcon";
import { FaRegUser } from "react-icons/fa";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Users from "./Users";

// todo
const avatarStyle = {
  position: "fixed",
  top: "76px",
  right: "50px",
};
// ?
const buttonStyles = {
  lineHeight: "0%",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
};

// todo
export default function HomeButton({ tabSet }) {
  // ?
  const [cook /*  updateCook */] = useCookieContext();

  // ?
  return (
    <>
      <Link to="/">
        <div id="userProfile" style={avatarStyle}>
          {cook.id ? (
            <div>
              <AvatarIcon name={cook.name} />
            </div>
          ) : (
            <button
              // id="userProfile"
              type="button"
              className="btn btn-outline-success p-0"
              style={buttonStyles}
            >
              <FaRegUser size={30} />
            </button>
          )}
        </div>
      </Link>

      <UncontrolledPopover
        trigger="legacy"
        placement="bottom-end"
        target="userProfile"
      >
        <PopoverBody className="alert-light">
          <div className="p-3">
            <Users tabSet={tabSet} />
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}
