import PageHeader from "app/components/PageHeader";
import AuthorityTeam from "app/components/team/AuthorityTeam";
import LeadershipTeam from "app/components/team/LeadershipTeam";

export default function TeamPage() {
  return (
    <main>
      <PageHeader
        title="Meet the Makers:"
        highlight="Our Exceptional Team"
        description="Ready to chat or Message? We’re just a message away from turning your ideas into reality. Get in touch and let’s start the conversation!"
      />
      <LeadershipTeam/>
      <AuthorityTeam/>
    </main>
  );
}