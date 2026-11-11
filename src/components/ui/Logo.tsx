import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * โลโก้บริษัท (พื้นหลังโปร่งใส)
 * - public/images/logo-navy.png  → ใช้บนพื้นสว่าง
 * - public/images/logo-white.png → ใช้บนพื้นเข้ม (ตัวอักษร MAG โปร่งให้เห็นพื้นหลัง)
 * tone="auto": บน Header — โปร่งใสทับ Hero หรือโหมดมืด = ขาว, เลื่อนลงบนพื้นขาว = น้ำเงิน
 * tone="white": ขาวเสมอ (เช่น Footer)
 */
export default function Logo({ href, tone = "auto", className = "" }: { href: string; tone?: "auto" | "white"; className?: string }) {
  const img = "h-10 w-auto sm:h-11";
  return (
    <Link href={href} aria-label={`${site.shortName} — home`} className={`inline-flex shrink-0 items-center ${className}`}>
      {tone === "white" ? (
        <Image src="/images/logo-white.png" alt={site.name} width={699} height={402} priority className={img} />
      ) : (
        <>
          <Image
            src="/images/logo-navy.png"
            alt={site.name}
            width={699}
            height={402}
            priority
            className={`${img} dark:hidden group-data-[transparent=true]:hidden`}
          />
          <Image
            src="/images/logo-white.png"
            alt=""
            aria-hidden="true"
            width={699}
            height={402}
            priority
            className={`${img} hidden dark:block group-data-[transparent=true]:block`}
          />
        </>
      )}
    </Link>
  );
}
