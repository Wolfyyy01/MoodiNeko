export default function Footer() {
  return (
    <footer className="bg-black/70 border-t border-pink-600/30 text-pink-300 py-6 mt-16 text-center backdrop-blur-sm shadow-inner shadow-pink-500/10">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm drop-shadow-[0_0_4px_rgba(255,0,255,0.4)]">
          Made with 💜 by Wolfy — <span className="text-purple-400">MoodiNeko</span> © {new Date().getFullYear()}
        </p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-pink-400">
          <a href="https://github.com/wolfyyy01/moodineko" target="_blank" className="hover:text-white transition">GitHub</a>
          <a href="https://nazunatoken.wolfy01.me" target="_blank" className="hover:text-white transition">Nazuna Token</a>
          <a href="#top" className="hover:text-white transition">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
