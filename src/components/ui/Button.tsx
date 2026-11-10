import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost-light" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  // ปุ่มหลัก (น้ำเงิน)
  primary: "bg-brand text-white shadow-sm hover:bg-brand-dark hover:shadow-md dark:bg-accent dark:hover:bg-accent-light dark:text-navy",
  // ปุ่มรอง (ฟ้า accent)
  secondary: "bg-accent text-white hover:bg-brand",
  // ปุ่มขอบ
  outline:
    "border border-brand/30 text-brand hover:border-brand hover:bg-brand hover:text-white dark:border-white/25 dark:text-white dark:hover:bg-white dark:hover:text-navy",
  // ปุ่มขอบขาวสำหรับพื้นหลังเข้ม
  "ghost-light": "border border-white/40 text-white hover:bg-white hover:text-navy",
  // ปุ่มขาวบนพื้นหลังเข้ม
  white: "bg-white text-navy shadow-lg hover:bg-sky-soft",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Props = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export default function Button({ variant = "primary", size = "md", className = "", ...props }: Props) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}
