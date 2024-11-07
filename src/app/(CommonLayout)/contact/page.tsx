'use client';

import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import AppTextarea from '@/components/form/AppTextarea';
import { title } from '@/components/primitives';
import { contactSchema } from '@/schemas/contact.schema';
import { Divider } from '@nextui-org/divider';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <div className="text-center">
        <h1 className={title()}>Contact Us</h1>
        <p className="text-default-600 mt-4 text-lg">
          We're here to help! Reach out to us with any inquiries or support
          needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
        <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center border border-transparent dark:border-divider">
          <div className="bg-primary-100 p-3 rounded-full mb-3">
            <PhoneIcon className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-default-700 font-semibold">
            <span>+88 017 66637772</span>
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center border border-transparent dark:border-divider">
          <div className="bg-primary-100 p-3 rounded-full mb-3">
            <MailIcon className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-default-700 font-semibold">
            <span>support@pawsome.com</span>
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center border border-transparent dark:border-divider">
          <div className="bg-primary-100 p-3 rounded-full mb-3">
            <MapPinIcon className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-default-700 font-semibold">
            <span>Dhaka, Bangladesh</span>
          </p>
        </div>
      </div>

      <Divider className="w-full max-w-4xl mx-auto" />

      <div className="dark:border dark:border-divider p-6 rounded-xl shadow-lg max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-default-600 mt-2">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>
        <AppForm onSubmit={() => {}} formSchema={contactSchema}>
          <AppInput
            name="name"
            label="Name"
            placeholder="Enter your full name"
          />
          <AppInput
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
          />
          <AppTextarea
            name="message"
            label="Message"
            placeholder="Describe your inquiry or support request"
          />
          <AppSubmit color="primary">Send Message</AppSubmit>
        </AppForm>
      </div>
    </div>
  );
}
