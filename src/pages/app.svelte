<script>
  import {
    resolveLanguages,
    buildPrism,
    buildPluginUrl,
  } from '../../scripts/plugin.mjs';
  import meta from './meta.json';

  let theme = '';
  let languages = {};
  const pluginSelection = meta.defaultPlugins.reduce((prev, item) => {
    prev[item] = true;
    return prev;
  }, {});
  languageDefault();
  let userAliases = JSON.stringify(meta.userAliases);
  $: selectedLanguages = Object.keys(languages).filter((key) => languages[key]);
  $: dependentLanguages = resolveLanguages(
    selectedLanguages,
    meta.dependencies
  ).filter((lang) => !languages[lang]);
  const cache = {};
  let downloaded = {};
  let loading = false;
  let dataUrl;
  let error;

  function checkLang(lang, checked) {
    languages[lang] = checked;
  }

  function languageDefault() {
    languages = meta.defaultLanguages.reduce((r, k) => {
      r[k] = true;
      return r;
    }, {});
  }

  function languageReset() {
    languages = {};
  }

  function languageAll() {
    languages = meta.allLanguages.reduce((r, k) => {
      r[k] = true;
      return r;
    }, {});
  }

  async function requestFile(url) {
    for (let i = 0; i < 3; i += 1) {
      try {
        const res = await fetch(url);
        const text = await res.text();
        return text;
      } catch {
        // noop
      }
    }
    throw new Error('Download failed: ' + url);
  }

  function memoizeRequest(fn, resolver) {
    return (path) => {
      const key = resolver ? resolver(path) : path;
      let cached = cache[key];
      if (!cached) {
        cached = fn(path).then(
          (res) => {
            downloaded[key] = true;
            downloaded = downloaded;
            return res;
          },
          (err) => {
            delete cache[key];
            throw err;
          }
        );
      }
      return cached;
    };
  }

  function isThemeDownloaded(theme) {
    return downloaded[`themes/prism${theme ? '-' + theme : ''}.min.css`];
  }

  function isLanguageDownloaded(lang) {
    return downloaded[`components/prism-${lang}.min.js`];
  }

  function isPluginDownloaded(plugin) {
    const baseName = `plugins/${plugin.name}/prism-${plugin.name}`;
    return [
      downloaded[`${baseName}.min.js`],
      !plugin.css || downloaded[`${baseName}.min.css`],
    ].every(Boolean);
  }

  const loadPrismFile = memoizeRequest(
    (file) =>
      requestFile(
        `https://cdn.jsdelivr.net/npm/prismjs@${meta.prismVersion}/${file}`
      )
  );

  async function handleGenerate() {
    if (loading) return;
    loading = true;
    try {
      const languages = resolveLanguages(selectedLanguages, meta.dependencies);
      const plugins = meta.allPlugins.filter(plugin => pluginSelection[plugin.name]);
      const data = {
        prefix: meta.prefix,
        languages,
        plugins,
        theme,
        minified: true,
        userAliases: JSON.parse(userAliases),
        loadPrismFile,
      };
      const prismTiddlers = await buildPrism(data);
      const { pluginInfo, tiddlers } = meta;
      dataUrl = buildPluginUrl({ pluginInfo, tiddlers, prismTiddlers });
      error = null;
    } catch (err) {
      error = `Failed generating plugin: ${err}`;
    }
    loading = false;
  }
</script>

<div class="max-w-screen-lg mx-auto">
  <header class="text-center">
    <h1>Customize PrismJS for TiddlyWiki</h1>
    <p class="text-gray-400">Pick what you like and build your own plugin</p>
    <p>
      <img
        class="ml-1"
        src="https://img.shields.io/github/package-json/v/gera2ld/tw-prism"
        alt="version"
      />
      <img
        class="ml-1"
        src={`https://img.shields.io/badge/PrismJS-${meta.prismVersion}-brightgreen`}
        alt="prismVersion"
      />
      <a class="ml-1" href="https://github.com/gera2ld/tw-prism">
        <img
          src="https://img.shields.io/github/stars/gera2ld/tw-prism?style=social"
          alt="tw-prism"
        />
      </a>
      <a class="ml-1" href="https://gera2ld.github.io/tw-prism/">See Demo</a>
    </p>
  </header>

  <section>
    <h2>Theme</h2>
    <select bind:value={theme}>
      {#each meta.themes as t}
        <option value={t}>{t || 'default'}</option>
      {/each}
    </select>
    {#if downloaded && isThemeDownloaded(theme)}
      ✅
    {/if}
  </section>

  <section>
    <h2>Languages</h2>
    <div class="mb-2">
      <button on:click={languageReset}>Reset</button>
      <button on:click={languageAll}>All</button>
      <button on:click={languageDefault}>Default</button>
      <span class="ml-2 text-gray-400">
        {selectedLanguages.length} languages selected{#if dependentLanguages.length}
          , <span class="cursor-pointer text-green-600" title={dependentLanguages.join(', ')}
            >{dependentLanguages.length} more</span
          > will be included as dependencies
        {/if}
      </span>
    </div>
    <div
      class="flex flex-wrap overflow-auto p-2 border border-gray-300 max-h-[50vh]"
    >
      {#each meta.allLanguages as lang}
        <label>
          <input
            type="checkbox"
            bind:checked={languages[lang]}
            onChange={(e) => checkLang(lang, e.target.checked)}
          />
          {lang}
          {#if meta.aliases[lang]}
            <span class="text-gray-400 text-sm"
              >({meta.aliases[lang].join(', ')})</span
            >
          {/if}
          {#if downloaded && isLanguageDownloaded(lang)}
            ✅
          {/if}
        </label>
      {/each}
    </div>
  </section>

  <section>
    <h2>Plugins</h2>
    <div
      class="flex flex-wrap overflow-auto p-2 border border-gray-300"
    >
      {#each meta.allPlugins as plugin}
        <label>
          <input
            type="checkbox"
            bind:checked={pluginSelection[plugin.name]}
          />
          {plugin.name}
          {#if downloaded && isPluginDownloaded(plugin)}
            ✅
          {/if}
        </label>
      {/each}
    </div>
  </section>

  <section>
    <h2>Aliases</h2>
    <p class="text-gray-400">
      You can add additional aliases here in JSON format where the key is the
      target language and value is a list of desired aliases.
    </p>
    <textarea bind:value={userAliases} />
  </section>

  <section class="text-center my-4 flex items-center">
    <button
      class={`bg-green-300 text-xl ${
        loading ? 'cursor-not-allowed opacity-60' : ''
      }`}
      on:click={handleGenerate}>Generate plugin</button
    >
    <div
      class="flex-1 h-24 ml-4 bg-gray-100 flex flex-col justify-center text-gray-400"
    >
      {#if error}
        <p class="text-red-500">{error}</p>
      {:else if dataUrl}
        <p>Success! Drag the plugin to your TiddlyWiki page and install it.</p>
        <p><a href={dataUrl}>{meta.prefix}</a></p>
      {:else}
        <p>Your plugin will be generated here.</p>
      {/if}
    </div>
  </section>
</div>
