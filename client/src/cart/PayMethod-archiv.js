export default function PayMethod() {
  //
  return (
    <div className="mt-5 w-75 mx-auto">
      <h5 className="text-center text-secondary">
        <strong>
          Վճարման եղանակ <small> (ընտրել մեկը)</small>
        </strong>
      </h5>
      <p className="bg-info my-5 p-3 text-white">Վճարել հաշիվ-ապրանքագիրը</p>

      <div>
        <div class="row">
          <div className="col-3 form-group border">
            <a data-toggle="tab" href="#vm-card__warning">
              <div class="btn btn-payment-warning btn-block card_Img">
                <img src="images/vm-card.png" alt="" width="100%" />
              </div>
            </a>
          </div>

          <div class="col-3 form-group "></div>

          <div class="col-3 form-group"></div>

          <div className="col-3 form-group border">
            <a data-toggle="tab" href="#paypal__warning">
              <div class="btn btn-payment-warning btn-block card_Img">
                <img src="images/Paypal.png" alt="" width="100%" />
              </div>
            </a>
          </div>
        </div>

        <div class="row">
          <div class="tab-content">
            <div id="vm-card__warning" class="tab-pane fade in active">
              <form>
                <div class="col-sm-12 form-group text-center">
                  <hr />
                  <h4>Visa/Mastercard</h4>
                </div>

                <div class=" col-sm-12">
                  <div class="row"></div>
                </div>
              </form>
            </div>

            <div id="paypal__warning" class="tab-pane fade">
              <form>
                <div class="col-sm-12 form-group text-center">
                  <hr />
                  <h4>PayPal</h4>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
