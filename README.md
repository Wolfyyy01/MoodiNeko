
# 🎭 MoodiNeko

**MoodiNeko** is a mood-driven anime recommendation platform.  
Tell us how you feel — we'll tell you what to watch.

Powered by AI. Built with ⚡ **Bun**, 🔥 **Hono**, ⚛️ **React**, and 🌬 **TailwindCSS**.

---

## 🌟 Features

- 🎭 Get personalized anime suggestions based on your current mood
- 🤖 Natural language interpretation using OpenAI GPT
- 🧠 Access to thousands of anime titles via the Jikan API (MyAnimeList)
- ⚡ Ultra-fast backend powered by Bun and Hono
- 🎨 Modern, responsive UI built with React and TailwindCSS
- 💾 Session handling and quick access caching with Redis

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

🔗 [Visit MoodiNeko v1](https://moodi-neko-fa4jkqn76-wolfyyy01s-projects.vercel.app/)

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
REDIS_UL=
```

```env
# Client
VITE_API_URL=YOUR_SERVER_URL
```
---

## 📌 Project Status

✅ **MoodiNeko is a completed project** — feedback and future contributions are still welcome!

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
 🐙 [GitHub](https://github.com/wolfy01)

---



<p align="left" style='margin-top:3rem'>
  <a href="https://www.buymeacoffee.com/wolfy01" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" style="border-radius:8px;" />
  </a>
</p>
