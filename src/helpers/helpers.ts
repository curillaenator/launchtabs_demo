// Проверка линка с картинкой на работоспособсноть

export interface CheckImageURL {
  ok: boolean;
  status: string | number;
  url: string;
  type?: 'opaque' | 'cors';
}

const DEFAULT_OPTIONS: RequestInit = {
  method: 'GET',
  headers: new Headers(),
  credentials: 'omit', // omit, same-origin или include
  mode: 'cors', // mode: 'cors' | 'same-origin' | 'no-cors'
};

const OPTIONS: Record<string, RequestInit> = {
  'https://cdn.worldvectorlogo.com': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://vectorwiki.com': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://brandeps.com': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://logowiki.net': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://www.logo.wine': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://gitlab.svg.zone': {
    headers: {
      'Access-Control-Allow-Origin': 'https://cdn.worldvectorlogo.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://raw.githubusercontent.com': {
    headers: {
      'Access-Control-Allow-Origin': 'https://raw.githubusercontent.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },

  'https://www.vectorlogo.zone': {
    headers: {
      'Access-Control-Allow-Origin': 'https://raw.githubusercontent.com',
      'Content-Type': 'image/svg+xml',
    },
    mode: 'no-cors',
  },
};

const getFetchOptions = (url: string) => {
  let domain = '';

  const dotComIndex = url.search(/.com/) + 4;
  const dotNetIndex = url.search(/.net/) + 4;
  const dotWineIndex = url.search(/.wine/) + 5;
  const dotZoneIndex = url.search(/.zone/) + 5;

  if (dotComIndex > 'https://'.length + '.com'.length) {
    domain = url.slice(0, dotComIndex);
  } else if (dotNetIndex > 'https://'.length + '.net'.length) {
    domain = url.slice(0, dotNetIndex);
  } else if (dotWineIndex > 'https://'.length + '.wine'.length) {
    domain = url.slice(0, dotWineIndex);
  } else if (dotZoneIndex > 'https://'.length + '.zone'.length) {
    domain = url.slice(0, dotZoneIndex);
  }

  return { ...DEFAULT_OPTIONS, ...(OPTIONS[domain] || {}) };
};

const EXEPTIONS: string[] = [];

export const checkImageURL = async (url: string): Promise<CheckImageURL> => {
  if (EXEPTIONS.some((exeption) => url.includes(exeption))) {
    return { url, ok: false, status: 'bad' };
  }

  const check = await fetch(url, getFetchOptions(url))
    .then((res) => {
      if (res.type === 'opaque') {
        return { ok: true, status: 200 };
      }

      return { ok: res.ok, status: res.status };
    })
    .catch((err) => {
      console.error(err);

      return { ok: false, status: 'bad' };
    });

  return { url, ...check };
};
