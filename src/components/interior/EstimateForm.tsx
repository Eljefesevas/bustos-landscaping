"use client";
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { services } from '@/lib/data';

const EMAIL = 'bustoslandscaping@gmail.com';
type Fields = { name: string; method: string; phone: string; email: string; service: string; city: string; details: string };
const empty: Fields = { name: '', method: 'Phone call', phone: '', email: '', service: '', city: '', details: '' };

/*
  No form backend exists in this project, so the form does not pretend to submit.
  It composes an email in the visitor's own mail app, addressed to the business,
  with their answers filled in. Nothing is sent until they press send there.
*/
export default function EstimateForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [composed, setComposed] = useState(false);
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(v => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = 'Please add your name so we know who to ask for.';
    const wantsEmail = f.method === 'Email';
    if (wantsEmail && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please add an email address we can reply to.';
    if (!wantsEmail && f.phone.replace(/\D/g, '').length < 10) e.phone = 'Please add a phone number with area code.';
    if (!f.details.trim()) e.details = 'A sentence or two about the project is enough.';
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`est-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const subject = `Estimate request${f.service ? `: ${f.service}` : ''}${f.city ? ` (${f.city})` : ''}`;
    const facts = [
      `Name: ${f.name}`,
      `Best way to reach me: ${f.method}`,
      f.phone && `Phone: ${f.phone}`,
      f.email && `Email: ${f.email}`,
      f.service && `Service: ${f.service}`,
      f.city && `City: ${f.city}`,
    ].filter(Boolean);
    const body = [...facts, '', 'About the project:', f.details].join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setComposed(true);
  };

  const err = (k: keyof Fields) => errors[k] ? { 'aria-invalid': true, 'aria-describedby': `est-${k}-error` } : {};

  return (
    <form className="ip-form" onSubmit={submit} noValidate aria-describedby="est-how">
      <p id="est-how" className="ip-form-how">
        This opens a pre-filled email to <strong>{EMAIL}</strong> in your email app, so you can review it and press send. Prefer to talk? Call or text instead.
      </p>

      <div className="ip-field">
        <label htmlFor="est-name">Your name</label>
        <input id="est-name" name="name" autoComplete="name" value={f.name} onChange={set('name')} {...err('name')} />
        {errors.name && <p className="ip-error" id="est-name-error">{errors.name}</p>}
      </div>

      <fieldset className="ip-field ip-choice">
        <legend>Best way to reach you</legend>
        {['Phone call', 'Text message', 'Email'].map(m => (
          <label key={m}><input type="radio" name="method" value={m} checked={f.method === m} onChange={set('method')} /> {m}</label>
        ))}
      </fieldset>

      <div className="ip-field-row">
        <div className="ip-field">
          <label htmlFor="est-phone">Phone {f.method === 'Email' && <span className="ip-optional">(optional)</span>}</label>
          <input id="est-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} {...err('phone')} />
          {errors.phone && <p className="ip-error" id="est-phone-error">{errors.phone}</p>}
        </div>
        <div className="ip-field">
          <label htmlFor="est-email">Email {f.method !== 'Email' && <span className="ip-optional">(optional)</span>}</label>
          <input id="est-email" name="email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set('email')} {...err('email')} />
          {errors.email && <p className="ip-error" id="est-email-error">{errors.email}</p>}
        </div>
      </div>

      <div className="ip-field-row">
        <div className="ip-field">
          <label htmlFor="est-service">Type of work <span className="ip-optional">(optional)</span></label>
          <select id="est-service" name="service" value={f.service} onChange={set('service')}>
            <option value="">Not sure yet</option>
            {services.map(s => <option key={s.title}>{s.title}</option>)}
          </select>
        </div>
        <div className="ip-field">
          <label htmlFor="est-city">City <span className="ip-optional">(optional)</span></label>
          <input id="est-city" name="city" autoComplete="address-level2" value={f.city} onChange={set('city')} />
        </div>
      </div>

      <div className="ip-field">
        <label htmlFor="est-details">About the project</label>
        <textarea id="est-details" name="details" rows={5} value={f.details} onChange={set('details')} placeholder="What would you like done, and roughly how big is the area?" {...err('details')} />
        {errors.details && <p className="ip-error" id="est-details-error">{errors.details}</p>}
      </div>

      <button className="button" type="submit"><Mail size={18} aria-hidden="true" /> Write the email</button>
      <p className="ip-form-after" role="status">
        {composed && <>Your email app should now be open with your request filled in. Press send there to reach us. If nothing opened, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> directly.</>}
      </p>
    </form>
  );
}
