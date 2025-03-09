import PageWrapper from "../_components/PageWrapper";
import Policy from "../_components/Policy";

export default function Page() {
  return (
    <PageWrapper>
      <section className="px-4 lg:px-10">
        <h1 className="py-10 text-xl font-bold md:text-center">
          Refund Policy
        </h1>

        <div className="space-y-4">
          <article>
            Royal Gang is dedicated to providing you with an exceptional
            shopping experience, and our Refund Policy reflects our commitment
            to transparency and care. Designed with your convenience in mind, it
            ensures a straightforward process for resolving any concerns. Please
            take a moment to review the details of our refund procedure below
          </article>

          <Policy header="Eligibility for refund" number={1}>
            <p>
              To be eligible for refund the item(s) must meet the following
              criteria:
            </p>

            <ul className="space-y-2">
              <li>
                •&nbsp;The item(s) must be in unused, unwashed, and undamaged
                condition.
              </li>

              <li>
                •&nbsp;The item(s) must be returned within 14 days of receipt of
                your order.
              </li>

              <li>
                •&nbsp;The item(s) must be accompanied by the original
                packaging, tags and receipt or proof of purchase.
              </li>
            </ul>
          </Policy>

          <Policy header="Refund Processing" number={2}>
            <p>
              To be eligible for refund the item(s) must meet the following
              criteria:
            </p>

            <p>
              Once we receive your returned item(s), we will process your refund
              within 5-7 business days. Please note that it may take an
              additional 7-10 business days for the funds to reflect in your
              account, depending on your bank or payment provider.
            </p>
          </Policy>

          <Policy header="Non-Refundable Items" number={3}>
            <p>The following items are not eligible for a refund:</p>

            <ul className="space-y-2">
              <li>
                •&nbsp;Sale or discounted items (unless otherwise specified)
              </li>
              <li> •&nbsp;Customized or personalized items.</li>
              <li> •&nbsp;Gift cards or vouchers.</li>
              <li> •&nbsp;Intimate apparel (for hygiene reasons).</li>
              <li> •&nbsp;Shipping, Duties and taxes</li>
            </ul>
          </Policy>

          <Policy header="Refund for Faulty or Incorrect Items" number={4}>
            <p>The following items are not eligible for a refund:</p>

            <p>
              If you receive a faulty or incorrect item, please contact us
              immediately at customerservice@royalgangchamber.com. We will
              arrange for a return and a full refund, or an exchange at no
              additional cost to you. Please ensure the item is returned in the
              same condition as received and within 14 days of delivery to
              qualify for this refund.
            </p>
          </Policy>

          <Policy header="Cancellations and Refunds" number={4}>
            <p>
              If you wish to cancel an order, please contact us as soon as
              possible at customer service @royalgangchambers.com. If the order
              has already been shipped, we cannot process a cancellation.
              However, you may return the item(s) within the specified return
              period for a refund.
            </p>
          </Policy>

          <article>
            <header>Contact Us</header>

            <p>
              For any questions or assistance regarding our refund policy,
              please reach out to our customer service team at&nbsp;
              <a
                href="mailto:customerservice@royalgang.com"
                className="text-saddleBrown hover:underline"
              >
                customerservice@royalgang.com
              </a>
              &nbsp; Our team is happy to help you
            </p>
          </article>
        </div>
      </section>
    </PageWrapper>
  );
}
