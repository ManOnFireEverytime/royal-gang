import PageWrapper from "../_components/PageWrapper";
import Policy from "../_components/Policy";
import { supportEmail } from "../_helpers/constants";

export default function Page() {
  return (
    <PageWrapper>
      <section className="px-4 lg:px-10">
        <h1 className="py-10 text-xl font-bold md:text-center">
          Terms and Conditions
        </h1>

        <div className="space-y-4">
          <div>
            <h1 className="font-medium">Effective Date: 25th January, 2025.</h1>

            <p>
              Welcome to Royal Gang! By accessing or using our website,
              www.royalgangchambers.com, you agree to adhere to these Terms and
              Conditions. If you disagree with any part of these Terms, kindly
              refrain from using the Site.
            </p>
          </div>

          <Policy header="Acceptance of Terms" number={1}>
            <p>
              By using our website, you confirm your agreement to these Terms of
              Use. Royal Gang reserves the right to update or modify these Terms
              at any time. Please review them periodically, as continued use of
              the Site implies your acceptance of any changes.
            </p>
          </Policy>

          <Policy header="Intellectual Property" number={2}>
            <p>
              All content on this website, including but not limited to images,
              designs, graphics, logos, icons, and software, is the sole
              property of Royal Gang and is protected under copyright,
              trademark, and intellectual property laws. You are prohibited from
              reproducing, distributing, modifying, or using any content for
              commercial purposes without prior written approval from Royal
              Gang.
            </p>
          </Policy>

          <Policy header="Product Information and Availability" number={3}>
            <p>
              We strive to ensure that all product descriptions, pricing, and
              images on the website are accurate. However, we cannot guarantee
              that all information is free from errors or fully up-to-date.
            </p>
          </Policy>

          <Policy header="Orders and Payments" number={4}>
            <p>
              By placing an order, you agree to provide accurate shipping,
              billing, and payment details. Submitting an order authorizes Royal
              Gang to charge the total amount to your chosen payment method.
            </p>

            <div className="mt-2">
              <p>
                We accept payments via: Visa, MasterCard, American Express,
                Flutterwave
              </p>

              <p>
                Order Processing: Orders placed between Monday and Friday are
                processed within 1–2 business days. Shipping times depend on
                your location.
              </p>
            </div>
          </Policy>

          <Policy header="Shipping and Delivery" number={5}>
            <p>
              Royal Gang delivers globally. Shipping costs are calculated during
              checkout based on the destination and package weight.
            </p>

            <div className="mt-2 space-y-1">
              <p>
                Domestic Shipping (Nigeria): Handled by reliable local delivery
                partners and our in-house logistics team.
              </p>
              <p>
                International Shipping: Managed through trusted carriers such as
                DHL and UPS.
              </p>
              <p>
                Note: Delivery times are estimates and may be affected by
                factors beyond our control, such as customs procedures, weather
                disruptions, or peak demand.
              </p>
            </div>
          </Policy>

          <Policy header="Return and Refunds" number={6}>
            <p>
              You can return items within 14 days of shipment under the
              following conditions:
            </p>

            <div className="mt-2 space-y-2">
              <p>
                Items must be unused, in their original packaging, and in
                excellent condition.
              </p>
              <p>
                All tags, protective materials, and authenticity cards (if
                applicable) must be intact.
              </p>
              <p>
                Sale items are not eligible for returns, refunds, or exchanges.
              </p>
              <p>
                Refunds will be credited to the original payment method,
                excluding original shipping charges. Return shipping costs are
                the customer&apos;s responsibility.
              </p>
              <p>For full instructions, refer to our Return Policy.</p>
            </div>
          </Policy>

          <Policy header="User Accounts" number={7}>
            <p>
              To place an order, you may need to create an account. You are
              responsible for keeping your account credentials confidential and
              for any activities conducted under your account. If you suspect
              unauthorized use, please notify us immediately at
              {supportEmail}
            </p>
          </Policy>

          <Policy header="Privacy Policy" number={8}>
            <p>
              We value your privacy. Please read our Privacy Policy to
              understand how we collect, use, and protect your personal data
            </p>
          </Policy>

          <Policy header="Limitation of Liability" number={9}>
            <p>
              Royal Gang is not liable for any losses or damages arising from
              your use of the Site. This includes, but is not limited to, loss
              of data, profits, or any indirect, incidental, or consequential
              damages caused by the use or inability to use the Site.
            </p>
          </Policy>

          <Policy header="Indemnification" number={10}>
            <p>
              You agree to indemnify and hold harmless Royal Gang, its
              affiliates, employees, and representatives from any claims,
              damages, or expenses (including legal fees) arising from your use
              of the Site or violation of these Terms
            </p>
          </Policy>

          <Policy header="Termination" number={11}>
            <p>
              We reserve the right to suspend or terminate your access to the
              website at any time, without notice, for any violation of these
              Terms or other reasons at our discretion.
            </p>
          </Policy>

          <Policy header="Governing Law" number={12}>
            <p>
              These Terms and Conditions are governed by the laws of Nigeria,
              without regard to its conflict of law provisions.
            </p>
          </Policy>

          <Policy header="Disclaimer" number={13}>
            <p>
              While we strive to maintain accurate and reliable information on
              the Site, we do not guarantee that the Site will be error-free,
              secure, or free from harmful components. The Site and its content
              are provided on an &quot;as is&quot; and &quot;as available&quot;
              basis. We disclaim all implied warranties, including those of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </Policy>

          <Policy header="Changes to Terms" number={14}>
            <p>
              Royal Gang reserves the right to amend these Terms at any time.
              Updates will be posted on this page, and the revised Terms will
              take effect immediately upon posting.
            </p>
          </Policy>

          <Policy header="Contact Information" number={15}>
            <p>
              If you have questions or need assistance, please reach out to us:
            </p>

            <div className="mt-2">
              <p>
                Email:&nbsp;
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
              </p>

              <p>
                Phone: <a href="tel: +2348131210276">+2348131210276</a>
              </p>

              <p>
                By using our website, you confirm that you have read,
                understood, and agree to these Terms and Conditions. Thank you
                for choosing Royal Gang!
              </p>
            </div>
          </Policy>
        </div>
      </section>
    </PageWrapper>
  );
}
