import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

const config: Config = {
  title: 'jest-preset-angular',
  tagline: 'Jest preset configuration for Angular projects.',
  url: 'https://thymikee.github.io',
  baseUrl: '/jest-preset-angular/',
  baseUrlIssueBanner: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'thymikee',
  projectName: 'jest-preset-angular',
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/logo.svg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: `/jest-preset-angular/manifest.json`,
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'img/logo.svg',
            color: 'rgb(62, 204, 94)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'img/logo.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: 'https://github.com/thymikee/jest-preset-angular/edit/main/website',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
            require('docusaurus-remark-plugin-tab-blocks'),
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    algolia: {
      appId: '2L8AIIEZVK',
      apiKey: '3b46e8c83d66424bede0e97b3de3bc11',
      indexName: 'jest-preset-angular',
      contextualSearch: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'supportus',
      content:
        '⭐️ If you like jest-preset-angular, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/thymikee/jest-preset-angular">GitHub</a>! ⭐️',
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
    navbar: {
      hideOnScroll: true,
      title: 'jest-preset-angular',
      logo: {
        alt: 'jest-preset-angular logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // right
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          href: 'https://github.com/thymikee/jest-preset-angular',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: 'docs/',
            },
            {
              label: 'Installation',
              to: 'docs/getting-started/installation',
            },
            {
              label: 'Angular Ivy',
              to: 'docs/guides/angular-ivy',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Jest',
              href: 'https://stackoverflow.com/questions/tagged/jest',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/j6FKKQQrW9',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/thymikee/jest-preset-angular/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} jest-preset-angular. Built with Docusaurus.`,
    },
  },
};

export default config;
