// todo
import { FaFileInvoiceDollar, FaArrowAltCircleRight } from "react-icons/fa";

// todo
export default function Orders() {
  return (
    <div id="order-card" className="col-3 px-4">
      <div className="row  alert-primary py-2 ">
        <div className="col-2 text-left pt-2" style={{ height: "70px" }}>
          <FaFileInvoiceDollar size={50} />
        </div>
        <div className="col-10 text-right">
          <p className="pt-2"> Պատվերներ </p>
        </div>
      </div>

      <a href="/admin/orders" style={{ textDecoration: "none" }}>
        <div className="row  alert-secondary py-2">
          <div className="col-4 text-left">Դիտել</div>
          <div className="col-8 text-right">
            <FaArrowAltCircleRight />
          </div>
        </div>
      </a>
    </div>
  );
}
