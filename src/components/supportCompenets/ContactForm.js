const ContactForm = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-blue-600 font-semibold mb-2">Contact Us</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How Can We Help You?
        </h2>
        <p className="ttext-gray-500 mb-10 mx-auto text-center w-full md:w-3/4">
          There are many variations of passages of Lorem Ipsum available
          but the majority have suffered alteration in some form.
        </p>
      </div>

      <form className="max-w-3xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows="5"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* ✅ Check box مودرن */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <label htmlFor="consent" className="text-sm text-gray-600">
            I agree that my submitted data is being collected and stored.
          </label>
        </div>

        {/* ✅ زرار في النص */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-16 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
