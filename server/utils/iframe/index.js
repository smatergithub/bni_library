const isUrl = require("is-url");
const fetch = require("isomorphic-unfetch")
const load = require("cheerio").load;


const headers = require('./config/header').headers
const defaultInlineConfig = require('./config/config').defaultInlineConfig
const defaultCorsConfig = require('./config/config').defaultCorsConfig
const defaultConfig = require('./config/config').defaultConfig
const appCache = require('./cache').appCache
const configureCacheControl = require('./cache').configureCacheControl

let appSourceConfig = defaultConfig;
let WEBSITE_NOT_FOUND_TEMPLATE = `<div>
<h1>Error</h1>
<h2>Website not found, please check your url and try again.</h2>
<button onclick="window.history.back()">Go Back</button>
</div>
`;
let NO_URL_TEMPLATE = `<div>
<h1>Error</h1>
<h2>A valid URL is required, please set a url and try again.</h2>
<button onclick="window.history.back()">Go Back</button>
</div>
`;

// NOTE: control type like wappalyzer for usage only on websites that use specefic frameworks like old versions of react, angular, vue, and etc
const mutateSource = async ({ src = "", key }, url, $html) => {
  if (src && src[0] === "/") {
    try {
      const res = await fetch(`${url}/${src}`, {
        headers,
      });
      const source = await res.text();
      await $html(key).html(source);
    } catch (e) {
      console.error(e);
    }
  }
};

function renderErrorHtml({ url, server, noPage = false }) {
  return Object.assign(
    load(
      !url
        ? NO_URL_TEMPLATE
        : WEBSITE_NOT_FOUND_TEMPLATE
    ),
    server ? { status: Number(`${40}${!url || noPage ? 4 : 0}`) } : {}
  );
}

async function renderHtml(
  { url, baseHref, config },
  server = false
) {

  if (!isUrl(url)) {
    return renderErrorHtml({ url, server });
  }

  try {

    const cachedHtml = await appCache.get(url);
    if (cachedHtml) {
      return load(cachedHtml);
    }
  } catch (e) {
    console.error(e);
  }

  const { inline, cors } = {
    inline: {
      ...appSourceConfig.inline,
      ...config.inline,
    },
    cors: {
      ...appSourceConfig.cors,
      ...config.cors,
    },
  };

  try {
    const response = await fetch(url, {
      headers,
    });
    const html = await response.text();
    const $html = load(html);

    // BASE TARGET FOR RESOURCES
    if (!!baseHref) {
      await $html("head").prepend(`<base target="_self" href="${url}">`);
    }

    const inlineMutations = [];

    // GATHER INLINE ELEMENTS
    for await (const key of Object.keys(inline)) {
      if (inline[key]) {
        const attribute = "src";
        await $html(key).attr(attribute, function (_, src) {
          if (src) {
            inlineMutations.push({ key, attribute, src });
          }
          return src;
        });
      }
    }

    // MUTATE INLINE ELEMENTS
    for await (const com of inlineMutations) {
      const { key, attribute, src } = com;
      const element = `${key}[${attribute}="${src}"]`;
      await mutateSource({ key: element, src }, url, $html);
      await $html(element).removeAttr(attribute);
    }

    await $html(`[src="undefined"]`).removeAttr("src");

    // CORS ELEMENTS
    for await (const key of Object.keys(cors)) {
      if (cors[key]) {
        await $html(key).attr("crossorigin", cors[key]);
      }
    }

    appCache.set(url, $html.html());

    if (server) {
      $html.status = 200;
    }

    return $html;
  } catch (e) {
    console.error(e);
  }

  return renderErrorHtml({ url, server, noPage: true });
}

async function fetchFrame(model) {
  const $html = await renderHtml(model, typeof process !== "undefined");
  return $html.html();
}

function configureResourceControl(appConfig) {
  appSourceConfig = Object.assign({}, defaultConfig, {
    cors: {
      ...defaultCorsConfig,
      ...appConfig.cors,
    },
    inline: { ...defaultInlineConfig, ...appConfig.inline },
  });
}

function createIframe(req, res, next) {
  res.createIframe = async (model) => {
    const $html = await renderHtml(model, true);
    res.status($html.status || 200).send($html.html());
  };

  next();
}

module.exports = {
  appSourceConfig,
  configureResourceControl,
  configureCacheControl,
  fetchFrame,
  createIframe
};

