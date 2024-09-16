export interface IBooks {
  id: number;
  title: string;
  authors: Author[];
  translators: (Translator | Translators2)[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Formats;
  download_count: number;
}

interface Formats {
  'text/html': string;
  'application/epub+zip': string;
  'application/x-mobipocket-ebook': string;
  'application/rdf+xml': string;
  'image/jpeg': string;
  'text/plain; charset=us-ascii': string;
  'application/octet-stream': string;
  'text/html; charset=utf-8': string;
  'text/plain; charset=utf-8': string;
  'text/plain; charset=iso-8859-1': string;
  'application/pdf': string;
  'application/prs.tex': string;
  'text/html; charset=iso-8859-1': string;
}

interface Translators2 {
  name: string;
  birth_year: null;
  death_year: null;
}

interface Translator {
  name: string;
  birth_year: number;
  death_year: number;
}

interface Author {
  name: string;
  birth_year: null | number | number;
  death_year: null | number;
}
