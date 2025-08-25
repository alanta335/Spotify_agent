# Spotify AI Agent

A modern React application that provides an interactive chat interface for controlling Spotify through AI. Built with the latest React development standards, Tailwind CSS, and secure OAuth authentication.

## 🎵 Features

- **Interactive Chat Interface**: Natural language control of Spotify
- **Secure OAuth Authentication**: Spotify Authorization Code with PKCE flow
- **Spotify-like UI**: Authentic design matching Spotify's aesthetic
- **Real-time Communication**: Connect with your backend AI agent
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern Architecture**: Built with React 19 and latest development standards

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, React Router
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks, Context API
- **Authentication**: Spotify OAuth 2.0 with PKCE
- **API Communication**: Fetch API
- **Development**: ESLint, SWC

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthCallback.jsx     # OAuth callback handler
│   │   └── LoginPage.jsx        # Spotify login page
│   ├── chat/
│   │   ├── ChatContainer.jsx    # Main chat interface
│   │   ├── ChatInput.jsx        # Message input component
│   │   └── ChatMessage.jsx      # Individual message display
│   ├── layout/
│   │   ├── Header.jsx           # Top navigation bar
│   │   └── Layout.jsx           # Main layout wrapper
│   ├── player/
│   │   └── MusicPlayer.jsx      # Spotify-style music player
│   ├── sidebar/
│   │   └── Sidebar.jsx          # Navigation sidebar
│   └── ui/
│       ├── Button.jsx           # Reusable button component
│       └── LoadingSpinner.jsx   # Loading indicator
├── contexts/
│   └── AuthContext.jsx          # Authentication state management
├── services/
│   ├── api.js                   # API communication layer
│   └── auth.js                  # Spotify OAuth authentication
├── utils/
│   ├── constants.js             # Application constants
│   └── helpers.js               # Utility functions
├── App.jsx                      # Main application component
├── main.jsx                     # Application entry point
└── index.css                    # Global styles and Tailwind
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spotify_agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Spotify OAuth**
   - Follow the detailed setup guide in [SETUP.md](./SETUP.md)
   - Create a Spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Set up your environment variables

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Spotify OAuth Setup

**Important**: This app now uses secure OAuth authentication instead of hardcoded API keys.

1. Create a Spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Configure the redirect URI: `http://localhost:3000/callback`
3. Copy your Client ID and add it to your `.env` file

For detailed setup instructions, see [SETUP.md](./SETUP.md).

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_REDIRECT_URI=http://localhost:5173/callback
```

### Backend API

The application is configured to communicate with your backend API at `http://localhost:8080`. Update the API configuration in `src/utils/constants.js` if needed.

## 🔐 Authentication Flow

The app implements Spotify's Authorization Code with PKCE flow:

1. **Login**: Users click "Connect with Spotify" to initiate OAuth
2. **Authorization**: Users are redirected to Spotify to grant permissions
3. **Callback**: Spotify redirects back to the app with an authorization code
4. **Token Exchange**: The app exchanges the code for access and refresh tokens
5. **API Access**: The app can now make authenticated requests to Spotify API

### Security Features

- **PKCE (Proof Key for Code Exchange)**: Prevents authorization code interception attacks
- **State Parameter**: Protects against CSRF attacks
- **Secure Token Storage**: Tokens are stored in localStorage
- **Automatic Token Refresh**: Access tokens are automatically refreshed when they expire

## 📡 API Endpoints

The application communicates with your backend using these endpoints:

### Chat Endpoint
```bash
POST http://localhost:8080/chat
Content-Type: application/json
Authorization: Bearer <spotify_access_token>

{
  "data": {
    "prompt": "play the song"
  },
  "userData": {
    "userName": "Alan",
    "userId": "123"
  }
}
```

**Note**: The `apiKey` field has been removed. Authentication is now handled via the `Authorization` header.

## 🎨 UI Components

### Authentication Components
- **LoginPage**: Spotify OAuth login interface
- **AuthCallback**: Handles OAuth redirect and token exchange

### Chat Interface
- **ChatContainer**: Manages the overall chat experience
- **ChatMessage**: Displays individual messages with user/AI distinction
- **ChatInput**: Modern input field with send functionality

### Layout Components
- **Header**: Top navigation with user profile and logout
- **Sidebar**: Left navigation with playlists and menu items
- **MusicPlayer**: Bottom player with controls and progress

### Styling
- **Spotify Theme**: Authentic colors and design patterns
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and loading states

## 🔄 State Management

The application uses React Context and Hooks for state management:

- **AuthContext**: Manages authentication state and tokens
- **useState**: Local component state
- **useEffect**: Side effects and lifecycle management
- **useRef**: DOM references and scroll management

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: ≤ 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Usage

1. **Start the application** and ensure your backend API is running
2. **Connect with Spotify** using the OAuth flow
3. **Type commands** in the chat interface like:
   - "Play the song"
   - "Pause the music"
   - "Skip to next track"
   - "Create a playlist"
4. **The AI agent** will process your requests and control Spotify accordingly

## 🚀 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

The project uses ESLint for code quality. Follow the established patterns:
- Use functional components with hooks
- Implement proper error handling
- Follow the modular folder structure
- Use Tailwind CSS for styling

## 🔧 Customization

### Adding New Components

1. Create the component in the appropriate folder under `src/components/`
2. Export the component as default
3. Import and use in your desired location

### Modifying Styles

- Use Tailwind CSS classes for styling
- Add custom styles in `src/index.css`
- Follow the established design system

### API Integration

- Add new endpoints in `src/services/api.js`
- Use the existing error handling patterns
- Update constants in `src/utils/constants.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [SETUP.md](./SETUP.md) for authentication configuration
- Review the code structure
- Ensure your backend API is running
- Verify your Spotify app configuration

---

**Note**: Make sure your backend API is running on `http://localhost:8080` and you've properly configured Spotify OAuth before testing the chat functionality.
