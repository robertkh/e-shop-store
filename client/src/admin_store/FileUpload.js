// todo
import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { FaFolderOpen } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { useLng } from "../context/LngContext";
import _ from "lodash";

// todo
export default function FileUpload({ disp }) {
  const [myFile, selectFile] = useFileUpload();
  const [isValid, setIsValid] = useState(false);
  const strings = useLng();

  return (
    <div className="mt-4">
      <div
        className="row border-warning  py-4"
        style={{ borderTop: "3px solid" }}
      >
        {myFile && (
          <div className="col-1">
            <img
              alt=""
              src={myFile?.source}
              height="38px"
              data-tip
              data-for="custom-img"
            />

            <ReactTooltip
              id="custom-img"
              type="warning"
              effect="solid"
              place="bottom"
            >
              <img alt="" src={myFile?.source} width="200" />
            </ReactTooltip>
          </div>
        )}

        <div className="col-8 mt-1">
          {myFile ? (
            <div>
              <span> Name: </span>
              <span className="text-primary"> {myFile.name} </span>
              <span className="ml-2">Size: </span>
              <span className="text-primary">
                {Math.ceil(myFile.size / 1000)} KB
              </span>
            </div>
          ) : (
            <span>
              {strings.tab5_8} ( {strings.tab5_9} 100KB )
            </span>
          )}
        </div>

        <div className={myFile ? "col-3" : "col-4"}>
          <button
            className="btn btn-info ml-1 float-right"
            onClick={(e) => {
              selectFile(
                { accept: "image/*" },
                ({ source, name, size, file }) => {
                  if (
                    file.type !== "image/jpeg" &&
                    file.type !== "image/jpg" &&
                    file.type !== "image/png"
                  ) {
                    setIsValid(false);
                    disp({
                      show: true,
                      isSuccess: false,
                      msg: "Ընտրված ֆայլը նկար չէ։",
                    });
                    return;
                  }
                  if (size > 100000) {
                    disp({
                      show: true,
                      isSuccess: false,
                      msg: "Ընտրված ֆայլի ծավալը մեծ է 100KB։",
                    });
                    setIsValid(false);
                    return;
                  }

                  setIsValid(true);
                  disp({ ...StaticRange, show: false });
                  // Todo: Upload to cloud.
                }
              );
            }}
          >
            <FaFolderOpen /> {myFile ? strings.tab5_6b : strings.tab5_6a}
          </button>
        </div>
      </div>
      <div className="pt-2">
        <button
          className="btn btn-block btn-success float-right"
          disabled={!isValid}
          onClick={() => handleImageUpload(myFile.file, disp, setIsValid)}
        >
          {strings.tab5_7}
        </button>
      </div>
    </div>
  );
}

// todo
function handleImageUpload(file, disp, set) {
  const formData = new FormData();
  let newFileName = file.name.split(".");
  newFileName =
    _.capitalize(_.snakeCase(newFileName[0])) + "." + newFileName[1];

  formData.append("upImage", file, newFileName);

  fetch("/admin/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      const str = (
        <span>
          {" "}
          {result}
          <Link to="/admin/store" className="font-italic ml-4">
            Վերադառնալ պահեստ
          </Link>
        </span>
      );
      disp({
        show: true,
        isSuccess: true,
        msg: str,
      });

      set(false);
    })
    .catch((err) => console.error(err));
}
