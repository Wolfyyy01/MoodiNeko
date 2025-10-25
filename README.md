
# 🎭 MoodiNeko v2

**MoodiNeko** is a mood-driven anime recommendation platform.  
Tell us how you feel — we'll tell you what to watch.

Powered by AI. Built with ⚡ **Bun**, 🔥 **Hono**, ⚛️ **React**, and 🌬 **TailwindCSS**.

✨ **Version 2.0 is here!** New Ui. Enhanced with beautiful animations, toast notifications, and keyboard shortcuts.

---

## 🌟 Features

- 🎭 Get personalized anime suggestions based on your current mood
- 🤖 Natural language interpretation using OpenAI GPT
- 🧠 Access to thousands of anime titles via the Jikan API (MyAnimeList)
- ⚡ Ultra-fast backend powered by Bun and Hono
- 🎨 Modern, responsive UI built with React and TailwindCSS
- 💾 Session handling and quick access caching with Redis
- 🎉 **NEW in v2:**
  - 💜 New UI 
  - ✨ Beautiful animations and hover effects
  - 🍞 Toast notifications for better user feedback
  - ⌨️ Keyboard shortcuts (Enter to search, Esc to close modals)
  - 🍃 Sakura leafs falling

---

## 🧪 Tech Stack

| Technology     | Purpose                              |
|----------------|--------------------------------------|
| **🥟Bun**        | High-performance JavaScript runtime  |
| **🔥Hono**       | Lightweight web framework for Bun    |
| **⚛️React**      | Interactive and dynamic UI frontend  |
| **🌬TailwindCSS**| Utility-first styling system         |
| **💾Redis**      | Fast in-memory session storage       |
| **🧠OpenAI API** | AI-based mood interpretation         |
| **⛩️Jikan API**  | Anime data from MyAnimeList          |
| **🐋Docker**     | Containerized deployment             |
| **🐙GitHub**     | Source control and CI/CD             |

---

## 🚀 Live Demo

🔗 [Visit MoodiNeko](https://moodineko.wolfy01.me)

---

## 📦 Getting Started

### Clone and run locally:

```bash
git clone https://github.com/user/moodineko.git
cd moodineko

# Install dependencies
# For Server:
cd ./server
bun install

# For Client:
cd ./client
bun install

# Start development server
# For Server:
bun dev

# For Client
bun dev
````

> ⚠️ Make sure to configure your `.env` files before running.

---

## ⚙️ Environment Variables

Create a `.env` file in the server and client directory and include:

```env
# Server
PORT=3000
OPENAI_API_KEY=
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

```env
# Client
VITE_API_URL=YOUR_SERVER_URL
```
---

## 📌 Project Status

🚀 **MoodiNeko v2 is now live!** The project has been updated with new features and improvements.

✅ Feedback and future contributions are still welcome!

---

## 📝 Changelog

### v2.0.0

- 💜 New UI design with a fresh and modern look
- ✨ Added beautiful animations and hover effects to anime cards
- 🍞 Replaced alert dialogs with modern toast notifications
- ⌨️ Added keyboard shortcuts:
  - Press `Enter` to get recommendations
  - Press `Esc` to close modals
- 🍃 Sakura leafs falling in the background
- 🔍 Improved focus management for better accessibility
- 🔍 Added a filter to organize anime by genres
- 🔗 Added a share button to share your recommendations

---

## 🤝 Contributing

Want to help improve MoodiNeko?
Feel free to open an issue or submit a pull request.
New moods, UI enhancements, or performance optimizations are always welcome.

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

Made with 💜 by **Wolfy**
 🐙 [GitHub](https://github.com/wolfyyy01)

---



<p align="left" style='margin-top:3rem'>
  <a href="https://www.buymeacoffee.com/wolfy01" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" style="border-radius:8px;" />
  </a>
</p>

