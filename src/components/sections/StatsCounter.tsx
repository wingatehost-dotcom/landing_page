import { CountUp } from "@/components/motion/CountUp";

type StatsCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export function StatsCounter({
  value,
  prefix = "",
  suffix = "",
  label,
}: StatsCounterProps) {
  return (
    <div className="text-center">
      <p className="text-4xl font-semibold tracking-tight text-third sm:text-5xl">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </p>
      <p className="mt-2 text-sm font-medium text-fourth/70">{label}</p>
    </div>
  );
}
