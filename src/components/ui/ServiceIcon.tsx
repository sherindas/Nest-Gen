"use client";

import React from "react";
import {
  Zap,
  Cable,
  Droplet,
  Sprout,
  ShieldCheck,
  BatteryCharging,
  Gauge,
  Waves,
  Video,
  Cpu,
  Wrench,
  AlertTriangle,
  Sparkles,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  cable: Cable,
  droplet: Droplet,
  sprout: Sprout,
  "shield-check": ShieldCheck,
  "battery-charging": BatteryCharging,
  gauge: Gauge,
  waves: Waves,
  video: Video,
  cpu: Cpu,
  wrench: Wrench,
  "alert-triangle": AlertTriangle,
};

interface ServiceIconProps {
  name?: string;
  className?: string;
  size?: number;
}

export function ServiceIcon({ name = "zap", className = "w-6 h-6 text-brand-600", size = 24 }: ServiceIconProps) {
  const IconComponent = ICON_MAP[name.toLowerCase()] || Zap;
  return <IconComponent className={className} size={size} />;
}

export default ServiceIcon;
