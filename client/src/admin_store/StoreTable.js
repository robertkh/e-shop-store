// todo
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import _ from "lodash";
import { Edit, Del, Add } from "./EditColoms";
import { useRowContext } from "./RowContext";
import PuffLoader from "react-spinners/PuffLoader";
import MyPagin from "./MyPagin";
import { useStoreContext } from "./StoreContext";
import { Link } from "react-router-dom";
import { useLng } from "../context/LngContext";
import HomeButton from "../hooksAndComps/HomeButton";
import { readName, writeName } from "../hooksAndComps/myUtilit";

// ?
const { ExportCSVButton } = CSVExport;

// todo
const CaptionElement = () => {
  // ?
  return (
    <h3
      style={{
        textAlign: "center",
        color: "purple",
        borderBottom: "3px solid purple",
      }}
      className="p-4 mb-3"
    >
      Ինտերնետ Խանութ (պահեստ)
    </h3>
  );
};

// todo
export default function StoreTable(params) {
  // ?
  const [storeState, disp] = useStoreContext();

  // ?
  const strings = useLng();

  // ?
  const tableData = storeState.fetch.docs.map((el) => ({
    ..._.pick(el, ["_id", "itemImg", "itemName", "itemQty", "itemPrice"]),
    itemImg: (
      <img
        src={`../images/${el.itemImg}`}
        alt="img"
        width="70"
        onError={(e) => (e.target.src = "../images/Phold.png")}
      ></img>
    ),
    edit: (
      <Link to="/admin/store/update">
        <Edit />
      </Link>
    ),
    del: <Del />,
  }));

  const fd = tableData.map((el) => ({
    ...el,
    itemQty: +el.itemQty,
    itemPrice: new Intl.NumberFormat("hy-AM").format(el.itemPrice) + " \u058F",
    itemName: readName(el.itemName),
  }));

  // ?
  const [, /* rowSt */ setRowSt] = useRowContext();

  // ?
  function toNum(str) {
    let str1 = "";
    var res = str.split("");

    res.forEach((el) => {
      if (Number.isInteger(+el)) str1 = str1 + el;
    });
    return +str1;
  }

  // ?
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      hidden: true,
      searchable: false,
      headerStyle: { verticalAlign: "top" },
    },
    {
      dataField: "itemImg",
      text: "Նկար",
      headerStyle: { verticalAlign: "top" },
    },
    {
      dataField: "itemName",
      text: "Անուն",
      sort: true,
      filter: textFilter({ delay: 0, placeholder: "filter..." }),
    },
    {
      dataField: "itemQty",
      text: "Քանակ",
      filter: textFilter({ delay: 0, placeholder: "filter..." }),
      sort: true,
    },
    {
      dataField: "itemPrice",
      text: "Գին",
      filter: textFilter({ delay: 0, placeholder: "filter..." }),
      type: "number",
      sort: true,

      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === "asc") {
          return toNum(b) - toNum(a);
        }
        return toNum(a) - toNum(b); // desc
      },
    },
    {
      dataField: "edit",
      text: strings.tab5_3,
      align: "center",
      headerAlign: "center",
      headerStyle: { verticalAlign: "top" },
      csvExport: false,
      searchable: false,

      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          const { edit, del, _id, itemImg, ...rest } = row;
          setRowSt(rest);
        },
      },
    },
    {
      dataField: "del",
      text: strings.tab5_4,
      headerAlign: "center",
      headerStyle: { verticalAlign: "top" },
      align: "center",
      searchable: false,
      csvExport: false,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          disp({ type: "loadShow" });

          async function getData() {
            const response = await fetch("/admin/store/del", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                itemName: writeName(row.itemName),
              }),
            });
            const result = await response.json();
            disp({ type: "pOneDel" });
            disp({ type: "loadHide" });
            alert(result);
          }

          getData();
        },
      },
    },
  ];

  return (
    <ToolkitProvider
      keyField="_id"
      data={fd}
      columns={columns}
      exportCSV={{ onlyExportFiltered: true, exportAll: false }}
    >
      {(props) => {
        return (
          <div className="mx-auto w-75 ">
            <CaptionElement className="mb-3" />
            <div className="row my-2">
              <div className="col">
                <ExportCSVButton {...props.csvProps} className="btn-info">
                  {strings.tab5_1}
                </ExportCSVButton>
              </div>
              <div className="col">
                <a href="/admin/store/add">
                  <Add className="btn btn-info " str={strings.tab5_2} />
                </a>
              </div>
            </div>

            {storeState.loading ? (
              <div
                style={{
                  position: "fixed",
                  top: "40%",
                  left: "45%",
                }}
              >
                <PuffLoader color="green" size={150} />
              </div>
            ) : (
              <div
                style={{
                  borderBottom: "5px solid purple",
                }}
              >
                <BootstrapTable
                  {...props.baseProps}
                  filter={filterFactory()}
                  bootstrap4={true}
                  hover={true}
                />
              </div>
            )}

            <div>
              <HomeButton />
              <MyPagin />
            </div>
          </div>
        );
      }}
    </ToolkitProvider>
  );
}
