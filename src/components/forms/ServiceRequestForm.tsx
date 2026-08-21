"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Textarea, Button } from "@/components/ui";
import {
  serviceRequestSchema,
  ServiceRequestFormData,
} from "@/schemas/serviceRequest";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const REQUIREMENT_TYPE_OPTIONS = [
  { value: "New Installation", label: "New Installation" },
  { value: "Purchase/Sales Enquiry", label: "Purchase/Sales Enquiry" },
  { value: "Repair", label: "Repair" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Service", label: "Service" },
  { value: "Replacement", label: "Replacement" },
  { value: "Other", label: "Other" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceRequestFormProps {
  defaultService?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceRequestForm({ defaultService }: ServiceRequestFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
    mode: "onBlur",
    defaultValues: {
      service: defaultService ?? "",
    },
  });

  const onSubmit = async (data: ServiceRequestFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg =
          body?.message ??
          "Something went wrong. Please try again or contact us directly.";
        setErrorMessage(msg);
        return;
      }

      setSuccessMessage(
        "Your service request has been submitted successfully. We'll be in touch shortly!"
      );
      reset({ service: defaultService ?? "" });
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  return (
    <section
      id="service-request"
      className="w-full bg-white py-12 px-4"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Request a Service
        </h2>

        {/* Success banner */}
        {successMessage && (
          <div
            role="alert"
            className="mb-6 rounded-md bg-green-50 border border-green-300 px-4 py-3 text-green-800 text-sm"
          >
            {successMessage}
          </div>
        )}

        {/* Error banner */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 rounded-md bg-red-50 border border-red-300 px-4 py-3 text-red-800 text-sm"
          >
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Full Name */}
          <Input
            label="Full Name"
            required
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          {/* Mobile Number */}
          <Input
            label="Mobile Number"
            type="tel"
            required
            placeholder="Enter your mobile number"
            error={errors.mobile?.message}
            {...register("mobile")}
          />

          {/* Email Address */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email (optional)"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Service */}
          <Input
            label="Service"
            required
            placeholder="Enter the service required"
            readOnly={Boolean(defaultService)}
            className={defaultService ? "bg-gray-50 cursor-not-allowed" : ""}
            error={errors.service?.message}
            {...register("service")}
          />

          {/* Requirement Type */}
          <Select
            label="Requirement Type"
            required
            placeholder="Select requirement type"
            options={REQUIREMENT_TYPE_OPTIONS}
            error={errors.requirementType?.message}
            {...register("requirementType")}
          />

          {/* Location */}
          <Input
            label="Location"
            required
            placeholder="Enter your location"
            error={errors.location?.message}
            {...register("location")}
          />

          {/* Preferred Date */}
          <Input
            label="Preferred Date"
            type="date"
            error={errors.preferredDate?.message}
            {...register("preferredDate")}
          />

          {/* Description */}
          <Textarea
            label="Description"
            required
            placeholder="Describe your requirement in detail"
            error={errors.description?.message}
            {...register("description")}
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting…" : "Submit Request"}
          </Button>
        </form>
      </div>
    </section>
  );
}
