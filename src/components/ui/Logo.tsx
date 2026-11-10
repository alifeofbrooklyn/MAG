import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * โลโก้บริษัท — ไฟล์อยู่ที่ public/images/logo.webp
 * (โลโก้มีพื้นขาว จึงวางบนกรอบสีขาวเพื่อให้ดูดีทั้งโหมดสว่างและโหมดมืด)
 */
export default function Logo({ href, className = "" }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label={`${site.shortName} — home`}
      className={`inline-flex shrink-0 items-center rounded-md bg-white p-1 ${className}`}
    >
      <Image src={site.logo} alt={site.name} width={235} height={137} priority className="h-10 w-auto sm:h-11" />
    </Link>
  );
}
