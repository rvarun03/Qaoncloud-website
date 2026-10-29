import Link from "next/link";
import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "heroPrimary";
type ButtonSize = "default" | "small" | "content" | "cta";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
