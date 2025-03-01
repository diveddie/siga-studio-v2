"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MobileNav } from "./mobile-nav";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { useTranslations } from "@/components/translations-context";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Header() {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslations();
  const [logoSrc, setLogoSrc] = useState("/logo.png");

  useEffect(() => {
    setLogoSrc(resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png");
  }, [resolvedTheme]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sticky top-0 z-50 border-b bg-background"
    >
      <div className="mx-auto px-4 h-[96px] flex items-center justify-between gap-2">
        <MobileNav />
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-md:hidden flex items-center"
        >
          <Link href="/" className="flex gap-3 items-center">
            <motion.h1
              className="text-lg font-medium tracking-tighter flex gap-1 items-center"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={logoSrc}
                alt="Siga Studio Logo"
                className="h-[84px] w-auto"
                width={1000}
                height={591}
              />
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="outline" className="text-normal">
                {t("header.beta")}
              </Badge>
            </motion.div>
          </Link>
        </motion.nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 items-center justify-end ml-auto"
        >
          <ThemeSwitcher />
        </motion.div>
      </div>
    </motion.header>
  );
}
