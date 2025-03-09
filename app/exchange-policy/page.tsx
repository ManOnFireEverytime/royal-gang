import PageWrapper from "../_components/PageWrapper";
import Policy from "../_components/Policy";

export default function Page() {
  return (
    <PageWrapper>
      <section className="px-4 lg:px-10">
        <h1 className="py-10 text-xl font-bold md:text-center">
          Exchange Policy
        </h1>

        <div className="space-y-4">
          <article>
            At Royal Gang, our commitment is to provide you with a seamless
            shopping experience that reflects the premium luxury and quality of
            our fashion. While we strive for perfection in every order, we
            understand that exchanges may occasionally be required to address
            specific issues. To ensure clarity, please review the terms of our
            Exchange Policy below. Should you have any questions, our dedicated
            Customer Service team is here to assist you
          </article>

          <Policy header="Eligibility for exchange" number={1}>
            <p>Exchanges are accepted under the following circumstances:</p>

            <ul className="space-y-2">
              <li>
                •&nbsp;Errors or Mistakes on Our Part: Exchanges are applicable
                if there is an error with your order, such as an incorrect size,
                color, or item sent.
              </li>

              <li>
                •&nbsp;Items must be in their original, new condition, unworn,
                unwashed, and with all tags and packaging intact.
              </li>

              <li>
                •&nbsp;Items showing signs of wear, damage, or missing tags are
                not eligible for exchange.
              </li>

              <li>•&nbsp;Final Sale items are not eligible for exchange.</li>
            </ul>
          </Policy>

          <Policy header="Exchange Process" number={2}>
            <p>
              To ensure a smooth exchange process, please follow these steps:
              Contact Us: Initiate your exchange by reaching out to our Customer
              Service team at{" "}
              <a
                href="mailto:customerservice@royalgang.com"
                className="text-saddleBrown hover:underline"
              >
                customerservice@royalgang.com
              </a>{" "}
              Include your order number and details of the issue with your item.
            </p>

            <div className="mt-2 space-y-2">
              <p>
                Approval & Instructions: Once your exchange request is approved,
                we will provide detailed return instructions. Securely package
                the item to prevent damage during transit.
              </p>

              <p>
                Return Shipping:
                <br />
                If the exchange is due to our error (e.g., incorrect size or
                color sent), Royal Gang will cover the return shipping costs.
                For any other issues, return shipping costs will be the
                customer’s responsibility.
              </p>

              <p>
                Quality Inspection: Upon receiving the returned item, our
                Quality Control team will inspect it to confirm it meets our
                exchange criteria. Items that fail inspection will be returned
                to you and will not be eligible for exchanges
              </p>

              <p>
                Replacement Shipment: For items that pass inspection, we will
                process and ship your replacement within 5-7 business days
              </p>
            </div>
          </Policy>

          <Policy header=" Exchanging for a Different Size or Style" number={3}>
            <p>
              If you need a different size or color due to an error on our part,
              please specify your preference when submitting your exchange
              request.
            </p>

            <div className="mt-2 space-y-2">
              <p>
                Availability of the requested item will be confirmed before
                finalizing the exchange.
              </p>

              <p>
                If your preferred item is unavailable, we will offer alternative
                options or issue a full refund, depending on your choice.
              </p>
            </div>
          </Policy>

          <Policy header="International Exchanges" number={4}>
            <p>
              For exchanges involving international shipments, additional
              shipping fees and extended transit times may apply. Any customs
              duties or fees incurred will be the customer’s responsibility.
            </p>

            <p className="mt-2">
              If the exchange is due to an error on our part, we will cover the
              cost of return shipping for international orders.
            </p>
          </Policy>

          <p>
            We value your satisfaction and are committed to ensuring your
            experience with Royal Gang exceeds expectations. If you have any
            questions or require further assistance, please do not hesitate to
            contact us at{" "}
            <a
              href="mailto:customerservice@royalgang.com"
              className="text-saddleBrown hover:underline"
            >
              customerservice@royalgang.com
            </a>
          </p>

          <p>
            Thank you for choosing Royal Gang—where your satisfaction is
            our top priority.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
