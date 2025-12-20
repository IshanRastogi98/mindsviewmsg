import type { NextConfig } from "next";

// const isDev = process.env.NODE_ENV === "development";

// const nextConfig: NextConfig = {
//   async headers() {
//     return [
//       {

//         source: "/:path*",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value: `
//               default-src 'self';

//               script-src 'self';
//               script-src-elem 'self';

//               style-src 'self' 'unsafe-inline';
//               style-src-elem 'self' 'unsafe-inline';

//               img-src 'self' data: blob:;
//               font-src 'self';

//               connect-src 'self' ${isDev ? "ws: wss:" : ""};

//               media-src 'self';
//               worker-src 'self' blob:;

//               object-src 'none';
//               base-uri 'self';
//               form-action 'self';
//               frame-ancestors 'none';

//               upgrade-insecure-requests;
//             `
//               .replace(/\s{2,}/g, " ")
//               .trim(),
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async headers() {
    if (isDev)
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Permissions-Policy",
              value:
                "camera=(), microphone=(), geolocation=(), browsing-topics=()",
            },
          ],
        },
      ];

    return [
      {
        source: "/:path*",
        headers: [
          {
            // adden the strict Content Security Policy (CSP)
            // to restrict the 'browser's operaytions over/from unknown targets
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self';
              script-src-elem 'self';
              style-src 'self' 'unsafe-inline';
              style-src-elem 'self' 'unsafe-inline';
              img-src 'self' data: blob:;
              font-src 'self';
              connect-src 'self';
              worker-src 'self' blob:;
              object-src 'none';
              base-uri 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
