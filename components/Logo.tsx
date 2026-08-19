import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-border transition-shadow group-hover:shadow-md">
        <Image
          src="/images/logo-mg.png"
          alt="MG Logo"
          title="MG Logo"
          width={22}
          height={22}
          className="object-contain"
          priority
        />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-sm font-extrabold tracking-tight ${dark ? "text-white" : "text-brand"}`}>
          MG MOTOR MUMBAI
        </span>
        <span className={`block text-[9px] font-semibold uppercase tracking-[0.28em] ${dark ? "text-white/60" : "text-muted"}`}>
          Premium Dealership
        </span>
      </span>
      <span className={`ml-1 h-6 w-px shrink-0 ${dark ? "bg-white/20" : "bg-border"}`} />
      <Image
        src="/images/mg-select-logo.png"
        alt="MG Select"
        title="MG Select"
        width={84}
        height={16}
        className={`h-4 w-auto shrink-0 object-contain ${dark ? "invert brightness-0 filter" : ""}`}
      />
    </Link>
  );
}
