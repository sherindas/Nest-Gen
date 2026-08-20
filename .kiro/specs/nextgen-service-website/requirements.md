# Requirements Document

## Introduction

NextGen Service is a professional service company offering electrical, plumbing, motor, security, automation, and installation solutions for homes and businesses. This document defines requirements for the NextGen Service company website, which serves as both a public-facing marketing site and a lightweight lead, service, and complaint management system. The website allows customers to discover services, make service requests, submit sales enquiries, and raise complaints — all routed to a Google Sheets backend via Vercel API with email notifications.

---

## Glossary

- **Website**: The NextGen Service public-facing web application
- **Homepage**: The root URL page (`/`) of the Website
- **Service_Card**: A UI component on the Homepage displaying a single service with image, title, description, and action buttons
- **Service_Detail_Page**: A dedicated page at `/services/{slug}` for a specific service
- **Service_Request_Form**: A form for customers to request a new installation, repair, maintenance, or other service
- **Sales_Enquiry_Form**: A form for customers to enquire about purchasing a product or equipment
- **Complaint_Form**: A form for customers to raise a complaint about an existing service or product
- **Quick_Action_Cards**: Three prominent cards shown below the hero section on the Homepage for the three primary customer journeys
- **Backend**: Vercel serverless API functions that receive form submissions
- **Google_Sheets**: The data store where all submissions are persisted in separate sheets
- **Email_Notification**: An automated email sent to the NextGen Service team upon every form submission
- **Sticky_Header**: A navigation bar that remains fixed at the top of the viewport during scrolling
- **Service_Slug**: A URL-safe kebab-case identifier for each service (e.g., `electrical-wiring`, `plumbing`)
- **CTA**: Call-to-action button or link prompting the customer to take a specific action
- **Enquiry_ID**: A unique identifier auto-generated for each sales enquiry record
- **Status**: The current workflow state of a record in Google Sheets

---

## Requirements

### Requirement 1: Homepage Layout and Section Order

**User Story:** As a potential customer visiting the site, I want to see a well-organised homepage that guides me through NextGen Service's offerings and actions, so that I can quickly find what I need without confusion.

#### Acceptance Criteria

1. THE Website SHALL render the Homepage with sections in the following order: Sticky Header, Hero Section, Quick Action Cards, About NextGen Service, Our Services, Why Choose Us, How It Works, Sales & Service CTA, Customer Testimonials, Service Areas, FAQ, Contact CTA, Footer.
2. THE Sticky_Header SHALL remain fixed at the top of the viewport as the user scrolls through any page.
3. THE Homepage SHALL display all 13 named sections without omitting any.

---

### Requirement 2: Sticky Header Navigation

**User Story:** As a site visitor, I want a persistent navigation bar at the top of every page, so that I can navigate to any section or page at any time without scrolling back to the top.

#### Acceptance Criteria

1. THE Sticky_Header SHALL contain the NextGen Service logo, navigation links, and a primary CTA button.
2. WHEN a user scrolls past the top of the page, THE Sticky_Header SHALL remain visible at the top of the viewport.
3. THE Sticky_Header SHALL display navigation links to: Home, Services, About, Contact.
4. WHERE the device viewport width is less than 768px, THE Sticky_Header SHALL collapse navigation links into a hamburger menu.
5. WHEN a hamburger menu icon is tapped on a mobile device, THE Sticky_Header SHALL expand and display the navigation links as a vertical menu overlay.

---

### Requirement 3: Hero Section

**User Story:** As a first-time visitor, I want to immediately understand what NextGen Service does and have clear options to take action, so that I can quickly engage with the service most relevant to me.

#### Acceptance Criteria

1. THE Hero Section SHALL display a professional headline, a supporting subheadline, and at minimum three CTA buttons: Request Service, Sales Enquiry, Raise a Complaint.
2. THE Hero Section SHALL render a full-width background image or visual that conveys professionalism and relevance to the services offered.
3. WHEN a user clicks the "Request Service" CTA in the Hero Section, THE Website SHALL scroll to or navigate to the Service_Request_Form.
4. WHEN a user clicks the "Sales Enquiry" CTA in the Hero Section, THE Website SHALL scroll to or navigate to the Sales_Enquiry_Form.
5. WHEN a user clicks the "Raise a Complaint" CTA in the Hero Section, THE Website SHALL scroll to or navigate to the Complaint_Form.

---

### Requirement 4: Quick Action Cards

**User Story:** As a returning customer, I want three prominent action cards directly below the hero so that I can immediately choose my journey — new service, purchase, or complaint — without reading the entire page.

#### Acceptance Criteria

1. THE Homepage SHALL display exactly three Quick_Action_Cards below the Hero Section with the following labels and actions:
   - "Need a New Service?" → navigates to Service_Request_Form
   - "Looking to Buy?" → navigates to Sales_Enquiry_Form
   - "Existing Service Issue?" → navigates to Complaint_Form
2. WHEN a user clicks a Quick_Action_Card, THE Website SHALL navigate or scroll to the corresponding form.
3. THE Quick_Action_Cards SHALL be displayed in a responsive row that stacks vertically on viewports narrower than 768px.

---

### Requirement 5: Our Services Section on Homepage

**User Story:** As a potential customer, I want to see all services NextGen Service offers directly on the homepage, so that I do not have to navigate to a separate page to understand the full service portfolio.

#### Acceptance Criteria

1. THE Homepage SHALL contain a section titled "Our Services" with supporting text: "Complete electrical, plumbing, motor, security, automation and installation solutions for homes and businesses."
2. THE Our Services section SHALL display all 12 services in a responsive grid: Electrical Wiring & Renovation, Open Wiring & Concealed Wiring, Plumbing, Irrigation System, Electrical Fencing, Inverter Sales, Borewell Motor Service & Installation, Openwell Motor Sales, Service & Installation, CCTV, Automation, Appliance Installation, Fault Fixing.
3. THE Our Services section SHALL render each service as a Service_Card.
4. WHERE the viewport width is 1024px or wider, THE Our Services section SHALL display Service_Cards in a grid of at least 3 columns.
5. WHERE the viewport width is between 640px and 1023px, THE Our Services section SHALL display Service_Cards in a 2-column grid.
6. WHERE the viewport width is below 640px, THE Our Services section SHALL display Service_Cards in a single-column stack.

---

### Requirement 6: Service Card Component

**User Story:** As a site visitor browsing the services, I want each service card to be visually engaging and give me immediate actions, so that I can either learn more or request the service without extra steps.

#### Acceptance Criteria

1. THE Service_Card SHALL display: a professional image or icon, the service name, a short description, a "View Details" button, and a "Request Service" button.
2. WHEN a service offers sales of products or equipment, THE Service_Card SHALL additionally display a "Sales Enquiry" button.
3. WHEN a user hovers over a Service_Card on a non-touch device, THE Service_Card SHALL apply a slight elevation shadow, a zoom effect on the service image, and a more prominent CTA style, with a smooth CSS transition of 200ms or less.
4. WHEN a user clicks the "View Details" button on a Service_Card, THE Website SHALL navigate to the corresponding Service_Detail_Page at `/services/{slug}`.
5. WHEN a user clicks the "Request Service" button on a Service_Card, THE Website SHALL navigate to the Service_Request_Form with the Service field pre-populated with the selected service name.

---

### Requirement 7: Service Detail Page Structure

**User Story:** As a customer interested in a specific service, I want a dedicated page for each service that gives me full information and immediate access to all actions, so that I can make a decision and engage without returning to the homepage.

#### Acceptance Criteria

1. THE Website SHALL serve a unique Service_Detail_Page at the URL `/services/{slug}` for each of the 12 services.
2. THE Service_Detail_Page SHALL render sections in the following order: Hero Section, About This Service, Sales and Service Section (where applicable), Service Request Form, Complaint Form CTA, Bottom CTA Section.
3. THE Service_Detail_Page Hero Section SHALL display a professional headline, supporting text, and three CTA buttons: Request Service, Contact Us, Raise a Complaint.
4. THE Service_Detail_Page SHALL display an "About This Service" section with a detailed, customer-readable description of the service using no unsupported technical claims.
5. WHEN a service involves both sales and service activities, THE Service_Detail_Page SHALL display a "Sales and Service" section that clearly distinguishes between SALES (products/equipment supplied) and SERVICE (installation, maintenance, repair).
6. THE Service_Detail_Page SHALL include a Service_Request_Form with the Service field pre-populated with the name of the service for that page.
7. THE Service_Detail_Page SHALL include a Complaint Form CTA that links to the Complaint_Form with the Service/Product field pre-populated with the name of the service for that page.
8. THE Service_Detail_Page SHALL include a Bottom CTA section with prominent action buttons: Request Service, Sales Enquiry (where applicable), Contact Us.

---

### Requirement 8: Service Descriptions

**User Story:** As a customer with no technical background, I want clear, plain-language descriptions of each service, so that I can understand what NextGen Service offers before making a decision.

#### Acceptance Criteria

1. THE Website SHALL provide a detailed description for each of the 12 services on its corresponding Service_Detail_Page.
2. THE Service_Detail_Page description SHALL be written in plain language accessible to non-technical customers.
3. THE Service_Detail_Page description SHALL not make unsupported technical performance claims.
4. WHEN a service involves both equipment sales and installation or maintenance, THE Service_Detail_Page SHALL describe both the sales and service aspects separately.

---

### Requirement 9: Service Request Form

**User Story:** As a customer needing a service, I want a simple form to submit my requirement so that NextGen Service can contact me and arrange the work.

#### Acceptance Criteria

1. THE Service_Request_Form SHALL include the following fields: Full Name (required), Mobile Number (required), Email Address (optional), Service (required, auto-populated on Service_Detail_Page), Requirement Type (required), Location (required), Preferred Date (optional), Description (required).
2. THE Service_Request_Form Requirement Type field SHALL offer the following options: New Installation, Purchase/Sales Enquiry, Repair, Maintenance, Service, Replacement, Other.
3. WHEN a user submits the Service_Request_Form with all required fields completed, THE Backend SHALL store the submission in the Service Requests sheet in Google_Sheets.
4. WHEN a user submits the Service_Request_Form with all required fields completed, THE Backend SHALL send an Email_Notification to the NextGen Service team.
5. IF a user submits the Service_Request_Form with one or more required fields empty, THEN THE Service_Request_Form SHALL display a validation error message next to each empty required field and SHALL NOT submit the form.
6. IF the Backend fails to store the submission, THEN THE Service_Request_Form SHALL display an error message informing the customer to try again or contact NextGen Service directly.
7. WHEN a submission is successfully stored, THE Service_Request_Form SHALL display a confirmation message to the customer.

---

### Requirement 10: Complaint Form

**User Story:** As an existing customer with an issue, I want a dedicated complaint form so that I can formally log my issue and expect a follow-up from NextGen Service.

#### Acceptance Criteria

1. THE Complaint_Form SHALL include the following fields: Full Name (required), Mobile Number (required), Email Address (optional), Service/Product (required, auto-populated on Service_Detail_Page), Complaint Type (required), Invoice/Reference Number (optional), Location (required), Complaint Description (required), Upload Image (optional).
2. THE Complaint_Form Complaint Type field SHALL offer the following options: Product Issue, Installation Issue, Service Issue, Technical Issue, Warranty Issue, Other.
3. WHEN a user submits the Complaint_Form with all required fields completed, THE Backend SHALL store the submission in the Complaints sheet in Google_Sheets.
4. WHEN a user submits the Complaint_Form with all required fields completed, THE Backend SHALL send an Email_Notification to the NextGen Service team.
5. IF a user submits the Complaint_Form with one or more required fields empty, THEN THE Complaint_Form SHALL display a validation error message next to each empty required field and SHALL NOT submit the form.
6. IF the Backend fails to store the submission, THEN THE Complaint_Form SHALL display an error message informing the customer to try again or contact NextGen Service directly.
7. WHEN a submission is successfully stored, THE Complaint_Form SHALL display a confirmation message to the customer.
8. WHEN a user uploads an image via the Complaint_Form, THE Complaint_Form SHALL accept image files only (JPEG, PNG, WEBP) with a maximum file size of 5MB.

---

### Requirement 11: Sales Enquiry Form

**User Story:** As a customer interested in purchasing equipment or products from NextGen Service, I want a sales enquiry form so that I can express my purchase intent and receive a quotation.

#### Acceptance Criteria

1. THE Sales_Enquiry_Form SHALL include the following fields: Name (required), Mobile (required), Email (optional), Product/Service Requirement (optional), Quantity (optional), Location (optional), Message (optional).
2. WHEN a user submits the Sales_Enquiry_Form with all required fields completed, THE Backend SHALL store the submission in the Sales Enquiries sheet in Google_Sheets.
3. WHEN a user submits the Sales_Enquiry_Form with all required fields completed, THE Backend SHALL send an Email_Notification to the NextGen Service team.
4. IF a user submits the Sales_Enquiry_Form with one or more required fields empty, THEN THE Sales_Enquiry_Form SHALL display a validation error message next to each empty required field and SHALL NOT submit the form.
5. IF the Backend fails to store the submission, THEN THE Sales_Enquiry_Form SHALL display an error message informing the customer to try again or contact NextGen Service directly.
6. WHEN a submission is successfully stored, THE Sales_Enquiry_Form SHALL display a confirmation message to the customer.

---

### Requirement 12: Google Sheets Data Storage — Service Requests

**User Story:** As a NextGen Service team member, I want all service requests stored in a dedicated Google Sheet so that I can track and manage them efficiently.

#### Acceptance Criteria

1. THE Backend SHALL write each Service_Request_Form submission to a dedicated "Service Requests" sheet in Google_Sheets with columns: Submission ID, Timestamp, Full Name, Mobile Number, Email Address, Service, Requirement Type, Location, Preferred Date, Description, Status, Assigned To, Remarks, Last Updated.
2. THE Backend SHALL auto-generate a unique Submission ID for each service request record.
3. THE Backend SHALL set the initial Status of each new service request record to "New".

---

### Requirement 13: Google Sheets Data Storage — Sales Enquiries

**User Story:** As a NextGen Service sales team member, I want all sales enquiries stored in a dedicated Google Sheet so that I can manage the sales pipeline.

#### Acceptance Criteria

1. THE Backend SHALL write each Sales_Enquiry_Form submission to a dedicated "Sales Enquiries" sheet in Google_Sheets with columns: Enquiry ID, Timestamp, Customer Name, Mobile, Email, Category, Product, Requirement, Quantity, Location, Message, Status, Assigned To, Remarks, Last Updated.
2. THE Backend SHALL auto-generate a unique Enquiry_ID for each sales enquiry record.
3. THE Backend SHALL set the initial Status of each new sales enquiry record to "New".
4. THE Status field for sales enquiries SHALL support the following values: New, Contacted, Quotation Sent, Negotiation, Confirmed, Completed, Cancelled.

---

### Requirement 14: Google Sheets Data Storage — Complaints

**User Story:** As a NextGen Service support team member, I want all complaints stored in a dedicated Google Sheet so that I can track resolution and ensure follow-up.

#### Acceptance Criteria

1. THE Backend SHALL write each Complaint_Form submission to a dedicated "Complaints" sheet in Google_Sheets with columns: Complaint ID, Timestamp, Full Name, Mobile Number, Email Address, Service/Product, Complaint Type, Invoice/Reference Number, Location, Complaint Description, Image Attachment Link, Status, Assigned To, Remarks, Last Updated.
2. THE Backend SHALL auto-generate a unique Complaint ID for each complaint record.
3. THE Backend SHALL set the initial Status of each new complaint record to "New".

---

### Requirement 15: Email Notifications

**User Story:** As a NextGen Service team member, I want to receive an email notification for every new form submission so that I can respond promptly without having to monitor the Google Sheet continuously.

#### Acceptance Criteria

1. WHEN a Service_Request_Form submission is successfully stored, THE Backend SHALL send an Email_Notification to the configured NextGen Service team email address containing: submission type, customer name, mobile number, service name, requirement type, location, and description.
2. WHEN a Sales_Enquiry_Form submission is successfully stored, THE Backend SHALL send an Email_Notification to the configured NextGen Service team email address containing: submission type, customer name, mobile number, product/service requirement, and message.
3. WHEN a Complaint_Form submission is successfully stored, THE Backend SHALL send an Email_Notification to the configured NextGen Service team email address containing: submission type, customer name, mobile number, service/product, complaint type, and complaint description.
4. IF the email sending fails, THEN THE Backend SHALL still complete the Google_Sheets write and SHALL log the email failure without blocking the customer-facing confirmation response.

---

### Requirement 16: Per-Service Customer Action Accessibility

**User Story:** As a customer on any service page, I want immediate access to all key actions — request service, sales enquiry, complaint, phone call, and WhatsApp — without having to search around, so that I can engage with NextGen Service in whichever way I prefer.

#### Acceptance Criteria

1. THE Service_Detail_Page SHALL provide the following actions accessible without scrolling more than one viewport height: Request Service, Sales Enquiry (where applicable), Raise Complaint, Call, WhatsApp.
2. THE Service_Detail_Page SHALL include a clickable phone number link using the `tel:` protocol.
3. THE Service_Detail_Page SHALL include a WhatsApp link using the `https://wa.me/` deep link format pre-filled with a relevant message.
4. WHERE a service does not involve product sales, THE Service_Detail_Page SHALL omit the Sales Enquiry action.

---

### Requirement 17: Sales & Service Distinction Per Service Category

**User Story:** As a customer evaluating a specific service, I want to clearly understand what NextGen Service sells versus what they install or maintain, so that I know what to expect and what to enquire about.

#### Acceptance Criteria

1. THE Service_Detail_Page for Inverter Sales SHALL display a Sales section listing inverter products and brands supplied, and a Service section covering installation and maintenance.
2. THE Service_Detail_Page for Borewell Motor Service & Installation SHALL display a Sales section covering motor units supplied and a Service section covering installation, servicing, and repair.
3. THE Service_Detail_Page for Openwell Motor Sales, Service & Installation SHALL display a Sales section covering motor units supplied and a Service section covering installation, servicing, and repair.
4. THE Service_Detail_Page for CCTV SHALL display a Sales section covering cameras and DVR/NVR systems supplied and a Service section covering installation and maintenance.
5. THE Service_Detail_Page for Automation SHALL display a Sales section covering automation devices and controllers supplied and a Service section covering installation and programming.
6. THE Service_Detail_Page for Electrical Fencing SHALL display a Sales section covering energiser units and fencing materials supplied and a Service section covering installation and maintenance.
7. THE Service_Detail_Page for Appliance Installation SHALL display a Service section covering installation of customer-supplied or NextGen-supplied appliances; a Sales section SHALL be included only if NextGen Service supplies appliances.
8. THE Service_Detail_Page for Electrical Wiring & Renovation, Open Wiring & Concealed Wiring, Plumbing, Irrigation System, and Fault Fixing SHALL display a Service section and SHALL omit the Sales section unless applicable.

---

### Requirement 18: Responsive Design

**User Story:** As a customer accessing the website on a mobile phone, I want every page to be usable and readable on my device, so that I can browse services and submit forms without a degraded experience.

#### Acceptance Criteria

1. THE Website SHALL render correctly and be fully usable at viewport widths of 320px, 375px, 768px, 1024px, and 1440px.
2. THE Website SHALL use a mobile-first responsive layout approach.
3. WHILE the viewport width is below 768px, THE Website SHALL display all form fields as full-width stacked inputs.
4. WHILE the viewport width is below 768px, THE Service_Card SHALL display its image, title, description, and buttons in a single-column vertical layout.
5. THE Website SHALL not display any horizontal scrollbar at any of the defined viewport widths.

---

### Requirement 19: Additional Homepage Sections

**User Story:** As a potential customer, I want to see supporting content such as reasons to choose NextGen Service, how the process works, customer testimonials, service areas, and FAQs, so that I can build trust and answer my questions before contacting them.

#### Acceptance Criteria

1. THE Homepage SHALL include a "Why Choose Us" section listing key differentiators of NextGen Service.
2. THE Homepage SHALL include a "How It Works" section describing the customer journey from enquiry to job completion in a step-by-step format.
3. THE Homepage SHALL include a "Sales & Service CTA" section with prominent buttons linking to the Sales_Enquiry_Form and Service_Request_Form.
4. THE Homepage SHALL include a "Customer Testimonials" section displaying at least three customer testimonials.
5. THE Homepage SHALL include a "Service Areas" section listing the geographic areas served by NextGen Service.
6. THE Homepage SHALL include an "FAQ" section with at least five frequently asked questions and their answers.
7. THE Homepage SHALL include a "Contact CTA" section with the NextGen Service phone number, WhatsApp link, and a link to the contact page or contact form.
8. THE Homepage SHALL include a Footer containing: company name, navigation links, contact details, and copyright notice.

---

### Requirement 20: Backend API — Vercel Serverless Functions

**User Story:** As a developer deploying the site, I want the form submission backend to run as Vercel serverless API functions so that there is no separate server to manage and costs scale with usage.

#### Acceptance Criteria

1. THE Backend SHALL expose three API endpoints, one for each form type: `/api/service-request`, `/api/sales-enquiry`, `/api/complaint`.
2. WHEN a POST request is made to an API endpoint with valid form data, THE Backend SHALL authenticate with Google_Sheets using a service account and append a new row to the correct sheet.
3. IF a POST request is made to an API endpoint with missing required fields, THEN THE Backend SHALL return an HTTP 400 response with a JSON error body listing the missing fields.
4. IF the Google_Sheets write fails, THEN THE Backend SHALL return an HTTP 500 response and SHALL log the error.
5. THE Backend SHALL not expose Google API credentials in client-side code or version control.
6. WHEN a POST request is successfully processed, THE Backend SHALL return an HTTP 200 response with a JSON confirmation body.
