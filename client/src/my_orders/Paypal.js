// todo
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useUpdateComponentContext } from "../context/UpdateComponentContext";
// ?
const style = {
	layout: "horizontal",
	color: "white",
	tagline: false,
	label: "buynow",
};

// ?
const initialOptions = {
	"client-id":
		"ATl_DEWdXGlm3VRBlGE8hmHS6VCeoLHfWdFTcbkMjg2BLo_Vy2Z-a674ePIpy6S_q_CVOz5RLjl_72Hn",
	currency: "USD",
	intent: "capture",
};

// todo
export default function Paypal({ payData }) {
	// ?
	const [toggle, doUpdate] = useUpdateComponentContext();
	const [amountVal, setAmountVal] = useState(0);
	console.log(payData);
	// ?
	useEffect(() => {
		setAmountVal(payData.total);
	}, [payData]);

	// ?
	function createOrderF(data, actions) {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: "" + amountVal,
					},
				},
			],
		});
	}

	// ?
	return (
		<PayPalScriptProvider options={initialOptions}>
			<PayPalButtons
				//
				style={style}
				//
				createOrder={createOrderF}
				//
				forceReRender={[amountVal]}
				//
				onApprove={function (data, actions) {
					return actions.order
						.capture()
						.then(async function (details) {
							try {
								let response = await fetch("/pay/paypal", {
									method: "POST",
									headers: {
										Accept: "application/json",
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										invoiceData: payData,
									}),
								});

								let result = await response.json();

								if (response.ok) {
									console.log(result);
									doUpdate(!toggle);
								} else {
									console.log("no ", result);
								}
							} catch (err) {
								console.log("--->>> catch err", err.message);
							}
						});
				}}
			/>
		</PayPalScriptProvider>
	);
}
