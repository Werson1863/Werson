// A kapcsolati űrlap közös típusai és szerveroldali validációja (a hibaszövegek a szövegkönyvből jönnek).
export type ContactField = 'name' | 'email' | 'company' | 'teamSize' | 'message' | 'consent';

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message: string;
  consent: boolean;
};

export type ContactState = {
  status: 'idle' | 'success' | 'invalid' | 'error';
  errors?: Partial<Record<ContactField, string>>;
  values?: ContactValues;
  message?: string;
  /** minden válasznál nő – az űrlap ennek alapján töltődik újra a beküldött értékekkel */
  ts?: number;
};

export type ContactErrors = Record<
  | 'nameRequired' | 'nameTooLong' | 'emailRequired' | 'emailInvalid' | 'companyTooLong'
  | 'teamSizeInvalid' | 'messageRequired' | 'messageTooShort' | 'messageTooLong' | 'consentRequired',
  string
>;

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function readValues(fd: FormData): ContactValues {
  const s = (k: string) => String(fd.get(k) ?? '').trim();
  return {
    name: s('name').replace(/\s+/g, ' '),
    email: s('email').toLowerCase(),
    company: s('company').replace(/\s+/g, ' '),
    teamSize: s('teamSize'),
    message: s('message').replace(/\r\n/g, '\n'),
    consent: fd.get('consent') === 'on',
  };
}

export function validate(v: ContactValues, e: ContactErrors, teamSizes: readonly string[]) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (!v.name) errors.name = e.nameRequired;
  else if (v.name.length > 100) errors.name = e.nameTooLong;
  if (!v.email) errors.email = e.emailRequired;
  else if (v.email.length > 254 || !EMAIL.test(v.email)) errors.email = e.emailInvalid;
  if (v.company.length > 120) errors.company = e.companyTooLong;
  if (v.teamSize && !teamSizes.includes(v.teamSize)) errors.teamSize = e.teamSizeInvalid;
  if (!v.message) errors.message = e.messageRequired;
  else if (v.message.length < 10) errors.message = e.messageTooShort;
  else if (v.message.length > 4000) errors.message = e.messageTooLong;
  if (!v.consent) errors.consent = e.consentRequired;
  return errors;
}
