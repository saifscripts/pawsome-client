'use client';

import AppForm from '@/components/form/AppForm';
import AppInput from '@/components/form/AppInput';
import AppSubmit from '@/components/form/AppSubmit';
import AppTextarea from '@/components/form/AppTextarea';
import { title } from '@/components/primitives';
import { contactSchema } from '@/schemas/contact.schema';
import { Divider } from '@nextui-org/divider';
import { motion } from 'framer-motion';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-6 py-12 space-y-12"
    >
      <motion.div variants={itemVariants} className="text-center">
        <h1 className={title()}>Contact Us</h1>
        <p className="text-default-600 mt-4 text-lg">
          We're here to help! Reach out to us with any inquiries or support
          needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl shadow-lg flex flex-col items-center border border-transparent dark:border-divider"
        >
          <div className="bg-primary-100 p-3 rounded-full mb-3">
            <PhoneIcon className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-default-700 font-semibold">
            <span>+88 017 66637772</span>
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl shadow-lg flex flex-col items-center border border-transparent dark:border-divider"
        >
          <div className="bg-primary-100 p-3 rounded-full mb-3">
            <MailIcon className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-default-700 font-semibold">
            <span>support@pawsome.com</span>
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl shadow-lg flex flex-col items-center border border-transparent dark:border-divider"
        >
          <div className="bg-primary-100 p-3 rounded-full mb-3">
            <MapPinIcon className="w-8 h-8 text-primary-500" />
          </div>
          <p className="text-default-700 font-semibold">
            <span>Dhaka, Bangladesh</span>
          </p>
        </motion.div>
      </div>

      <Divider className="w-full max-w-4xl mx-auto" />

      <motion.div
        variants={itemVariants}
        className="dark:border dark:border-divider p-6 rounded-xl shadow-lg max-w-lg mx-auto"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-default-600 mt-2">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>
        <AppForm onSubmit={() => {}} formSchema={contactSchema}>
          <motion.div variants={itemVariants}>
            <AppInput
              name="name"
              label="Name"
              placeholder="Enter your full name"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <AppInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email address"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <AppTextarea
              name="message"
              label="Message"
              placeholder="Describe your inquiry or support request"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AppSubmit color="primary">Send Message</AppSubmit>
          </motion.div>
        </AppForm>
      </motion.div>
    </motion.div>
  );
}
