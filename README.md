# I2I - Video Conferencing Platform

A modern, feature-rich video conferencing platform built with Next.js , offering seamless video meetings, scheduling, and collaboration tools.

![I2I Platform](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stream.io](https://img.shields.io/badge/Stream.io-005FFF?style=for-the-badge&logo=streamlit&logoColor=white)

## ✨ Features

### 🎥 Core Video Features
- **Instant Meetings** - Start a video call immediately with a single click
- **Scheduled Meetings** - Plan and schedule meetings for future dates
- **Join by Link** - Easy meeting access via invitation links
- **Meeting Recordings** - Record and replay important meetings
- **Personal Room** - Dedicated space for recurring meetings

### 🔐 Authentication & Security
- **Secure Authentication** - Powered by Clerk for robust user management
- **Protected Routes** - All meeting features are secure and authenticated
- **User Management** - Complete user profile and session management

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **Dark Theme** - Professional dark interface optimized for video calls
- **Mobile Responsive** - Works seamlessly across all devices
- **Smooth Animations** - Enhanced with Framer Motion for fluid interactions
- **Intuitive Navigation** - Easy-to-use sidebar and mobile navigation

### 📱 Meeting Management
- **Upcoming Meetings** - View and manage scheduled meetings
- **Previous Meetings** - Access meeting history
- **Meeting Controls** - Full control over video, audio, and participants
- **Real-time Features** - Powered by Stream.io's robust video infrastructure

## 🚀 Tech Stack

### Frontend
- **[Next.js ](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & Services
- **[Stream.io Video SDK](https://getstream.io/video/)** - Video calling infrastructure
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[React DatePicker](https://github.com/Hacker0x01/react-datepicker)** - Date/time selection

### Development Tools
- **ESLint** - Code linting with Prettier integration
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stream.io account
- Clerk account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd i2i
```

### 2. Install Dependencies
```bash
npm install --legacy-deps-peer

```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stream.io Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Configure Services

#### Clerk Setup
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Get your publishable and secret keys
3. Configure sign-in/sign-up redirects

#### Stream.io Setup
1. Create a Stream.io account at [getstream.io](https://getstream.io)
2. Create a new video app
3. Get your API key and secret

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

### Getting Started
1. **Sign Up/Sign In** - Create an account or log in using Clerk authentication
2. **Dashboard** - Access the main dashboard with meeting options
3. **Start Meeting** - Choose from instant, scheduled, or join existing meetings

### Meeting Types

#### Instant Meeting
- Click "New Meeting" to start immediately
- Share the generated link with participants
- Begin your video call instantly

#### Scheduled Meeting
- Click "Schedule Meeting"
- Select date, time, and add description
- Meeting link is generated for future use
- Participants receive invitation details

#### Join Meeting
- Use "Join Meeting" with an invitation link
- Enter the meeting ID or paste the full URL
- Join the video call directly

#### Personal Room
- Access your dedicated meeting space
- Consistent meeting ID for recurring calls
- Perfect for regular team meetings

## 🏗️ Project Structure

```
i2i/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   │   ├── (home)/        # Home dashboard
│   │   ├── meeting/       # Meeting rooms
│   │   ├── upcoming/      # Upcoming meetings
│   │   ├── previous/      # Meeting history
│   │   ├── recordings/    # Meeting recordings
│   │   └── personal-room/ # Personal meeting room
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI primitives
│   ├── MeetingRoom.tsx   # Video call interface
│   ├── MeetingModal.tsx  # Meeting creation modal
│   ├── Navbar.tsx        # Navigation bar
│   └── Sidebar.tsx       # Sidebar navigation
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── providers/            # Context providers
├── actions/              # Server actions
├── constants/            # Application constants
└── public/               # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request





## 🙏 Acknowledgments

- [Stream.io](https://getstream.io/) for excellent video infrastructure
- [Clerk](https://clerk.com/) for seamless authentication
- [Vercel](https://vercel.com/) for hosting and deployment
- [Next.js](https://nextjs.org/) team for the amazing framework

---

**Built with ❤️ By ZAHRAN**
