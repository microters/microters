import CtaBeforeFooter from "app/components/common/CTABeforeFooter";
import PageHeader from "app/components/PageHeader";

export default function DisclaimerPage() {
  return (
    <main>
      {/* --- Header Section --- */}
      <PageHeader
        title="Disclaimer"
        description="Here, we detail the key points to understand about our services you must know before working with us:"
      />

      {/* --- Content Section --- */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-gray-600 text-base lg:text-lg leading-relaxed space-y-6">
            <p>
              Here, we detail the key points to understand about our services
              you must know before working with us:
            </p>

            <p>
              Microters works on real-time data, under the latest search engine
              standards, and our SEO strategies change with Google algorithm
              updates.
            </p>

            <p>
              When you’re working with us, you can always ask for explanations
              as the project goes. You cannot claim or reclaim the SEO data
              (keyword volume, ranking difficulties, and all other variables)
              after a long enough period [for example, 3 months]. As these data
              will change after an algorithm update, we will not be liable to
              provide you with the latest, most relevant variables after the
              service is delivered and enough time has passed.
            </p>

            <p>
              SEO is an ongoing process of prospecting rather than a one-time
              service like web development. Our job is to design a good
              strategy, with current knowledge and at the present moment, we are
              working from. Our work is meant to provide you with the best
              chance to succeed toward your objectives after it is implemented.
              If you are here for a guaranteed ranking on the SERP within a
              short period of time, it is vital to understand that SEO does not
              work that way.
            </p>

            <p>
              To know the possible outcomes for a specific project, read the
              services specifications and/or ask us about typical expectations
              around the content and quality. Before every project, our team
              will make sure that you receive a clear set of expectations for
              the work to come. It is also worth taking the time to read the FAQ
              section on our service page for more info.
            </p>

            <p>
              Though Microters has extensive experience ranking thousands of
              keywords for clients over a decade, our clients must understand
              that the SEO industry is ever-changing and there is no ranking
              guarantee. We do not sell guaranteed services as part of our
              projects.
            </p>

            <p>
              If you absolutely need a guaranteed ranking, please discuss your
              project with us and we will work to create a custom strategic plan
              for you. Our team of professionals has the experience and
              capability to find the desired ranking position for your website
              or business, given time and a good plan. Our work history reflects
              this.
            </p>

            <p>
              For any order, we’re responsible only for what we’ve promised to
              provide you on the service page, and nothing more than that. If
              you want a premium service, or additional services provided, you
              can choose the premium service or order additional services as
              needed.
            </p>

            <p>
              We are ready to serve you with quality support on the service we
              provided. After project delivery, you can ask for revision,
              explanations, or clarifications if you have any issues. We’re not
              responsible if something on your website goes wrong beyond the
              scope of our specific work through our service list or package. If
              you want any extra services or tasks from us, you can place
              separate orders for separate costs.
            </p>

            <p>
              Some of the resources we use on our services are developed by us
              and some we outsource. We outsource those from third-party
              services and open-source resources on the Internet. Our services
              may differ due to changes in other resources or their
              availability. As SEO is a dynamic process, ranking, strategic
              movement, and implementation methods may differ from one period to
              another.
            </p>

            <p>
              We often share various types of free offers and promotions for our
              social media community. Before sharing them online, we check their
              legitimacy, quality, and security of the resources and share only
              if we find them to be 100% safe. However, for third party
              resources, please understand that we don’t control their sources
              or how their content may change over time. Therefore, we don’t
              take any responsibilities, risks, or liabilities if something goes
              wrong after we share them. Please read the terms and conditions
              attached to the offer post or announcement for more info.
            </p>

            <p>
              Microters hold the rights to change, halt, or withdraw any of the
              above-mentioned resources, any of our services, pricing plans,
              promotion policies or marketing strategies without any prior
              notice.
            </p>

            <p>
              Each of our service pages come with a detailed disclosure of what
              we serve and how we do it. Before you claim a dispute or a
              revision, do consider giving that page a read along with the
              related FAQs on the bottom of the page. We will only provide the
              services we promised to provide. You can claim only for what we
              commit to serve, and no more.
            </p>
          </div>
        </div>
      </section>

      <CtaBeforeFooter />
    </main>
  );
}
