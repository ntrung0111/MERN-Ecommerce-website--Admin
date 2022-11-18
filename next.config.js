/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: "http://localhost:8000",
    MONGODB_URL:
      "mongodb+srv://funf:Rg8gOTBamD18a1UU@mern.rjexprj.mongodb.net/?retryWrites=true&w=majority",
    PAYPAL_CLIENT_ID:
      "AeF4rlzAqYdw_U2O8tPrAgzcKaanYL98ovnwzxaSbhFHtyAHl6UoPFVcxJgXocspSJpUJ36gQSSd7MGM",
    PAYPAL_CLIENT_SECRET:
      "EKGQUBu6vBFRp1NZvKwlvI7sY5qJFM9wqQf_yFhxUMW7aLwgIgKQx8e2g6YIMTKrHFfyio08iIt1CC45",
    MONTHS: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

module.exports = nextConfig;
