import Header from "../components/Header";

const Resume = () => (
    <section className="max-w-5xl mx-auto p-6">
        <h2>Resume</h2>
        <Header />
        <div>
            <iframe
              src='https://docs.google.com/document/d/1OCky6jv6FhjHI1q5MDKZ5xHwvVFgzIIYu_NXd2HO6Yo/edit?tab=t.0'
              className="w-full h-[600px] border rounded-md shadow"
              title="Ivelis Resume"
            />
        </div>
    </section>
);

export default Resume;