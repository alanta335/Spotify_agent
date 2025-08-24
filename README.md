# Spotify AI Agent

A modern React application that provides an interactive chat interface for controlling Spotify through AI. Built with the latest React development standards, Tailwind CSS, and a modular architecture.

## 🎵 Features

- **Interactive Chat Interface**: Natural language control of Spotify
- **Spotify-like UI**: Authentic design matching Spotify's aesthetic
- **Real-time Communication**: Connect with your backend AI agent
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern Architecture**: Built with React 19 and latest development standards

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **API Communication**: Fetch API
- **Development**: ESLint, SWC

## 📁 Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatContainer.jsx    # Main chat interface
│   │   ├── ChatInput.jsx        # Message input component
│   │   └── ChatMessage.jsx      # Individual message display
│   ├── layout/
│   │   ├── Header.jsx           # Top navigation bar
│   │   └── Layout.jsx           # Main layout wrapper
│   ├── player/
│   │   └── MusicPlayer.jsx      # Spotify-style music player
│   └── sidebar/
│       └── Sidebar.jsx          # Navigation sidebar
├── services/
│   └── api.js                   # API communication layer
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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Backend API

The application is configured to communicate with your backend API at `http://localhost:8080`. Update the API configuration in `src/services/api.js` if needed.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_REDIRECT_URI=http://localhost:5173/callback
```

## 📡 API Endpoints

The application communicates with your backend using these endpoints:

### Chat Endpoint
```bash
POST http://localhost:8080/chat
Content-Type: application/json

{
  "data": {
    "prompt": "play the song"
  },
  "userData": {
    "userName": "Alan",
    "userId": "123",
    "apiKey": "your_spotify_api_key"
  }
}
```

## 🎨 UI Components

### Chat Interface
- **ChatContainer**: Manages the overall chat experience
- **ChatMessage**: Displays individual messages with user/AI distinction
- **ChatInput**: Modern input field with send functionality

### Layout Components
- **Header**: Top navigation with Spotify branding
- **Sidebar**: Left navigation with playlists and menu items
- **MusicPlayer**: Bottom player with controls and progress

### Styling
- **Spotify Theme**: Authentic colors and design patterns
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and loading states

## 🔄 State Management

The application uses React Hooks for state management:

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
2. **Type commands** in the chat interface like:
   - "Play the song"
   - "Pause the music"
   - "Skip to next track"
   - "Create a playlist"
3. **The AI agent** will process your requests and control Spotify accordingly

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
- Check the documentation
- Review the code structure
- Ensure your backend API is running
- Verify your Spotify API credentials

---

**Note**: Make sure your backend API is running on `http://localhost:8080` before testing the chat functionality.
