type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
};

/** หัวข้อ section มาตรฐาน (ป้ายเล็ก + หัวข้อใหญ่ + คำอธิบาย) */
export default function SectionHeading({ eyebrow, title, intro, align = "center", id }: Props) {
  const center = align === "center";
  return (
    <div className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className="h2 mt-3">
        {title}
      </h2>
      {intro && <p className="lead mt-4">{intro}</p>}
    </div>
  );
}
