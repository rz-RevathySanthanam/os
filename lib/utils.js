import React, { useEffect, useState } from 'react';
import Config from '@/config';
import Translations from '@/translationsV2.json';

export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export function useDelayedState(initValue, delay = 500, { instantFalse = true } = {}) {
  const [timerId, setTimerId] = useState(null);
  const [requestedState, setRequestedState] = useState(initValue);
  const [state, setState] = useState(initValue);

  const updateState = (newValue) => {
    if (requestedState !== newValue) {
      setRequestedState(newValue);
    }
  };

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    if (requestedState === state) return;
    if (instantFalse && requestedState === false) {
      setState(requestedState);
    } else {
      const newTimerId = setTimeout(() => {
        setState(requestedState);
      }, delay);
      setTimerId(newTimerId);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedState, delay]);

  return [state, updateState, requestedState];
}

export function translate(defaultValue, label) {
  const key = label || defaultValue;
  const newValue = Config.translation[key];
  if (newValue !== undefined) {
    return newValue;
  }

  return defaultValue;
}

export function fixMediaUrl(url) {
  if (
    Config.ReplaceMediaUrl
    && Config.ReplaceMediaUrl.length === 2
    && url && url.startsWith(Config.ReplaceMediaUrl[0])
  ) {
    let newUrl = url.substring(Config.ReplaceMediaUrl[0].length);
    newUrl = `${Config.ReplaceMediaUrl[1]}${newUrl}`;
    return newUrl;
  }

  return url;
}

export function valueFromPath(path, obj, defaultValue) {
  if (!obj) {
    return obj;
  }

  let childObj = obj;
  const parts = path.split('.');
  let part = parts.shift();
  while (part) {
    childObj = childObj[part];
    if (!childObj) {
      return defaultValue;
    }
    part = parts.shift();
  }

  if (childObj === undefined) {
    return defaultValue;
  }
  return childObj;
}

export function updateValueToPath(obj, path, value, createNew) {
  let childObj = obj ?? {};
  if (!obj && !createNew) {
    return obj;
  }

  let parent = obj ?? {};
  let parentPath = null;
  const parts = path.split('.');
  let part = parts.shift();
  while (part) {
    parent = childObj;
    parentPath = part;
    childObj = childObj[part];
    if (childObj === undefined) {
      if (!createNew) {
        return obj;
      }

      parent[part] = {};
      childObj = parent[part];
    }
    part = parts.shift();
  }

  if (childObj === undefined && !createNew) {
    return obj;
  }
  parent[parentPath] = value;
  return obj;
}

export const Utils = {
  mergePaths(items) {
    const skipPrefix = items[0].startsWith('http') || items[0].startsWith('/');
    let parts = skipPrefix ? [] : ['/'];
    let endedWithSlash = false;

    items.forEach((item) => {
      let part = item;

      if (part.startsWith('/')) {
        part = part.split('').splice(1).join('');
      }

      if (part.endsWith('/')) {
        endedWithSlash = true;
        part = part.split('').slice(0, -1).join('');
      } else {
        endedWithSlash = false;
      }

      parts.push(part);
    });

    if (endedWithSlash) {
      parts.push('/');
    }

    parts = parts.filter((x) => x.length > 0);
    return parts.join('/');
  },
};

export function checkEligibilityOfQuerySet(setCode) {
  const { rzSpecificQuerySets } = Config;
  let good = true;
  if (!rzSpecificQuerySets) {
    good = false;
  }
  if (!rzSpecificQuerySets || !rzSpecificQuerySets[setCode]) {
    good = false;
  }
  return good;
}

export const InputMask = '-';

export function replaceMask(value) {
  if (value === InputMask) {
    return '';
  }

  return value;
}

export function applyMask(value) {
  return value || InputMask;
}

export function applySSNMask(value) {
  return value.trim().replace('-', '').replace(' ', '');
}

export const daysContext = (min, max) => {
  const minV = parseInt(min, 10);
  const maxV = parseInt(max, 10);
  if ((Number.isNaN(minV) || Number.isNaN(maxV))) {
    return '-'; // This case won't come i guess.
  }
  return (
    <>
      {minV === 0 && maxV === 0 && (
        <span className="sameday">samdægurs</span>
      )}
      {((minV !== 0 || maxV !== 0) && (
        <span>
          <strong>
            {minV}

            {minV !== maxV
              && (
              <span>
                -
                {maxV}
              </span>
              )}
            {(minV > 1 || maxV > 1) ? ' virkir dagar' : ' virkur dagur'}
          </strong>
        </span>
      ))}
    </>
  );
};

export function translateV2(key, fallbackText) {
  const translations = Translations;
  const newValue = valueFromPath(key, translations);

  return newValue || fallbackText || key;
}

export function convertStringToTranslationKey(key) {
  return key.toUpperCase().replace(/ /g, '_');
}
export const hideComponentView = (router, hideOnRoutes) => {
  let good = false;
  if (router) {
    const pages = hideOnRoutes;
    const onSatisfies = router.asPath.split('/').some((item) => pages && pages.includes(item));
    if (onSatisfies) {
      good = true;
    }
  }
  return good;
};
