import { redirect } from "next/navigation";
import { services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find((s) => s.slug === params.slug);
  const serviceName = service ? encodeURIComponent(service.name) : "";
  redirect(`/?service=${serviceName}#service-hub`);
}
