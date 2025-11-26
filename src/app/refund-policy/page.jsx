import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import PageHeader from "app/components/PageHeader";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main>
      {/* --- Header Section --- */}
      <PageHeader
        title="Refund Policy"
        description="We at Microters always do our best to completely satisfy our clients with our service offerings. However, we do provide refunds for some of our services. For others, we will revise or improve our work product as needed."
      />

      {/* --- Content Section --- */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-gray-600 text-base lg:text-lg leading-relaxed space-y-6">
            <p>
              When you order from us, we promise to give you our best effort.
              But humans do make mistakes and we accept that some clients may
              want their money back. To rectify any potential problems and
              continue to provide the best service to our clients, we offer a
              refund policy. We detail our policy below, and outline the primary
              points you should understand:
            </p>

            {/* Heading 1 */}
            <h2 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-4">
              Order Cancelation & Refund Policy
            </h2>
            <p>
              If you have ordered our service and paid for it already, but do
              not want to continue with it, you can cancel the order. To do so,
              you must submit an order cancellation within 12 hours of ordering
              the service. We will issues a refund for your order within the 96
              hours through the same payment method you previously ordered and
              paid with.
            </p>
            <p>
              Our cancellation and refund policy does not apply if you cancel
              the order after 12 hours.
            </p>
            <p>
              The same policy applies to canceling an on-going project. We do
              not offer postponements on ordered services or service switching
              (exchanging your current order for another service) while we have
              already begun working on a project.
            </p>
            <p>
              In sum, any order cancellation or service switch must be completed
              within 12 hours of your order.
            </p>

            {/* Heading 2 */}
            <h2 className="text-[#15151e] text-2xl lg:text-3xl font-bold mt-10 mb-4">
              Order Revision Policy
            </h2>
            <p>
              If we deliver a project to you and you deem that it is not as
              described, or the delivery does not meet the deadline you
              previously communicated, you can ask for a revision or refund. If
              a service or deliverable becomes obsolete for any technical
              reasons (such as a Google update), we will hold the project and
              offer you other equivalent services.
            </p>
            <p>
              In either case, we will perform the necessary revisions to satisfy
              your project and deliver it within a reasonable amount of time,
              depending on the level of work required. We are also happy to
              postpone or keep the revised or other equivalent service project
              on hold until you wish for it to be completed.
            </p>

            {/* Contact Info */}
            <p className="font-bold text-[#15151e] mt-8 mb-2">
              You Can Contact Us Via Chat or Phone:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <span className="font-semibold text-[#15151e]">Skype: </span>
                <Link
                  href="skype:nazmulfeni44444?chat"
                  className="text-[#f35d36] hover:underline"
                >
                  nazmulfeni44444
                </Link>
              </li>
              <li>
                <span className="font-semibold text-[#15151e]">Whatsapp: </span>
                <Link
                  href="https://wa.me/8801840097366"
                  target="_blank"
                  className="text-[#f35d36] hover:underline"
                >
                  +8801840097366
                </Link>
              </li>
              <li>
                <span className="font-semibold text-[#15151e]">Facebook: </span>
                <Link
                  href="https://facebook.com/chenazmul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f35d36] hover:underline"
                >
                  https://facebook.com/chenazmul
                </Link>
              </li>
              <li>
                <span className="font-semibold text-[#15151e]">Call Us: </span>
                <Link
                  href="tel:+8801625192766"
                  className="text-[#f35d36] hover:underline"
                >
                  +8801625192766
                </Link>
              </li>
              <li>
                <span className="font-semibold text-[#15151e]">Email: </span>
                <Link
                  href="mailto:info@microters.com"
                  className="text-[#f35d36] hover:underline"
                >
                  info@microters.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <CtaBeforeFooter />
    </main>
  );
}
