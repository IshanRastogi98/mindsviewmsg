# MindsViewMsg 💭

**Anonymous Messaging Platform**

> Say Anything. Stay Anonymous.

A privacy-first anonymous messaging platform built with Next.js that allows users to receive honest, unfiltered messages without revealing the sender's identity. Perfect for feedback collection, anonymous communication, and honest expression.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## ✨ Features

### 🔒 Privacy-First Design
- **Complete Anonymity**: No sender identity is stored or tracked
- **No Registration Required**: Senders can message without creating accounts
- **Privacy by Design**: Built with zero tracking and identity protection

### 🎯 Core Functionality
- **Personal Message Links**: Each user gets a unique URL for receiving messages
- **Message Control**: Toggle message acceptance on/off anytime
- **Real-time Dashboard**: Manage and view received messages instantly
- **Rate Limiting**: Built-in protection against spam and abuse

### 🎨 Modern User Experience
- **Responsive Design**: Works seamlessly on all devices
- **Dark/Light Mode**: Automatic theme switching with user preference
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Clean UI**: Modern interface built with Tailwind CSS and Radix UI

### 🔐 Security & Authentication
- **Secure Authentication**: NextAuth.js integration with session management
- **Protected Routes**: Dashboard and profile access control
- **Input Validation**: Comprehensive form validation with Zod schemas
- **CSRF Protection**: Built-in security measures

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Backend & Database
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[Zod](https://zod.dev/)** - Schema validation

### Additional Tools
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Resend](https://resend.com/)** - Email delivery service

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Main application routes
│   │   ├── dashboard/     # User dashboard
│   │   ├── profile/       # User profiles
│   │   └── u/             # Public message pages
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Login page
│   │   ├── sign-up/       # Registration page
│   │   └── verify/        # Email verification
│   └── api/               # API endpoints
│       ├── auth/          # NextAuth configuration
│       ├── send-message/  # Message sending
│       └── get-messages/  # Message retrieval
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── lib/                  # Utility functions
├── model/                # Database models
├── schemas/              # Zod validation schemas
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IshanRastogi98/mindsviewmsg.git
   cd mindsviewmsg
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Application
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Email (Optional - for verification)
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔐 Security & Privacy Philosophy

MindsViewMsg is built with privacy as the foundational principle:

- **Zero Identity Storage**: Sender information is never stored or logged
- **Session-Based Access**: Only authenticated users can access their dashboards
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: All user inputs are validated and sanitized
- **No Tracking**: No analytics, cookies, or tracking mechanisms
- **User Control**: Recipients have full control over message acceptance

Perfect for:
- Anonymous feedback systems
- Honest communication platforms
- Educational environments
- Team retrospectives
- Personal message collection

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Write or update tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Update documentation for any new features
- Ensure your code passes all existing tests
- Be respectful and constructive in discussions

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔒 Security improvements
- 🧪 Test coverage expansion

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License allows you to:
- ✅ Use the code commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Include in proprietary software

**Attribution**: Please include the original license and copyright notice.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and the React ecosystem
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons provided by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Developed by**: [Ishan Rastogi](https://github.com/IshanRastogi98)  
*B.Tech CSE, IIIT Bhopal*

---

<div align="center">

**[🌐 Live Demo](https://mindsviewmsg.vercel.app)** • **[📖 Documentation](https://github.com/IshanRastogi98/mindsviewmsg/wiki)** • **[🐛 Report Bug](https://github.com/yourusername/mindsviewmsg/issues)**

*Made with ❤️ for anonymous communication*

</div>