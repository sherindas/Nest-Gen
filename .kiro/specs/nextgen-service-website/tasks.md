# Implementation Plan: NextGen Service Website

## Overview

Build a Next.js 14 App Router website with a homepage, 12 service detail pages, 3 form flows, and 3 Vercel serverless API routes persisting to Google Sheets with email notifications via Resend.

## Tasks

- [x] 1. Project scaffolding and shared foundations
  - Initialise Next.js 14 App Router project with TypeScript, Tailwind CSS, and required dependencies (`react-hook-form`, `zod`, `@hookform/resolvers`, `googleapis`, `resend`, `uuid`)
  - Create `src/types/index.ts` with shared TypeScript interfaces (`ServiceDefinition`, `ServiceCardProps`, form prop types)
  - Create `src/schemas/serviceRequest.ts`, `src/schemas/salesEnquiry.ts`, `src/schemas/complaint.ts` with Zod schemas as defined in design
  - Create `src/lib/ids.ts` with unique ID generation functions for SR, SE, CP prefixed IDs
  - Create `.env.local.example` listing all required environment variable keys (no values)
  - _Requirements: 9.1, 11.1, 20.5_

- [x] 2. Service data registry
  - [x] 2.1 Create `src/lib/services.ts` with all 12 `ServiceDefinition` entries, including slugs, names, short/long descriptions, `hasSales`, `salesItems`, `serviceItems`
    - Cover all 12 services from the design's service registry table
    - Set `hasSales` correctly per Requirement 17
    - _Requirements: 5.2, 7.4, 8.1, 8.2, 8.4, 17.1–17.8_

  - [ ]* 2.2 Write property test for service registry completeness
    - **Property 1: All 12 slugs are unique kebab-case strings**
    - **Validates: Requirements 5.2, 7.1**

- [x] 3. UI primitives
  - Create `src/components/ui/Button.tsx`, `Input.tsx`, `Select.tsx`, `Textarea.tsx`, `FormField.tsx` as reusable, accessible Tailwind-styled components
  - Each component must support `aria-label`, `aria-invalid`, and error state styling
  - _Requirements: 9.5, 10.5, 11.4, 18.1_

- [x] 4. Layout components
  - [x] 4.1 Create `src/components/layout/StickyHeader.tsx` with logo, nav links (Home, Services, About, Contact), and primary CTA button; fixed positioning via Tailwind `sticky top-0`
    - _Requirements: 2.1, 2.2, 2.3_
  - [x] 4.2 Add hamburger menu toggle to `StickyHeader.tsx` for viewports < 768px using React `useState`; render nav links as vertical overlay when open
    - _Requirements: 2.4, 2.5_
  - [x] 4.3 Create `src/components/layout/Footer.tsx` with company name, nav links, contact details, copyright notice
    - _Requirements: 19.8_
  - [x] 4.4 Wire `StickyHeader` and `Footer` into `src/app/layout.tsx` root layout
    - _Requirements: 2.1, 1.2_

- [x] 5. Homepage — core sections
  - [x] 5.1 Create `src/components/homepage/HeroSection.tsx` with headline, subheadline, full-width background visual, and three CTA buttons (Request Service, Sales Enquiry, Raise a Complaint) that scroll/navigate to corresponding forms
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 5.2 Create `src/components/homepage/QuickActionCards.tsx` with exactly three cards; responsive row stacking below 768px
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 5.3 Create `src/components/homepage/AboutSection.tsx`, `WhyChooseUs.tsx`, `HowItWorks.tsx`, `SalesServiceCTA.tsx`, `Testimonials.tsx` (≥3 testimonials), `ServiceAreas.tsx`, `FAQ.tsx` (≥5 Q&A), `ContactCTA.tsx`
    - _Requirements: 19.1–19.7_

- [x] 6. ServiceCard component and Our Services section
  - [x] 6.1 Create `src/components/service/ServiceCard.tsx` implementing `ServiceCardProps`; show "Sales Enquiry" button only when `hasSalesEnquiry` is true; hover effects with ≤200ms CSS transition; "Request Service" links to form with service pre-populated
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  - [x] 6.2 Create `src/components/homepage/ServicesSection.tsx` rendering all 12 `ServiceCard` components in a responsive 3/2/1 column grid (1024px / 640px / below)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 7. Homepage page assembly
  - Assemble `src/app/page.tsx` rendering all 13 sections in exact order: Sticky Header (via layout), Hero, Quick Action Cards, About, Our Services, Why Choose Us, How It Works, Sales & Service CTA, Testimonials, Service Areas, FAQ, Contact CTA, Footer (via layout)
  - _Requirements: 1.1, 1.3_

- [ ] 8. Checkpoint — homepage renders correctly
  - Ensure all homepage sections render without errors and responsive grid breakpoints work at 320px, 375px, 768px, 1024px, 1440px. Ask the user if questions arise.

- [x] 9. Service Detail Page components
  - [x] 9.1 Create `src/components/service/ServiceHero.tsx` with headline, supporting text, and three CTA buttons (Request Service, Contact Us, Raise a Complaint); include `tel:` link and `https://wa.me/` deep link
    - _Requirements: 7.3, 16.1, 16.2, 16.3_
  - [x] 9.2 Create `src/components/service/ServiceAbout.tsx` for the "About This Service" section using the service's `longDescription`
    - _Requirements: 7.4, 8.2, 8.3_
  - [x] 9.3 Create `src/components/service/SalesServiceSection.tsx` that conditionally renders Sales and Service subsections based on `hasSales`; omit Sales section where `hasSales` is false
    - _Requirements: 7.5, 17.1–17.8_
  - [x] 9.4 Create `src/components/service/ServiceBottomCTA.tsx` with Request Service, conditional Sales Enquiry, and Contact Us buttons
    - _Requirements: 7.8, 16.4_

- [x] 10. Service Detail Page routing
  - Create `src/app/services/[slug]/page.tsx` that looks up the service from `services.ts` by slug, returns 404 for unknown slugs, and renders sections in order: ServiceHero, ServiceAbout, SalesServiceSection (if applicable), ServiceRequestForm (pre-populated), Complaint Form CTA, ServiceBottomCTA
  - Add `generateStaticParams` to pre-render all 12 service slugs at build time
  - _Requirements: 7.1, 7.2, 7.6, 7.7_

- [x] 11. Form components (client-side)
  - [x] 11.1 Create `src/components/forms/ServiceRequestForm.tsx` using `react-hook-form` + Zod resolver; all fields per Requirement 9.1; `defaultService` prop pre-populates the Service field; show per-field validation errors; show success/error banners
    - _Requirements: 9.1, 9.2, 9.5, 9.6, 9.7_
  - [x] 11.2 Create `src/components/forms/SalesEnquiryForm.tsx` with all fields per Requirement 11.1; `defaultService` prop; validation, success, and error states
    - _Requirements: 11.1, 11.4, 11.5, 11.6_
  - [x] 11.3 Create `src/components/forms/ComplaintForm.tsx` with all fields per Requirement 10.1 including image upload (JPEG/PNG/WEBP, max 5MB client-side check); `defaultService` prop; validation, success, and error states
    - _Requirements: 10.1, 10.2, 10.5, 10.6, 10.7, 10.8_

- [ ] 12. Checkpoint — forms validate and render correctly
  - Ensure client-side validation triggers correctly for all required fields across all three forms. Ask the user if questions arise.

- [x] 13. Backend helpers
  - [x] 13.1 Create `src/lib/sheets.ts` — Google Sheets client using service account JWT auth (`googleapis`); export `appendRow(sheetName, values)` helper that authenticates via env vars and appends a row
    - _Requirements: 20.2, 20.5, 12.1, 13.1, 14.1_
  - [x] 13.2 Create `src/lib/email.ts` — Resend email helper; export `sendNotification(subject, html)` that sends to `NOTIFICATION_EMAIL`; on failure, log error and return without throwing
    - _Requirements: 15.1, 15.2, 15.3, 15.4_
  - [ ]* 13.3 Write unit tests for `ids.ts` ID generation
    - Verify SR/SE/CP prefix, date segment, and 6-char random segment
    - **Validates: Requirements 12.2, 13.2, 14.2**

- [x] 14. API route — /api/service-request
  - Create `src/app/api/service-request/route.ts`; server-side Zod validation; return 400 with error list on invalid input; generate SR ID, build row, call `appendRow`; send email notification; return 200 `{ success: true, submissionId }`; return 500 on Sheets failure
  - _Requirements: 9.3, 9.4, 9.6, 12.1, 12.2, 12.3, 15.1, 20.1, 20.2, 20.3, 20.4, 20.6_

  - [ ]* 14.1 Write property test for service-request API validation
    - **Property 2: Any payload missing a required field returns HTTP 400**
    - **Validates: Requirements 9.5, 20.3**

- [x] 15. API route — /api/sales-enquiry
  - Create `src/app/api/sales-enquiry/route.ts`; server-side Zod validation; return 400 on invalid; generate SE ID; call `appendRow`; send email notification; return 200 `{ success: true, enquiryId }`; return 500 on Sheets failure
  - _Requirements: 11.2, 11.3, 11.5, 13.1, 13.2, 13.3, 13.4, 15.2, 20.1, 20.2, 20.3, 20.4, 20.6_

  - [ ]* 15.1 Write property test for sales-enquiry API validation
    - **Property 3: Any payload missing name or mobile returns HTTP 400**
    - **Validates: Requirements 11.4, 20.3**

- [x] 16. API route — /api/complaint
  - Create `src/app/api/complaint/route.ts`; parse `multipart/form-data`; server-side Zod validation; validate image type and size (JPEG/PNG/WEBP, ≤5MB); upload image to Google Drive if present and store URL; generate CP ID; call `appendRow`; send email notification; return 200 `{ success: true, complaintId }`; return 500 on Sheets failure
  - _Requirements: 10.3, 10.4, 10.6, 10.8, 14.1, 14.2, 14.3, 15.3, 20.1, 20.2, 20.3, 20.4, 20.6_

  - [ ]* 16.1 Write property test for complaint API validation
    - **Property 4: Any payload missing required fields returns HTTP 400**
    - **Validates: Requirements 10.5, 20.3**

  - [ ]* 16.2 Write property test for complaint image validation
    - **Property 5: Files exceeding 5MB or with non-image MIME types are rejected before any Sheets write**
    - **Validates: Requirements 10.8**

- [ ] 17. Checkpoint — API routes respond correctly
  - Ensure all three API routes return correct status codes for valid and invalid payloads using automated tests. Ask the user if questions arise.

- [x] 18. Responsive design and accessibility pass
  - Audit all pages and components for mobile-first layout correctness: no horizontal scroll, full-width stacked forms and cards below 768px, correct grid columns at all breakpoints
  - Ensure all interactive elements have accessible labels (`aria-label`, `aria-invalid`, focus rings)
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 19. Integration wiring — forms call API routes
  - Wire each form component's submit handler to call its corresponding API endpoint via `fetch`; handle loading state, success state (show confirmation), and error state (show error banner with retry guidance)
  - _Requirements: 9.6, 9.7, 10.6, 10.7, 11.5, 11.6_

- [ ] 20. Final checkpoint — end-to-end automated tests pass
  - Ensure all unit and property tests pass, all three forms submit correctly to their API routes in a test environment, and all 12 service pages render without errors. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical boundaries
- Property tests validate universal correctness properties; unit tests cover specific edge cases
- All Google API credentials and Resend API key must be configured as Vercel environment variables — never commit secrets
