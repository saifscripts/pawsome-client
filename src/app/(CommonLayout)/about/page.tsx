import { title } from '@/components/primitives';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className={title()}>About Us</h1>
        <p className="text-default-600 mt-4 text-lg">
          Transforming Social Connection Through Innovation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="bg-primary/10 p-2 rounded-lg mr-3">🎯</span>
            Our Mission
          </h2>
          <p className="text-default-600 leading-relaxed">
            We're dedicated to revolutionizing social connectivity by creating a
            platform that transcends traditional boundaries. Our mission is to
            empower individuals to share their stories, build meaningful
            connections, and contribute to a global community of engaged
            creators and thinkers.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-primary-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="bg-primary/10 p-2 rounded-lg mr-3">🔮</span>
            Our Vision
          </h2>
          <p className="text-default-600 leading-relaxed">
            We envision a digital ecosystem where creativity flourishes,
            authenticity reigns, and every individual has the power to make
            their mark. Our platform aims to be the catalyst for meaningful
            connections and innovative content that shapes the future of social
            interaction.
          </p>
        </div>

        <div className="bg-gradient-to-br from-success-50 to-warning-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="bg-primary/10 p-2 rounded-lg mr-3">💫</span>
            Our Team
          </h2>
          <p className="text-default-600 mb-4 leading-relaxed">
            Led by passionate innovators and experienced developers, our diverse
            team brings together expertise from social media, technology, and
            community building. We're united by our commitment to creating
            positive digital experiences that matter.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <p className="font-semibold text-primary">20+</p>
              <p className="text-sm text-default-600">Team Members</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <p className="font-semibold text-primary">12</p>
              <p className="text-sm text-default-600">Countries</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-50 to-success-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="bg-primary/10 p-2 rounded-lg mr-3">🌟</span>
            Our Values
          </h2>
          <ul className="space-y-4 text-default-600">
            <li className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-3">🤝</span>
              <span>
                Community First - Putting our users at the heart of everything
              </span>
            </li>
            <li className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-3">💡</span>
              <span>Innovation - Pushing boundaries and embracing change</span>
            </li>
            <li className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-3">🛡️</span>
              <span>Trust & Safety - Creating a secure space for all</span>
            </li>
            <li className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-3">✨</span>
              <span>Excellence - Delivering outstanding experiences</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
