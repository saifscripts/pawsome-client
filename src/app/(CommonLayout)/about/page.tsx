import { title } from '@/components/primitives';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className={title({ color: 'blue' })}>About Us</h1>
        <p className="text-default-600 mt-4 text-lg">
          Building the future of social connectivity
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-default-800 mb-4">
              Our Mission
            </h2>
            <p className="text-default-600">
              We strive to create a platform that connects people through
              meaningful content sharing and discussions. Our goal is to foster
              a vibrant community where ideas flourish and connections thrive.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-default-800 mb-4">
              Our Vision
            </h2>
            <p className="text-default-600">
              To become the leading platform for authentic content sharing and
              community engagement, where every voice matters and creativity
              knows no bounds.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-default-800 mb-4">
              Our Values
            </h2>
            <ul className="space-y-4 text-default-600">
              <li>
                🤝 Community First - We prioritize our users and their
                experiences
              </li>
              <li>
                💡 Innovation - Constantly evolving and improving our platform
              </li>
              <li>
                🛡️ Trust & Safety - Maintaining a secure and respectful
                environment
              </li>
              <li>🌟 Quality - Delivering excellence in every aspect</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-default-800 mb-4">
              Join Our Journey
            </h2>
            <p className="text-default-600">
              We're always looking for passionate individuals to join our
              community. Whether you're a creator, developer, or enthusiast,
              there's a place for you here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
