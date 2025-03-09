import PageWrapper from "../_components/PageWrapper";
import Policy from "../_components/Policy";
import { customerServiceEmail, supportEmail } from "../_helpers/constants";

export default function Page() {
  return (
    <PageWrapper>
      <section className="px-4 lg:px-10">
        <h1 className="py-10 text-xl font-bold md:text-center">
          Frequently Asked Questions (FAQs)
        </h1>

        <div className="space-y-4">
          <Policy header="What currency do you use?" number={1}>
            <p>
              All prices listed in our web store, including shipping and
              handling charges, are in Naira.
            </p>
          </Policy>

          <Policy header="Where do you ship?" number={2}>
            <p>
              We offer worldwide shipping, with the exception of a few
              restricted countries.
            </p>
          </Policy>

          <Policy header="What shipping company do you use?" number={3}>
            <ul>
              <li>
                - Domestic Nigerian Orders: We partner with trusted local
                delivery services and manage shipments through our internal
                logistics team.
              </li>

              <li>
                - International Orders: We collaborate with GIG, DHL, and UPS
                for reliable global deliveries
              </li>
            </ul>
          </Policy>

          <Policy header="What does it cost to ship my order?" number={4}>
            <p>
              Shipping costs depend on your delivery location and the weight of
              your package. The exact shipping charge will be displayed at
              Checkout.
            </p>

            <div className="mt-2">
              <h1 className="font-medium">Please Note:</h1>

              <ul>
                <li>
                  - Both domestic and international orders may experience delays
                  due to factors such as customs procedures, adverse weather, or
                  high demand.
                </li>
                <li>
                  - Our Logistics Team will keep you informed of any changes to
                  your order&apos;s status.
                </li>
              </ul>
            </div>
          </Policy>

          <Policy header="What forms of payment do you accept?" number={5}>
            <p>We accept the following payment methods:</p>

            <ul className="list-none">
              <li>- Visa</li>
              <li>- MasterCard</li>
              <li>- American Express</li>
              <li>- Payments via Flutterwave</li>
            </ul>
          </Policy>

          <Policy
            header="What is your general order processing time?"
            number={6}
          >
            <p>
              Orders placed between Monday and Friday are typically processed
              within 1–2 business days
            </p>
          </Policy>

          <Policy header="What happens after I place my order?" number={7}>
            <p>
              - Order Confirmation: Once your order is placed, you will receive
              a confirmation email immediately.
            </p>
            <p>
              - Shipping Confirmation: When your order is ready to ship, you’ll
              receive another email with shipping details and a tracking number.
            </p>
            <p>
              <span className="font-medium">Important</span>: Keep your order
              confirmation email for reference in case of returns or inquiries.
            </p>

            <p className="mt-2">
              For any delivery issues, please contact us at&nbsp;
              <a href={`mailto:${customerServiceEmail}`}>
                {customerServiceEmail}
              </a>
            </p>
          </Policy>

          <Policy
            header="What type of packaging does my order come in?"
            number={8}
          >
            <p>
              We prioritize using original brand packaging whenever possible.
              Items are shipped in standard boxes or protective bags to ensure
              their safety
            </p>

            <p className="mt-2">
              <span className="font-medium">Note</span>: Display items may not
              always include original packaging, but all products are carefully
              packed to avoid damage during transit.
            </p>
          </Policy>

          <Policy header="What is the return and refund process?" number={9}>
            <p>
              - Returns: Items must be returned in new, unused condition within
              14 days of the original shipment. Please include a copy of your
              order confirmation email.
            </p>
            <p>
              - Refunds: Original shipping and handling fees are non-refundable.
              Customers are responsible for return shipping charges. Refunds
              will be issued to the original payment method.
            </p>

            <p className="mt-2 font-medium">Important Notes:</p>
            <p>- Sale items are not eligible for refunds or store credits.</p>
            <p>
              - Returned items must include all protective materials, tags,
              accessories, and authenticity cards (if applicable).
            </p>
            <p>
              - Items showing signs of wear or alterations may be rejected or
              refunded at a reduced amount.
            </p>
          </Policy>

          <Policy
            header="My order or refund is delayed. What’s going on?"
            number={10}
          >
            <p>
              While we aim to avoid delays, the following factors may
              occasionally cause them:
            </p>
            <p>
              - Shipping Address Issues: If your shipping address differs from
              your billing address, additional verification may be required for
              security purposes.
            </p>
            <p>
              - Backordered Items: Some products may be on backorder, requiring
              extra time for shipment.
            </p>
            <p>
              - Incomplete Information: International orders with incomplete
              shipping or billing details may experience delays.
            </p>
            <p>
              Our team will notify you of any significant delays. We appreciate
              your patience in such instances.
            </p>
          </Policy>

          <Policy header="Additional Information">
            <p>
              - Customer Support: For any inquiries or assistance, please
              contact us at&nbsp;
              <a href={`mailto: ${supportEmail}`}>{supportEmail}</a>
            </p>

            <p>
              - Order Tracking: Check your shipping confirmation email for
              tracking details and estimated delivery times.
            </p>

            <p>
              We hope this FAQ section answers your questions! If you need
              further assistance, don’t hesitate to reach out to
              us—we’re here to help.
            </p>
          </Policy>
        </div>
      </section>
    </PageWrapper>
  );
}
