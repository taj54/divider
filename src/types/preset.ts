import type { DividerOptions } from '@/types';

export type EmailDividerOptions = Pick<DividerOptions, 'trim'> & {
  /** Split top-level domain from the rest of the email address. */
  splitTLD?: boolean;
};

export type CsvDividerOptions = Pick<DividerOptions, 'trim'> & {
  /** Character used for quoting values. */
  quoteChar?: string;
  /** Character used to separate CSV fields. */
  delimiter?: string;
};

export type PathDividerOptions = Pick<DividerOptions, 'trim'> & {
  /** Collapse empty segments produced by leading/trailing or repeated separators. */
  collapse?: boolean;
};
