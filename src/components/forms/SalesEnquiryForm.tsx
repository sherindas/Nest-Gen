"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, Button } from "@/components/ui";
import {
  salesEnquirySchema,
  SalesEnquiryFormData,
} from "@/schemas/salesEnquiry";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface SalesEnquiryFormProps {
  defaultService?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function SalesEnquiryForm({ defaultService }: SalesEnquiryFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SalesEnquiryFormData>({
    resolver: zodResolver(salesEnquirySchema),
    defaultValues: {
      productServiceRequirement: defaultService ?? "",
    },
  });

  const onSubmit = async (data: SalesEnquiryFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/sales-enquiry", {
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
        "Your sales enquiry has been sent successfully. Our team will reach out shortly!"
      );
      reset({ productServiceRequirement: defaultService ?? "" });
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  return (
    <section
      id="sales-enquiry"
      className="w-full bg-gray-50 py-12 px-4"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Sales Enquiry
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
          {/* Name */}
          <Input
            label="Name"
            required
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name")}
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

          {/* Product / Service Requirement */}
          <Input
            label="Product / Service Requirement"
            placeholder="What are you looking to purchase? (optional)"
            error={errors.productServiceRequirement?.message}
            {...register("productServiceRequirement")}
          />

          {/* Quantity */}
          <Input
            label="Quantity"
            placeholder="Enter quantity (optional)"
            error={errors.quantity?.message}
            {...register("quantity")}
          />

          {/* Location */}
          <Input
            label="Location"
            placeholder="Enter your location (optional)"
            error={errors.location?.message}
            {...register("location")}
          />

          {/* Message */}
          <Textarea
            label="Message"
            placeholder="Any additional details or questions (optional)"
            error={errors.message?.message}
            {...register("message")}
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Sending…" : "Send Enquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
}
