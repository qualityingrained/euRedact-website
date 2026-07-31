/*
  The detection-coverage catalogue.

  Deliberately carries no accuracy figures — no recall, precision or F1, and no
  wording that implies a level ("catches every", "guarantees"). This page
  answers *what is covered*; /benchmarks answers how well, under stated
  conditions. Mixing the two is how a coverage list turns into a claim.

  `name` values are the literal strings the API emits. They are rendered as
  code and never prettified, because a reader is matching them against output.

  Counts here (pattern totals, per-type country coverage) are checked against
  the installed engine by tests/claims.test.mjs.
*/

/** Which layer carries the detection work for a type. */
export type Layer = "Rules only" | "Rules led" | "AI led" | "AI only";

/** Sensitivity tier, which drives default redaction policy. */
export type Tier = "Critical" | "High" | "Medium" | "Low";

export type Group =
  | "Government and identity"
  | "Health"
  | "Financial"
  | "Contact details"
  | "People, organisations and roles"
  | "Location"
  | "Devices and networks"
  | "Vehicles"
  | "Credentials and secrets"
  | "Dates"
  | "Organisational identifiers";

export interface PiiType {
  name: string;
  tier: Tier;
  layer: Layer;
  group: Group;
  /** Short qualifier under the heading, e.g. "31 countries". */
  scope?: string;
  countrySpecific: boolean;
  checksum: boolean;
  /** GDPR Article 9 special-category data. */
  article9?: boolean;
  /** What the type covers. Rendered as the lead paragraph. */
  covers: string;
  /** Boundary against adjacent types — where most integration confusion sits. */
  notCovered?: string;
  /** How the two layers divide the work, or a precedence rule. */
  note?: string;
}

export const LAYER_MEANING: Record<Layer, string> = {
  "Rules only":
    "Structure is fully specified. The Rules Engine layer is the detector; the AI layer adds little.",
  "Rules led":
    "Rules cover the standard formats; the AI layer adds obfuscated, truncated and prose-embedded cases.",
  "AI led":
    "Rules provide partial coverage but over- or under-fire without context; the AI layer's disambiguation is the actual value.",
  "AI only":
    "No reliable pattern exists. The AI layer is the only line of defence.",
};

export const TIER_MEANING: Record<Tier, string> = {
  Critical:
    "GDPR Article 9 special-category data and classic hard identifiers. Always redact.",
  High: "Direct personal identifiers. Strong default-redact.",
  Medium:
    "Quasi-identifiers and structured contextual data. Redact in identifying contexts.",
  Low: "Broad, context-dependent categories. Redact when they meaningfully strengthen re-identification.",
};

export const TYPES: PiiType[] = [
  // ── Government and identity ──────────────────────────────────────────────
  {
    name: "NATIONAL_ID",
    tier: "Critical",
    layer: "Rules led",
    group: "Government and identity",
    scope: "31 countries",
    countrySpecific: true,
    checksum: true,
    covers:
      "A government-issued personal identification number assigned to a specific natural person by a national authority and used as a primary identity reference. Covers the Belgian Rijksregisternummer, Dutch BSN, French NIR, Spanish DNI and NIE, Polish PESEL, Swedish personnummer, Danish CPR, Norwegian fødselsnummer, Finnish HETU, Icelandic kennitala, Estonian isikukood, Latvian personas kods, Lithuanian asmens kodas, Bulgarian ЕГН, Romanian CNP, Greek AMKA, Slovenian EMŠO, Hungarian személyi szám, Czech and Slovak rodné číslo, Maltese and Cypriot ID card numbers, and the Luxembourg matricule — among others. Historic formats count alongside current ones. Most carry a checksum, and the engine validates it rather than trusting shape alone.",
    notCovered:
      "Purely fiscal identifiers (TAX_ID), health-fund numbers (HEALTH_INSURANCE), separate social-security numbers (SSN), passport, driving licence or residence-permit numbers, VAT numbers, company registration numbers, or internal customer and employee references (INTERNAL_ID).",
    note: "Where a country's national ID doubles as its tax identifier — the Italian Codice Fiscale, Croatian OIB, Portuguese NIF, Spanish DNI in fiscal use — the broader identity role wins. Where an identifier encodes a birth date (BSN, CPR, PESEL, fødselsnummer), the whole value is one NATIONAL_ID; the embedded date is not additionally reported as a date of birth.",
  },
  {
    name: "PASSPORT",
    tier: "Critical",
    layer: "AI led",
    group: "Government and identity",
    scope: "4 countries with patterns",
    countrySpecific: true,
    checksum: false,
    covers:
      "The document number printed on a passport or equivalent international travel document, including diplomatic, service and emergency travel documents. Identifies the physical document and, through it, the holder.",
    notCovered:
      "The holder's national ID, visa or residence-permit numbers, or the machine-readable-zone content as a whole.",
    note: "Passport numbering is not standardised across issuers and carries no general checksum, so the Rules Engine layer holds context-gated patterns for a small number of jurisdictions only and the AI layer carries the rest.",
  },
  {
    name: "TAX_ID",
    tier: "Critical",
    layer: "Rules led",
    group: "Government and identity",
    scope: "5 countries with patterns",
    countrySpecific: true,
    checksum: true,
    covers:
      "A government-issued personal or entity identifier used by a tax authority to track fiscal obligations, where it is distinct from the general-purpose national ID. Validated formats include the German Steuer-ID, the Greek ΑΦΜ and the Polish NIP.",
    notCovered:
      "VAT registration numbers (VAT), company registration numbers (CHAMBER_OF_COMMERCE), national IDs that merely happen to be used fiscally (NATIONAL_ID), or customs and duty references.",
  },
  {
    name: "SSN",
    tier: "Critical",
    layer: "Rules led",
    group: "Government and identity",
    scope: "1 country with patterns",
    countrySpecific: true,
    checksum: false,
    covers:
      "A social-security identifier granting access to state social-insurance programmes — pension, unemployment, disability, parental leave, in some countries health — in jurisdictions that issue a separate social-security number rather than using the national ID for the purpose. The Irish PPSN and the German Sozialversicherungsnummer are the reference cases; US-format SSNs are also recognised.",
    notCovered:
      "National IDs that serve a social-security function (NATIONAL_ID), tax-only identifiers (TAX_ID), or health-insurance member numbers (HEALTH_INSURANCE).",
  },
  {
    name: "DRIVERS_LICENSE",
    tier: "Critical",
    layer: "Rules led",
    group: "Government and identity",
    scope: "1 country with patterns",
    countrySpecific: true,
    checksum: false,
    covers:
      "The identifier on a driving licence document — national, EU-format or international.",
    notCovered:
      "The vehicle's registration plate (LICENSE_PLATE), the holder's national ID, or insurance and traffic-fine references.",
  },
  {
    name: "RESIDENCE_PERMIT",
    tier: "Critical",
    layer: "AI only",
    group: "Government and identity",
    countrySpecific: true,
    checksum: false,
    covers:
      "A document number issued by a host country granting a non-citizen the right to enter, stay, work or study for a defined period or status. Covers residence cards, work permits, long- and short-stay visas, and asylum-seeker and refugee documentation.",
    note: "Where a foreigner-identity number functions as a general identity reference in the document it is classed NATIONAL_ID; where the document explicitly concerns the residence-permit document itself, RESIDENCE_PERMIT applies.",
  },

  // ── Health ───────────────────────────────────────────────────────────────
  {
    name: "HEALTH_INSURANCE",
    tier: "Critical",
    layer: "Rules led",
    group: "Health",
    scope: "2 countries with patterns",
    countrySpecific: true,
    checksum: true,
    covers:
      "A government or private health-fund identifier assigned to an insured person for the administration of medical coverage: health-fund member numbers, mutuality, Krankenkasse and mutuelle IDs, and health-insurance card numbers. The UK NHS number is checksum-validated.",
    notCovered:
      "The holder's national ID or social-security number, or a hospital-internal patient record number (INTERNAL_ID).",
    note: "This type is the number, never the name of the insurer. An insurer's name is an organisation name.",
  },
  {
    name: "HEALTHCARE_PROVIDER",
    tier: "Medium",
    layer: "AI led",
    group: "Health",
    scope: "1 country with patterns",
    countrySpecific: true,
    checksum: false,
    covers:
      "A registration identifier issued to a healthcare provider — physician, nurse, pharmacist, dentist, allied health professional, clinic or hospital — for billing, prescribing, registration or regulatory purposes. Reference cases are the Belgian RIZIV/INAMI number, the Dutch BIG number and the German LANR.",
    note: "Scoped to the identifier code. A practitioner's name is a person name; a clinic's name is an organisation name.",
  },
  {
    name: "MEDICAL_CONDITION",
    tier: "Critical",
    layer: "AI only",
    group: "Health",
    countrySpecific: false,
    checksum: false,
    article9: true,
    covers:
      "Information disclosing a person's health status, diagnosis, treatment or healthcare interaction in a way that re-identifies them or attaches a sensitive medical attribute to them. Covers physical and mental health diagnoses, symptoms in clinical context, ICD-10 codes, lab values, medications and procedures where condition-revealing, disabilities, reproductive and sexual health, substance-use disorders, and genetic information. Sick leave and maternity leave fall here.",
    note: "GDPR Article 9 special-category data, requiring an additional lawful basis for processing.",
  },
  {
    name: "BIOMETRIC_REF",
    tier: "Critical",
    layer: "AI only",
    group: "Health",
    countrySpecific: false,
    checksum: false,
    article9: true,
    covers:
      "Information identifying a person through physiological, biological or behavioural characteristics, or persistent references to such characteristics: photo IDs, fingerprint, iris, face, voice and DNA template references.",
    notCovered:
      "An access badge or keycard number on its own, which is an INTERNAL_ID — the number is not itself a biometric.",
    note: "GDPR Article 9 when used to uniquely identify a person.",
  },
  {
    name: "SENSITIVE_ATTRIBUTE",
    tier: "Critical",
    layer: "AI only",
    group: "Health",
    countrySpecific: false,
    checksum: false,
    article9: true,
    covers:
      "A person's nationality or citizenship, racial or ethnic origin, religious or philosophical beliefs, political opinions, sexual orientation or sex life, or trade-union membership — and vulnerability or status disclosures carrying an Article 9 dimension, such as being a welfare recipient or asylum seeker.",
    note: "GDPR Article 9 special-category data.",
  },

  // ── Financial ────────────────────────────────────────────────────────────
  {
    name: "BANK_ACCOUNT",
    tier: "High",
    layer: "Rules only",
    group: "Financial",
    scope: "31 countries + shared tier",
    countrySpecific: true,
    checksum: true,
    covers:
      "A bank account identifier used to route payments to or from a specific account holder: IBAN (ISO 13616, mod-97 validated), pre-IBAN domestic account numbers, and foreign equivalents.",
    note: "IBANs are detected both by a generic international pattern and by country-specific ones, so a cross-border IBAN is recognised in a document from another jurisdiction.",
  },
  {
    name: "BIC",
    tier: "High",
    layer: "Rules only",
    group: "Financial",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "A Bank Identifier Code (ISO 9362), also labelled “SWIFT code” or “BIC/SWIFT”: four letters for the institution, an ISO-3166 country code, two location characters and an optional three-character branch code. Both the compact and space-separated written forms are recognised.",
    note: "A BIC has no check digit, and its shape — eight or eleven upper-case alphanumerics — collides with ordinary capitalised words in many European languages. Detection therefore requires registry confirmation or explicit banking context, never shape alone. It identifies the financial institution rather than the account holder, but pairs with BANK_ACCOUNT to enable routing.",
  },
  {
    name: "CREDIT_CARD",
    tier: "High",
    layer: "AI led",
    group: "Financial",
    scope: "shared tier",
    countrySpecific: false,
    checksum: true,
    covers:
      "A payment card primary account number — credit, debit, prepaid or charge — from Visa, Mastercard, Amex, Diners, Discover, JCB, UnionPay, Maestro and other networks, together with tightly-coupled card data: CVV/CVC, magnetic-stripe content and card PIN.",
    note: "Luhn validation is what separates a card number from an invoice or order number of similar length; the AI layer resolves the remainder. Subject to PCI-DSS in addition to GDPR.",
  },
  {
    name: "VAT",
    tier: "Medium",
    layer: "Rules led",
    group: "Financial",
    scope: "30 countries",
    countrySpecific: true,
    checksum: true,
    covers:
      "A VAT registration number issued to a business or sole trader by a member state's tax authority. Publicly searchable in most jurisdictions, and validated by checksum for several including BE, DE, FR, LU, NL and DK.",
    notCovered:
      "Personal tax identifiers (TAX_ID, NATIONAL_ID) or company registration numbers (CHAMBER_OF_COMMERCE).",
  },
  {
    name: "FINANCIAL_AMOUNT",
    tier: "Low",
    layer: "AI only",
    group: "Financial",
    countrySpecific: false,
    checksum: false,
    covers:
      "A specific monetary amount in identifying context attached to a natural person: salary, compensation, settlement, account balance, debt, benefit or contract value.",
    notCovered: "Generic prices, market data or macroeconomic figures.",
  },

  // ── Contact details ──────────────────────────────────────────────────────
  {
    name: "EMAIL",
    tier: "High",
    layer: "Rules led",
    group: "Contact details",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "An RFC 5322 e-mail address functioning as a contact-channel identifier for an identified or identifiable person. Non-ASCII local parts, including Greek and Cyrillic, are supported.",
    note: "The Rules Engine layer covers standard formats; the AI layer adds display-name forms, deliberately obfuscated forms (“name [at] domain [dot] com”), plus-tagged addresses and internationalised domains.",
  },
  {
    name: "PHONE",
    tier: "High",
    layer: "Rules led",
    group: "Contact details",
    scope: "31 countries + shared tier",
    countrySpecific: true,
    checksum: false,
    covers:
      "A telephone, mobile or fax number allowing direct contact with a person, household or organisation. Detected by 98 national-format patterns — one set for every supported country, the largest single group in the engine — plus an E.164-validated international pattern in the shared tier.",
    note: "The AI layer adds short domestic formats without a country code, unusual separators and numbers embedded in prose.",
  },
  {
    name: "SOCIAL_HANDLE",
    tier: "Medium",
    layer: "AI led",
    group: "Contact details",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "A username, screen name or account identifier on a social platform, messaging service, online community or gaming network, when attached to an identifiable person. Both the canonical @handle form and the bare-word username form where context confirms it. Handles containing non-ASCII letters are supported.",
  },
  {
    name: "URL",
    tier: "High",
    layer: "AI only",
    group: "Contact details",
    countrySpecific: false,
    checksum: false,
    covers:
      "A web address that, in context, identifies a specific natural person, a named organisation mentioned elsewhere in the document, or an account, profile or project page tied to an identified party.",
    notCovered:
      "URLs carrying no identifying signal — framework documentation, standards bodies, CDN assets, general public-knowledge references.",
    note: "Whether a URL is personal data is a contextual judgement, which is why this type sits entirely with the AI layer.",
  },

  // ── People, organisations and roles ──────────────────────────────────────
  {
    name: "PERSON_NAME",
    tier: "High",
    layer: "AI only",
    group: "People, organisations and roles",
    countrySpecific: false,
    checksum: false,
    covers:
      "A natural person's name used to refer to a specific identified or identifiable individual: given names, surnames, full names, honorific-plus-name, initials with surname, compound and hyphenated surnames, non-Latin-script names, chosen and preferred names, and nicknames used as identifiers.",
    note: "At each occurrence the longest contiguous name span is reported as a single detection — honorific, given names, particles and surname together — rather than several adjacent fragments.",
  },
  {
    name: "ORGANISATION_NAME",
    tier: "Low",
    layer: "AI only",
    group: "People, organisations and roles",
    countrySpecific: false,
    checksum: false,
    covers:
      "The name of a company, institution, government body, non-profit or association where its presence is identifying, either of the organisation itself in a privacy-sensitive context or of a natural person through affiliation.",
    notCovered:
      "Brand-as-product references and generic categorical descriptions.",
  },
  {
    name: "JOB_TITLE",
    tier: "Low",
    layer: "AI only",
    group: "People, organisations and roles",
    countrySpecific: false,
    checksum: false,
    covers:
      "A professional, organisational or hierarchical role designation attached to an identifiable person. Identifying in combination with a name, an organisation or a department.",
    notCovered: "Department and team names on their own.",
  },
  {
    name: "QUASI_IDENTIFIER",
    tier: "Low",
    layer: "AI only",
    group: "People, organisations and roles",
    countrySpecific: false,
    checksum: false,
    covers:
      "A combination of attributes, none sufficient alone, that together narrow a description to one individual or a very small group — a role plus a location plus a timeframe, for example. The full combining phrase is reported.",
    note: "Attributes inside the phrase that have their own type are additionally reported as that type.",
  },

  // ── Location ─────────────────────────────────────────────────────────────
  {
    name: "ADDRESS",
    tier: "High",
    layer: "AI only",
    group: "Location",
    countrySpecific: false,
    checksum: false,
    covers:
      "A physical mailing or location address that locates an identifiable person or organisation: street name, house number, building name, apartment, unit and floor designations, PO boxes, and the city, postal code and country components where they form part of a complete address span.",
  },
  {
    name: "POSTAL_CODE",
    tier: "Medium",
    layer: "AI led",
    group: "Location",
    scope: "31 countries",
    countrySpecific: true,
    checksum: false,
    covers:
      "A country-specific postal code, functioning as a coarse geographic identifier when attached to a person or address.",
    note: "The Rules Engine layer holds postal patterns for every supported country, but most are short digit runs that require a nearby address cue to fire, and the formats collide with other numbers. The AI layer is the authority for this type. A postal code inside a full address span is part of that ADDRESS; one appearing outside an address span is reported as POSTAL_CODE.",
  },
  {
    name: "GPS_COORDINATES",
    tier: "Medium",
    layer: "Rules only",
    group: "Location",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "A geographic coordinate pair pinpointing a physical location associated with an identifiable person — home, workplace, vehicle position, or geo-located activity.",
    note: "Decimal degrees are detected by rule; the AI layer adds DMS notation, plus codes, geohashes, What3Words references and coordinates described in prose.",
  },

  // ── Devices and networks ─────────────────────────────────────────────────
  {
    name: "IP_ADDRESS",
    tier: "Medium",
    layer: "Rules only",
    group: "Devices and networks",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "An IPv4 address identifying a person as a network endpoint, session origin or device.",
  },
  {
    name: "IPV6_ADDRESS",
    tier: "Medium",
    layer: "Rules only",
    group: "Devices and networks",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "An IPv6 address (RFC 4291 / RFC 5952), in any standard notation including compressed forms. Reported separately from IPv4.",
  },
  {
    name: "MAC_ADDRESS",
    tier: "Medium",
    layer: "Rules only",
    group: "Devices and networks",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "A 48-bit IEEE 802 hardware address identifying a network interface. Colon-separated, dash-separated and Cisco dot notation are all recognised. Personal data when linked to a person through device-management records, access logs, DHCP leases or captive-portal logs.",
  },
  {
    name: "IMEI",
    tier: "Medium",
    layer: "Rules only",
    group: "Devices and networks",
    scope: "shared tier",
    countrySpecific: false,
    checksum: true,
    covers:
      "A 15-digit International Mobile Equipment Identity identifying a mobile device on a cellular network. Both the bare and separator-formatted forms are recognised. Persists across SIM changes, so it identifies the device rather than the subscriber.",
  },
  {
    name: "UUID",
    tier: "Medium",
    layer: "Rules only",
    group: "Devices and networks",
    scope: "shared tier",
    countrySpecific: false,
    checksum: false,
    covers:
      "An RFC 4122 / RFC 9562 universally unique identifier, with or without hyphens.",
    note: "Reported only where the UUID functions as a person- or session-level identifier. UUIDs in purely technical contexts — database keys, migration scripts, build artefacts — are not personal data.",
  },

  // ── Vehicles ─────────────────────────────────────────────────────────────
  {
    name: "LICENSE_PLATE",
    tier: "Medium",
    layer: "Rules led",
    group: "Vehicles",
    scope: "15 countries",
    countrySpecific: true,
    checksum: false,
    covers:
      "A vehicle registration plate issued by a national or sub-national authority, which identifies a vehicle and through registration records its owner.",
    notCovered:
      "The chassis identifier (VIN) or the operator's licence number (DRIVERS_LICENSE).",
    note: "Plate grammars differ sharply between countries, and several — the German pattern in particular — are validated against the issuing district codes rather than shape alone, because the generic shape collides with document references and standards codes.",
  },
  {
    name: "VIN",
    tier: "Medium",
    layer: "Rules only",
    group: "Vehicles",
    scope: "shared tier",
    countrySpecific: false,
    checksum: true,
    covers:
      "A 17-character ISO 3779 vehicle identification number assigned by the manufacturer, identifying the physical chassis regardless of the plate currently registered to it.",
  },

  // ── Credentials and secrets ──────────────────────────────────────────────
  {
    name: "SECRET",
    tier: "Medium",
    layer: "AI led",
    group: "Credentials and secrets",
    scope: "shared tier · 26 patterns",
    countrySpecific: false,
    checksum: false,
    covers:
      "A pattern-detectable secret or authentication artifact with a recognisable prefix or shape. The engine holds dedicated patterns for AWS access key IDs and secret access keys, GitHub tokens including fine-grained PATs, GitLab tokens and PATs, Stripe secret and publishable keys, OpenAI and Anthropic API keys, Slack tokens in several forms, JWTs, SendGrid keys, HashiCorp Vault tokens, Mailgun keys, Databricks PATs, npm tokens, Google API keys, DigitalOcean tokens, Twilio account SIDs, Discord bot tokens, PEM private keys, and connection strings with embedded credentials.",
    note: "Two further rules generalise beyond the named providers: an assigned-secret-value rule, and a high-entropy-token rule that fires near credential context keywords.",
  },
  {
    name: "CREDENTIAL",
    tier: "High",
    layer: "AI led",
    group: "Credentials and secrets",
    countrySpecific: false,
    checksum: false,
    covers:
      "A credential or authentication artifact disclosed in prose rather than as a recognisable token: passwords, spelled-out keys, connection strings described in sentences, recovery codes, security questions and answers, and system PINs.",
    note: "This is the unstructured counterpart to SECRET. Where SECRET is a shape the engine can match, CREDENTIAL is a sentence the model has to understand.",
  },

  // ── Dates ────────────────────────────────────────────────────────────────
  {
    name: "DOB",
    tier: "Critical",
    layer: "Rules led",
    group: "Dates",
    scope: "shared tier · context-gated",
    countrySpecific: false,
    checksum: false,
    covers:
      "An explicit calendar date stating when an identifiable person was born — typically the highest-value quasi-identifier in tabular data. Detected in DD/MM/YYYY and ISO YYYY-MM-DD forms, but only with a positive context cue: a date alone is never assumed to be a birth date.",
    note: "The AI layer covers birth dates stated in prose and in regional formats outside those two. Where a birth date is embedded in a national identifier, the identifier is reported whole and the embedded date is not separately reported.",
  },
  {
    name: "DATE_OF_DEATH",
    tier: "Critical",
    layer: "Rules led",
    group: "Dates",
    scope: "shared tier · context-gated",
    countrySpecific: false,
    checksum: false,
    covers:
      "An explicit calendar date stating when an identifiable person died, detected on the same mechanics as DOB and likewise requiring a positive cue — overlijdensdatum, Sterbedatum, date de décès and equivalents.",
    notCovered: "Funeral, memorial or probate dates.",
    note: "Sensitive both under member-state post-mortem privacy provisions and for living next-of-kin contexts such as insurance claims and estate administration.",
  },

  // ── Organisational identifiers ───────────────────────────────────────────
  {
    name: "CHAMBER_OF_COMMERCE",
    tier: "Medium",
    layer: "Rules led",
    group: "Organisational identifiers",
    scope: "10 countries",
    countrySpecific: true,
    checksum: true,
    covers:
      "A company or business registration number issued by a commerce registry, trade register or statistics authority — the Dutch KvK number, German HRB, Belgian BCE/KBO, Danish CVR, Finnish business ID and Norwegian organisasjonsnummer among them. Several are checksum-validated.",
    notCovered:
      "VAT registration (VAT) or personal taxpayer identification (TAX_ID).",
  },
  {
    name: "INTERNAL_ID",
    tier: "Medium",
    layer: "AI led",
    group: "Organisational identifiers",
    countrySpecific: false,
    checksum: false,
    covers:
      "An organisation-assigned identifier that identifies a specific person, account, customer, employee, case or record within that organisation's domain, and that fits no more specific type. Covers employee numbers, badge and keycard numbers, customer and account references, and claim, policy and report references tied to a claimant.",
    notCovered:
      "Purchase-order numbers, cost-centre codes and ticket numbers that are not tied to a person. These are not personal data and are not reported.",
    note: "This is the residual type — used only when nothing more specific applies.",
  },
];

/** Country rows for the Rules Engine coverage table. */
export interface CountryRow {
  code: string;
  name: string;
  vat: boolean;
  plate: boolean;
  register: boolean;
  taxId: boolean;
  passport: boolean;
  other?: string;
}

export const COUNTRIES: CountryRow[] = [
  { code: "AT", name: "Austria", vat: true, plate: true, register: false, taxId: false, passport: false },
  { code: "BE", name: "Belgium", vat: true, plate: true, register: true, taxId: false, passport: true, other: "Driving licence, healthcare provider" },
  { code: "BG", name: "Bulgaria", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "CH", name: "Switzerland", vat: true, plate: true, register: true, taxId: false, passport: false },
  { code: "CY", name: "Cyprus", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "CZ", name: "Czechia", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "DE", name: "Germany", vat: true, plate: true, register: true, taxId: true, passport: true, other: "Social security, health insurance" },
  { code: "DK", name: "Denmark", vat: true, plate: true, register: true, taxId: false, passport: false },
  { code: "EE", name: "Estonia", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "EL", name: "Greece", vat: true, plate: false, register: false, taxId: true, passport: false },
  { code: "ES", name: "Spain", vat: true, plate: true, register: false, taxId: false, passport: false },
  { code: "FI", name: "Finland", vat: true, plate: true, register: true, taxId: false, passport: false },
  { code: "FR", name: "France", vat: true, plate: true, register: true, taxId: true, passport: true },
  { code: "HR", name: "Croatia", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "HU", name: "Hungary", vat: true, plate: false, register: false, taxId: true, passport: false },
  { code: "IE", name: "Ireland", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "IS", name: "Iceland", vat: false, plate: true, register: false, taxId: false, passport: false },
  { code: "IT", name: "Italy", vat: true, plate: true, register: false, taxId: false, passport: false },
  { code: "LT", name: "Lithuania", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "LU", name: "Luxembourg", vat: true, plate: true, register: true, taxId: false, passport: false },
  { code: "LV", name: "Latvia", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "MT", name: "Malta", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "NL", name: "Netherlands", vat: true, plate: true, register: true, taxId: false, passport: true },
  { code: "NO", name: "Norway", vat: true, plate: true, register: true, taxId: false, passport: false },
  { code: "PL", name: "Poland", vat: true, plate: false, register: false, taxId: true, passport: false },
  { code: "PT", name: "Portugal", vat: true, plate: true, register: false, taxId: false, passport: false },
  { code: "RO", name: "Romania", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "SE", name: "Sweden", vat: true, plate: true, register: true, taxId: false, passport: false },
  { code: "SI", name: "Slovenia", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "SK", name: "Slovakia", vat: true, plate: false, register: false, taxId: false, passport: false },
  { code: "UK", name: "United Kingdom", vat: true, plate: false, register: false, taxId: false, passport: false, other: "NHS number" },
];

/** Cross-type precedence and interpretation rules. */
export const AMBIGUITY_RULES: { title: string; body: string }[] = [
  {
    title: "Broader role wins",
    body: "Where one value could carry two types, the broader identity role takes precedence — a national ID used fiscally stays a national ID.",
  },
  {
    title: "Residual last",
    body: "INTERNAL_ID is used only when no more specific type fits.",
  },
  {
    title: "Embedded in parent",
    body: "A value forming part of a larger annotated span is not also reported separately — a postal code inside a full address, a birth date inside a national ID.",
  },
  {
    title: "Maximal span for names",
    body: "The longest contiguous name at each occurrence is one detection, not several.",
  },
  {
    title: "Categories are not identifiers",
    body: "A class, label or category name is not personal data. “Customer segment: premium” identifies nobody.",
  },
  {
    title: "Test and placeholder data",
    body: "Obvious placeholder and documentation values are recognised as such.",
  },
  {
    title: "Public figures",
    body: "Public-figure references are handled by an explicit rule rather than treated identically to private individuals.",
  },
  {
    title: "Foreign jurisdictions",
    body: "Identifiers from outside the supported countries are recognised on their own terms where their format allows.",
  },
  {
    title: "Truncated and partial values",
    body: "Partial identifiers — a masked card number, the last four digits of an account — are treated as identifying where they remain re-identifying in context.",
  },
  {
    title: "Spelled-out forms",
    body: "A value written in words or phonetically counts as the underlying value.",
  },
  {
    title: "Pseudonymisation (Recital 26)",
    body: "Pseudonymous identifiers remain personal data where re-identification is reasonably possible.",
  },
];
