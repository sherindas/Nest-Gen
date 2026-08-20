"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  MessageSquare,
  Sparkles,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { Input, Select, Textarea, Button } from "@/components/ui";
import { services } from "@/lib/services";
import { useLanguage } from "@/context/LanguageContext";

type InquiryType =
  | "Book a Service / Repair"
  | "Purchase Equipment / Sales Enquiry"
  | "Warranty Support / Existing Service Issue"
  | "General Inquiry";

const serviceNameKn: Record<string, string> = {
  "Electrical Wiring & Renovation": "ವಿದ್ಯುತ್ ವೈರಿಂಗ್ ಮತ್ತು ನವೀಕರಣ (Electrical Wiring)",
  "Open Wiring & Concealed Wiring": "ತೆರೆದ ಮತ್ತು ಗುಪ್ತ ವೈರಿಂಗ್ (Open & Concealed)",
  "Plumbing & Leak Repairs": "ಪ್ಲಂಬಿಂಗ್ ಮತ್ತು ಸೋರಿಕೆ ದುರಸ್ತಿ (Plumbing)",
  "Irrigation Systems & Automation": "ನೀರಾವರಿ ವ್ಯವಸ್ಥೆಗಳು (Irrigation Automation)",
  "Electrical Perimeter Fencing": "ವಿದ್ಯುತ್ ಭದ್ರತಾ ಬೇಲಿ (Electrical Fencing)",
  "Inverter & Battery Systems": "ಇನ್ವರ್ಟರ್ ಮತ್ತು ಬ್ಯಾಟರಿ (Inverter & Battery)",
  "Submersible & Borewell Motors": "ಬೋರ್‌ವೆಲ್ ಮೋಟಾರ್‌ಗಳು (Borewell Motors)",
  "Openwell Motor Pumps": "ಓಪನ್‌ವೆಲ್ ಮೋಟಾರ್ ಪಂಪ್‌ಗಳು (Openwell Motors)",
  "CCTV & Security Surveillance": "ಸಿಸಿಟಿವಿ ಭದ್ರತಾ ವ್ಯವಸ್ಥೆ (CCTV & Security)",
  "Smart Home & Automation": "ಸ್ಮಾರ್ಟ್ ಹೋಮ್ ಆಟೊಮೇಷನ್ (Smart Automation)",
  "Automated Water Level Controllers": "ನೀರಿನ ಮಟ್ಟ ನಿಯಂತ್ರಕಗಳು (Water Level Controller)",
  "Motor Starter & Control Panels": "ಮೋಟಾರ್ ಸ್ಟಾರ್ಟರ್ ಪ್ಯಾನೆಲ್‌ಗಳು (Starter & Panels)",
};

export function UnifiedServiceHub({ initialService }: { initialService?: string }) {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  // Form State
  const [inquiryType, setInquiryType] = useState<InquiryType>("Book a Service / Repair");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [selectedService, setSelectedService] = useState(
    initialService || searchParams.get("service") || "Electrical Wiring & Renovation"
  );
  const [requirementType, setRequirementType] = useState("Diagnostic & Repair");
  const [preferredDate, setPreferredDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [invoiceRef, setInvoiceRef] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 93535 98831";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919353598831";

  // Inquiry options
  const INQUIRY_OPTIONS = [
    { value: "Book a Service / Repair", label: t("form_inquiry_opt_service") },
    { value: "Purchase Equipment / Sales Enquiry", label: t("form_inquiry_opt_sales") },
    { value: "Warranty Support / Existing Service Issue", label: t("form_inquiry_opt_support") },
    { value: "General Inquiry", label: t("form_inquiry_opt_general") },
  ];

  const SERVICE_OPTIONS = [
    ...services.map((s) => ({
      value: s.name,
      label: language === "kn" ? serviceNameKn[s.name] || s.name : s.name,
    })),
    {
      value: "Other Technical Requirement",
      label: language === "kn" ? "ಇತರ ತಾಂತ್ರಿಕ ಸೇವೆ (Other)" : "Other Technical Requirement",
    },
  ];

  const REQ_TYPE_OPTIONS = [
    {
      value: "Diagnostic & Repair",
      label: language === "kn" ? "ದುರಸ್ತಿ ಮತ್ತು ತಪಾಸಣೆ (Repair & Fault Fix)" : "Diagnostic & Repair (Breakdown / Fault)",
    },
    {
      value: "New Installation",
      label: language === "kn" ? "ಹೊಸ ಅಳವಡಿಕೆ ಮತ್ತು ಸ್ಥಾಪನೆ (New Installation)" : "New Installation & Commissioning",
    },
    {
      value: "Routine Maintenance",
      label: language === "kn" ? "ನಿಯಮಿತ ನಿರ್ವಹಣೆ (Routine Maintenance)" : "Routine Maintenance & Health Check",
    },
    {
      value: "Equipment Replacement",
      label: language === "kn" ? "ಬದಲಾವಣೆ / ಅಪ್‌ಗ್ರೇಡ್ (Replacement)" : "Equipment Replacement & Upgrade",
    },
    {
      value: "Other",
      label: language === "kn" ? "ಇತರ ಅಗತ್ಯತೆ (Other)" : "Other Technical Work",
    },
  ];

  // Listen for dynamic custom events from cards or quick action links
  useEffect(() => {
    const handleSelectInquiry = (e: Event) => {
      const customEvent = e as CustomEvent<{
        service?: string;
        inquiryType?: InquiryType;
      }>;
      if (customEvent.detail?.inquiryType) {
        setInquiryType(customEvent.detail.inquiryType);
      }
      if (customEvent.detail?.service) {
        setSelectedService(customEvent.detail.service);
      }
    };

    window.addEventListener("nextgen-select-inquiry", handleSelectInquiry);
    return () => {
      window.removeEventListener("nextgen-select-inquiry", handleSelectInquiry);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!fullName.trim()) {
      setErrorMessage(
        language === "kn" ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ." : "Please enter your full name."
      );
      return;
    }
    if (!mobile.trim() || mobile.replace(/\D/g, "").length < 10) {
      setErrorMessage(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10 ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }
    if (!location.trim()) {
      setErrorMessage(
        language === "kn"
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿಳಾಸ ಅಥವಾ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ."
          : "Please provide your service location or address."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let endpoint = "/api/service-request";
      let payload: Record<string, unknown> = {
        fullName,
        mobile,
        email: email || undefined,
        location,
        service: selectedService,
        requirementType,
        preferredDate: preferredDate || undefined,
        description: description || `Inquiry: ${inquiryType} for ${selectedService}`,
      };

      if (inquiryType === "Purchase Equipment / Sales Enquiry") {
        endpoint = "/api/sales-enquiry";
        payload = {
          name: fullName,
          mobile,
          email: email || undefined,
          location,
          productServiceRequirement: selectedService,
          quantity: quantity || undefined,
          message: description || `Sales quotation request for ${selectedService}`,
        };
      } else if (inquiryType === "Warranty Support / Existing Service Issue") {
        endpoint = "/api/complaint";
        payload = {
          fullName,
          mobile,
          email: email || undefined,
          location,
          serviceProduct: selectedService,
          complaintType: "Service Issue",
          invoiceReference: invoiceRef || undefined,
          complaintDescription: description || `Warranty assistance for ${selectedService}`,
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(
        error.message ||
          (language === "kn"
            ? "ವಿನಂತಿ ಸಲ್ಲಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಕರೆ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ."
            : "Failed to submit. Please contact us via phone or WhatsApp.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setDescription("");
    setQuantity("");
    setInvoiceRef("");
  };

  return (
    <section id="service-hub" className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("hub_tag")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            {t("hub_title")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {t("hub_desc")}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  {t("form_success_title")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t("form_success_desc")}
                </p>
              </div>

              <div className="pt-3 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("form_btn_another")}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              {errorMessage && (
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Inquiry Type Dropdown */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 sm:space-y-2">
                <label className="block text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  {t("form_inquiry_type")} <span className="text-orange-600">*</span>
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <Input
                  label={t("form_full_name")}
                  required
                  placeholder={t("form_full_name_ph")}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  label={t("form_mobile")}
                  type="tel"
                  required
                  placeholder={t("form_mobile_ph")}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              {/* 3. Location & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <Input
                  label={t("form_location")}
                  required
                  placeholder={t("form_location_ph")}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Input
                  label={t("form_email")}
                  type="email"
                  hint={t("form_email_hint")}
                  placeholder={t("form_email_ph")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* 4. Dynamic fields based on Inquiry Type */}
              {inquiryType === "Book a Service / Repair" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <Select
                      label={t("form_service_needed")}
                      required
                      placeholder={t("form_service_ph")}
                      options={SERVICE_OPTIONS}
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    />
                    <Select
                      label={t("form_req_type")}
                      required
                      options={REQ_TYPE_OPTIONS}
                      value={requirementType}
                      onChange={(e) => setRequirementType(e.target.value)}
                    />
                  </div>

                  <Input
                    label={t("form_date")}
                    type="date"
                    hint={t("form_date_hint")}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                  />
                </>
              )}

              {inquiryType === "Purchase Equipment / Sales Enquiry" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <Select
                    label={language === "kn" ? "ಅಗತ್ಯವಿರುವ ಉಪಕರಣ / ಉತ್ಪನ್ನ" : "Equipment / Product Required"}
                    required
                    options={SERVICE_OPTIONS}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  />
                  <Input
                    label={t("form_quantity")}
                    hint={t("form_quantity_hint")}
                    placeholder={t("form_quantity_ph")}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              )}

              {inquiryType === "Warranty Support / Existing Service Issue" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <Select
                    label={language === "kn" ? "ಹಿಂದಿನ ಸೇವೆ / ಉತ್ಪನ್ನ" : "Original Service / Product"}
                    required
                    options={SERVICE_OPTIONS}
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  />
                  <Input
                    label={language === "kn" ? "ಇನ್‌ವಾಯ್ಸ್ ಅಥವಾ ರಶೀದಿ ಸಂಖ್ಯೆ" : "Invoice / Job Reference"}
                    hint="Optional"
                    placeholder="e.g. Inv #1042"
                    value={invoiceRef}
                    onChange={(e) => setInvoiceRef(e.target.value)}
                  />
                </div>
              )}

              {/* 5. Details / Message */}
              <Textarea
                label={t("form_desc")}
                rows={3}
                placeholder={t("form_desc_ph")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="dark"
                size="lg"
                loading={isSubmitting}
                className="w-full mt-2 font-bold py-3.5 bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
              >
                <span>{isSubmitting ? t("form_btn_submitting") : t("form_btn_submit")}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          )}
        </div>

        {/* Direct Contact Shortcut: Responsive Stack on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 shadow-sm">
          <div className="text-slate-700 font-medium text-center sm:text-left">
            <span>{t("form_direct_help")}</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${phone}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
              <span>{t("form_call_btn")} {phone}</span>
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=Hi%2C+I+need+service+assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t("form_whatsapp_btn")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UnifiedServiceHub;
