"use client";

import { useState, type FormEvent } from "react";
import type { WebsiteContent } from "@/types/content";

type EnquiryFields = {
  name: string;
  phone: string;
  email: string;
  studentName: string;
  studentAge: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof EnquiryFields, string>>;

const initialValues: EnquiryFields = {
  name: "",
  phone: "",
  email: "",
  studentName: "",
  studentAge: "",
  message: "",
};

export function EnquiryForm({ content }: { content: WebsiteContent }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ text: string; error: boolean } | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_ENQUIRY_API_URL?.trim();

  const update = (field: keyof EnquiryFields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.phone.trim()) next.phone = "Please enter a phone number.";
    else if (!/^[+]?[\d\s().-]{7,20}$/.test(values.phone.trim())) next.phone = "Enter a valid phone number.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.studentName.trim()) next.studentName = "Please enter the student's name.";
    if (!values.message.trim()) next.message = "Please add a message.";
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0];
      const firstInvalid = firstField ? event.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`) : null;
      firstInvalid?.focus();
      return;
    }
    if (!apiUrl) {
      setStatus({ text: "Online enquiry submission is currently unavailable. Please call us using one of the contact numbers shown on this page.", error: true });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          studentName: values.studentName.trim(),
          studentAge: values.studentAge.trim(),
          message: values.message.trim(),
        }),
      });
      if (!response.ok) throw new Error("The enquiry could not be sent.");
      setValues(initialValues);
      setErrors({});
      setStatus({ text: "Your enquiry has been sent.", error: false });
    } catch {
      setStatus({ text: "We could not send your enquiry. Please try again or contact us by phone.", error: true });
    } finally {
      setSubmitting(false);
    }
  };

  const errorId = (field: keyof EnquiryFields) => `${field}-error`;

  return (
    <form id="enquiry-form" className="info-panel" onSubmit={onSubmit} noValidate>
      <h2>Send an enquiry</h2>
      <p className="body-copy">Share a few details and we will be ready to understand your question.</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="enquiry-name">Name <span aria-hidden="true">*</span></label>
          <input id="enquiry-name" name="name" autoComplete="name" required value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? errorId("name") : undefined} />
          <p className="field-error" id={errorId("name")}>{errors.name}</p>
        </div>
        <div className="field">
          <label htmlFor="enquiry-phone">Phone <span aria-hidden="true">*</span></label>
          <input id="enquiry-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? errorId("phone") : undefined} />
          <p className="field-error" id={errorId("phone")}>{errors.phone}</p>
        </div>
        <div className="field">
          <label htmlFor="enquiry-email">Email</label>
          <input id="enquiry-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? errorId("email") : undefined} />
          <p className="field-error" id={errorId("email")}>{errors.email}</p>
        </div>
        <div className="field">
          <label htmlFor="enquiry-student-name">Student Name <span aria-hidden="true">*</span></label>
          <input id="enquiry-student-name" name="studentName" autoComplete="off" required value={values.studentName} onChange={(event) => update("studentName", event.target.value)} aria-invalid={Boolean(errors.studentName)} aria-describedby={errors.studentName ? errorId("studentName") : undefined} />
          <p className="field-error" id={errorId("studentName")}>{errors.studentName}</p>
        </div>
        <div className="field">
          <label htmlFor="enquiry-age">Student Age</label>
          <input id="enquiry-age" name="studentAge" type="number" inputMode="numeric" value={values.studentAge} onChange={(event) => update("studentAge", event.target.value)} />
          <p className="field-error" aria-hidden="true"> </p>
        </div>
        <div className="field full">
          <label htmlFor="enquiry-message">Message <span aria-hidden="true">*</span></label>
          <textarea id="enquiry-message" name="message" required value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? errorId("message") : undefined} />
          <p className="field-error" id={errorId("message")}>{errors.message}</p>
        </div>
      </div>
      <div className="button-row">
        <button className="button" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Send Enquiry"}</button>
      </div>
      {status && <p className={`form-status ${status.error ? "error" : ""}`} role={status.error ? "alert" : "status"}>{status.text}</p>}
      {!apiUrl && !status && <p className="form-status" role="status">Online enquiry submission is currently unavailable. You can still contact us by phone.</p>}
      <p className="field-error" aria-hidden="true"> </p>
      {content.contact.phone && <p className="body-copy" style={{ margin: "12px 0 0", fontSize: 14 }}>Call <a href={`tel:${content.contact.phone}`}>{content.contact.phone}</a> for assistance.</p>}
    </form>
  );
}
