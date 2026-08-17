import { Link } from "wouter";

export default function AdminPortalIcon() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Link href="/admin" aria-label="Admin portal">
        <button
          title="Admin Portal"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-[#111827] text-white shadow-lg hover:bg-[#D4AF37] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M12 1.5a.75.75 0 01.75.75v1.09a7.5 7.5 0 013.03 1.26l.77-.44a.75.75 0 01.99.28l.73 1.26a.75.75 0 01-.28.99l-.77.44a7.48 7.48 0 010 2.52l.77.44a.75.75 0 01.28.99l-.73 1.26a.75.75 0 01-.99.28l-.77-.44a7.5 7.5 0 01-3.03 1.26v1.09a.75.75 0 01-.75.75h-1.46a.75.75 0 01-.75-.75v-1.09a7.5 7.5 0 01-3.03-1.26l-.77.44a.75.75 0 01-.99-.28L2.2 12.96a.75.75 0 01.28-.99l.77-.44a7.48 7.48 0 010-2.52l-.77-.44a.75.75 0 01-.28-.99l.73-1.26a.75.75 0 01.99-.28l.77.44A7.5 7.5 0 0110.04 3.34V2.25A.75.75 0 0110.79 1.5h1.42zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
