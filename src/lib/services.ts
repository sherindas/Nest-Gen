/**
 * Service data registry for NextGen Service website.
 * Contains all 12 service definitions used across homepage cards
 * and individual service detail pages.
 */

import { ServiceDefinition } from "@/types";

export const services: ServiceDefinition[] = [
  {
    slug: "electrical-wiring",
    name: "Electrical Wiring & Renovation",
    category: "electrical",
    badge: "Most Popular",
    iconKey: "zap",
    shortDescription:
      "Professional electrical wiring and renovation services for homes and businesses. From new installations to full rewiring, we ensure safe and reliable power throughout your property.",
    longDescription:
      "NextGen Service provides comprehensive electrical wiring and renovation solutions tailored to residential and commercial properties. Whether you need new wiring for a building under construction, a complete rewire of an older property, or targeted electrical upgrades, our team handles the work safely and to specification. We carry out switch and socket installations, distribution board work, and fault identification to keep your electrical systems running reliably. Every job includes a thorough inspection and safety check so you can be confident in the quality of the work.",
    imageUrl: "/images/services/electrical-wiring.jpg",
    hasSales: false,
    serviceItems: [
      "New electrical wiring",
      "Rewiring",
      "Electrical renovation",
      "Electrical upgrades",
      "Switch and socket installation",
      "Distribution board work",
      "Fault identification",
      "Maintenance",
      "Safety improvements",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "open-concealed-wiring",
    name: "Open Wiring & Concealed Wiring",
    category: "electrical",
    badge: "Certified",
    iconKey: "cable",
    shortDescription:
      "Specialist open and concealed wiring services for new builds, renovations, and modifications. We deliver clean, code-compliant installations that suit your property's layout.",
    longDescription:
      "NextGen Service offers both open wiring and concealed wiring installations to suit different construction types and customer preferences. Open wiring provides accessible routing for industrial or utility spaces, while concealed wiring delivers a cleaner finish for homes and offices. Our technicians assess the best routing approach for your space and carry out the work with minimal disruption. We also handle rewiring projects and electrical modifications, followed by routine maintenance to keep the installation in good condition.",
    imageUrl: "/images/services/open-concealed-wiring.jpg",
    hasSales: false,
    serviceItems: [
      "Open wiring",
      "Concealed wiring",
      "Rewiring",
      "Electrical modification",
      "Maintenance",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "plumbing",
    name: "Plumbing & Leak Repairs",
    category: "plumbing-motors",
    badge: "Fast Response",
    iconKey: "droplet",
    shortDescription:
      "Reliable plumbing installation and emergency repair services for residential and commercial properties. We diagnose and fix leaks, blockages, and pipe issues promptly.",
    longDescription:
      "NextGen Service provides dependable plumbing solutions covering installation, repairs, and ongoing maintenance for homes and businesses. Our team installs new plumbing systems for fresh constructions as well as replacement or upgrade work in existing properties. We diagnose and fix leaks quickly to minimise water damage and disruption, and carry out fault diagnosis to identify underlying issues before they become costly problems. Regular maintenance checks help keep your plumbing systems functioning efficiently year-round.",
    imageUrl: "/images/services/plumbing.jpg",
    hasSales: false,
    serviceItems: [
      "Plumbing installation",
      "Plumbing repairs",
      "Leak fixing",
      "Maintenance",
      "Fault diagnosis",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "irrigation-system",
    name: "Irrigation Systems & Automation",
    category: "plumbing-motors",
    badge: "Sales & Service",
    iconKey: "sprout",
    shortDescription:
      "End-to-end irrigation system supply and installation for gardens, farms, and commercial sites. We install, maintain, and repair automated watering systems.",
    longDescription:
      "NextGen Service supplies and installs irrigation systems suited to gardens, agricultural land, and commercial outdoor spaces. We offer a range of solutions including sprinkler systems and drip irrigation equipment, along with all necessary pipes and fittings. Our team handles the complete installation from design layout to commissioning, ensuring even water distribution across the area. After installation, we provide maintenance visits and repairs to keep the system operating reliably through every season.",
    imageUrl: "/images/services/irrigation-system.jpg",
    hasSales: true,
    salesItems: [
      "Irrigation system solutions",
      "Pipes and fittings",
      "Sprinkler systems",
      "Drip irrigation equipment",
    ],
    serviceItems: [
      "Installation",
      "Maintenance",
      "Repairs",
      "System troubleshooting",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "electrical-fencing",
    name: "Electrical Perimeter Fencing",
    category: "security",
    badge: "High Security",
    iconKey: "shield-check",
    shortDescription:
      "Electrical fencing supply and installation for perimeter security at homes, farms, and commercial premises. We install and maintain deterrent systems.",
    longDescription:
      "NextGen Service supplies and installs electrical fencing systems that provide a reliable perimeter security layer for residential, agricultural, and commercial properties. We source energiser units, fencing materials, and perimeter protection equipment suited to your site dimensions and security requirements. Our installation team sets up the system correctly and tests it thoroughly before handover. We also offer scheduled maintenance and fault fixing to ensure the fence remains operational and effective over time.",
    imageUrl: "/images/services/electrical-fencing.jpg",
    hasSales: true,
    salesItems: [
      "Electrical fencing solutions",
      "Energiser units",
      "Fencing materials",
      "Perimeter protection equipment",
    ],
    serviceItems: [
      "Installation",
      "Maintenance",
      "Fault fixing",
      "System inspection",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "inverter-sales",
    name: "Inverter & Battery Systems",
    category: "automation",
    badge: "Sales & Install",
    iconKey: "battery-charging",
    shortDescription:
      "Inverter systems and battery backup solutions for homes and businesses. We supply, install, and service inverters to keep essentials running during power cuts.",
    longDescription:
      "NextGen Service supplies a range of inverter systems and battery solutions designed to provide backup power for homes and commercial premises. Whether you need a small unit for essential appliances or a larger system for extended coverage, we help you choose the right equipment for your load requirements. Our technicians handle the installation and ensure the system is correctly configured and safe. We also provide inspection, troubleshooting, and maintenance services to keep your inverter performing reliably when you need it most.",
    imageUrl: "/images/services/inverter-sales.jpg",
    hasSales: true,
    salesItems: [
      "Inverter systems",
      "Related equipment",
      "Replacement solutions",
      "Battery systems",
    ],
    serviceItems: [
      "Installation",
      "Inspection",
      "Troubleshooting",
      "Maintenance",
      "Repair",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "borewell-motor",
    name: "Borewell Motor Service & Installation",
    category: "plumbing-motors",
    badge: "Heavy Duty",
    iconKey: "gauge",
    shortDescription:
      "Borewell motor supply, installation, and servicing for domestic and agricultural water extraction. We install and maintain submersible motor units with precision.",
    longDescription:
      "NextGen Service supplies and installs borewell motors, including submersible motor units and pump sets, for residential, agricultural, and commercial water extraction needs. Our team assesses the borewell depth and water demand to recommend the right motor for your application. We carry out the full installation process, including lowering the motor, connecting pipework and electrical supply, and testing operation at the surface. Post-installation, we provide regular servicing, troubleshooting, and replacement support to minimise downtime.",
    imageUrl: "/images/services/borewell-motor.jpg",
    hasSales: true,
    salesItems: [
      "Borewell motor solutions",
      "Submersible motor units",
      "Pump sets",
      "Accessories",
    ],
    serviceItems: [
      "Motor installation",
      "Motor servicing",
      "Troubleshooting",
      "Maintenance",
      "Replacement",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "openwell-motor",
    name: "Openwell Motor Sales & Service",
    category: "plumbing-motors",
    badge: "Sales & Repair",
    iconKey: "waves",
    shortDescription:
      "Openwell motor supply, installation, and maintenance for water pumping needs across homes, farms, and commercial buildings.",
    longDescription:
      "NextGen Service provides openwell motor sales and complete installation services for residential and agricultural water pumping requirements. We supply motor units and pump accessories suited to the well dimensions and water usage needs of your property. Our technicians install and commission the motor system, ensuring correct alignment, wiring, and priming before handover. We follow up with servicing, repair, and maintenance visits to keep the pump running efficiently and to address wear before it leads to a breakdown.",
    imageUrl: "/images/services/openwell-motor.jpg",
    hasSales: true,
    salesItems: [
      "Openwell motor sales",
      "Motor units",
      "Pump accessories",
    ],
    serviceItems: [
      "Installation",
      "Servicing",
      "Repairs",
      "Maintenance",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "cctv",
    name: "CCTV Surveillance Systems",
    category: "security",
    badge: "Top Seller",
    iconKey: "video",
    shortDescription:
      "CCTV camera supply, installation, and cloud/mobile setup for homes and businesses. High-definition monitoring with crisp night vision and remote app access.",
    longDescription:
      "NextGen Service supplies and installs CCTV systems including cameras, DVR and NVR units, and accessories for both indoor and outdoor surveillance. We assess your site layout to determine the most effective camera placement for full coverage of entry points, common areas, and perimeter zones. Our team handles all cabling, device mounting, and system configuration, including remote viewing setup where required. After installation, we provide maintenance visits, troubleshooting support, and component replacement to keep your surveillance system reliable.",
    imageUrl: "/images/services/cctv.jpg",
    hasSales: true,
    salesItems: [
      "CCTV systems",
      "Cameras",
      "DVR/NVR systems",
      "Accessories",
    ],
    serviceItems: [
      "Camera installation",
      "Configuration",
      "Maintenance",
      "Troubleshooting",
      "Replacement",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "automation",
    name: "Smart Home & Industrial Automation",
    category: "automation",
    badge: "Smart Tech",
    iconKey: "cpu",
    shortDescription:
      "Smart automation solutions for convenient control of lighting, gates, motors, and appliances via smartphone or voice assistants.",
    longDescription:
      "NextGen Service supplies and installs automation solutions for residential and commercial properties, enabling centralised or remote control of lighting, appliances, gates, and other connected systems. We work with automation devices, smart controllers, and equipment chosen to match your existing infrastructure and usage preferences. Our technicians handle installation, configuration, and initial setup so the system is ready to use from day one. We also provide ongoing maintenance, troubleshooting, and upgrade services as your automation needs evolve.",
    imageUrl: "/images/services/automation.jpg",
    hasSales: true,
    salesItems: [
      "Automation solutions",
      "Automation devices",
      "Controllers",
      "Smart home equipment",
    ],
    serviceItems: [
      "Installation",
      "Configuration",
      "Maintenance",
      "Troubleshooting",
      "Upgrades",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "appliance-installation",
    name: "Appliance Installation & Setup",
    category: "electrical",
    badge: "Precision",
    iconKey: "wrench",
    shortDescription:
      "Professional appliance installation, mounting, and electrical connection for heavy appliances, ACs, water heaters, and machinery.",
    longDescription:
      "NextGen Service provides appliance installation services covering a wide range of household and commercial equipment. Our technicians handle the electrical connection, physical installation, and initial setup of appliances to manufacturer specifications. We carry out a thorough inspection after installation to confirm the appliance is working correctly and safely integrated with your existing electrical system. Where issues arise during installation, we troubleshoot and resolve them before the job is considered complete.",
    imageUrl: "/images/services/appliance-installation.jpg",
    hasSales: false,
    serviceItems: [
      "Appliance installation",
      "Electrical connection",
      "Setup",
      "Inspection",
      "Troubleshooting",
    ],
    hasWhatsApp: true,
  },
  {
    slug: "fault-fixing",
    name: "Emergency Fault Fixing & Diagnostics",
    category: "electrical",
    badge: "24/7 Rapid",
    iconKey: "alert-triangle",
    shortDescription:
      "General electrical, plumbing, and equipment fault diagnosis and rapid repairs. We isolate root causes and restore operation safely.",
    longDescription:
      "NextGen Service offers a fault fixing service covering electrical faults, plumbing issues, motor-related problems, and general technical troubleshooting. When something stops working or behaves unexpectedly, our team carries out a systematic diagnosis to identify the underlying cause rather than just treating the symptom. We handle electrical fault fixing including tripped circuits and wiring faults, plumbing fault fixing such as blockages and pressure issues, and equipment troubleshooting across a range of installed systems. Once the fault is identified, we carry out the repair and test the fix before completing the job.",
    imageUrl: "/images/services/fault-fixing.jpg",
    hasSales: false,
    serviceItems: [
      "Electrical fault fixing",
      "Plumbing fault fixing",
      "Equipment troubleshooting",
      "Motor-related faults",
      "General technical troubleshooting",
    ],
    hasWhatsApp: true,
  },
];

/**
 * Look up a service by its URL slug.
 * Returns undefined if no matching service is found.
 */
export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((service) => service.slug === slug);
}
