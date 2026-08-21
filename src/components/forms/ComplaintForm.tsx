"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Textarea, Button } from "@/components/ui";
import { complaintSchema, ComplaintFormData } from "@/schemas/complaint";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const COMPLAINT_TYPE_OPTIONS = [
  { value: "Product Issue", label: "Product Issue" },
  { value: "Installation Issue", label: "Installation Issue" },
  { value: "Service Issue", label: "Service Issue" },
  { value: "Technical Issue", label: "Technical Issue" },
  { value: "Warranty Issue", label: "Warranty Issue" },
  { value: "Other", label: "Other" },
];

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface ComplaintFormProps {
  defaultService?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function ComplaintForm({ defaultService }: ComplaintFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    mode: "onBlur",
    defaultValues: {
      serviceProduct: defaultService ?? "",
    },
  });

  // ── Image validation ────────────────────────────────────────────────────────

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageError(null);

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Only JPEG, PNG, and WEBP images are accepted.");
      setImageFile(null);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError("Image must be 5 MB or smaller.");
      setImageFile(null);
      e.target.value = "";
      return;
    }

    setImageFile(file);
  };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const onSubmit = async (data: ComplaintFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validate the non-file fields using safeParse before building FormData
    const parsed = complaintSchema.safeParse(data);
    if (!parsed.success) {
      // react-hook-form already surfaces field errors — this is a safety net
      setErrorMessage("Please fix the validation errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("mobile", data.mobile);
    if (data.email) formData.append("email", data.email);
    formData.append("serviceProduct", data.serviceProduct);
    formData.append("complaintType", data.complaintType);
    if (data.invoiceReference) formData.append("invoiceReference", data.invoiceReference);
    formData.append("location", data.location);
    formData.append("complaintDescription", data.complaintDescription);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        body: formData,
        // Do NOT set Content-Type manually — browser sets it with boundary
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
        "Your complaint has been submitted successfully. Our team will follow up with you soon."
      );
      reset({ serviceProduct: defaultService ?? "" });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  return (
    <section
      id="complaint"
      className="w-full bg-white py-12 px-4"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Raise a Complaint
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

          {/* Service / Product */}
          <Input
            label="Service / Product"
            required
            placeholder="Enter the service or product"
            readOnly={Boolean(defaultService)}
            className={defaultService ? "bg-gray-50 cursor-not-allowed" : ""}
            error={errors.serviceProduct?.message}
            {...register("serviceProduct")}
          />

          {/* Complaint Type */}
          <Select
            label="Complaint Type"
            required
            placeholder="Select complaint type"
            options={COMPLAINT_TYPE_OPTIONS}
            error={errors.complaintType?.message}
            {...register("complaintType")}
          />

          {/* Invoice / Reference Number */}
          <Input
            label="Invoice / Reference Number"
            placeholder="Enter invoice or reference number (optional)"
            error={errors.invoiceReference?.message}
            {...register("invoiceReference")}
          />

          {/* Location */}
          <Input
            label="Location"
            required
            placeholder="Enter your location"
            error={errors.location?.message}
            {...register("location")}
          />

          {/* Complaint Description */}
          <Textarea
            label="Complaint Description"
            required
            placeholder="Describe your complaint in detail"
            error={errors.complaintDescription?.message}
            {...register("complaintDescription")}
          />

          {/* Image Upload — managed with useState, not react-hook-form */}
          <div className="w-full">
            <label
              htmlFor="complaint-image"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Upload Image{" "}
              <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <input
              id="complaint-image"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              aria-describedby={imageError ? "complaint-image-error" : undefined}
              className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-orange-700 hover:file:bg-orange-100 transition-colors duration-150"
            />
            {imageError && (
              <p
                id="complaint-image-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {imageError}
              </p>
            )}
            {imageFile && !imageError && (
              <p className="mt-1 text-sm text-gray-500">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting…" : "Submit Complaint"}
          </Button>
        </form>
      </div>
    </section>
  );
}
