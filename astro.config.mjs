// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginCodeOutput } from '@fujocoded/expressive-code-output';
import starlightAutoSidebar from 'starlight-auto-sidebar';

// https://astro.build/config
export default defineConfig({
	site: 'http://erikveld.com',
	base: '/lab-docs',
	integrations: [
		starlightAutoSidebar(),
		starlight({
			title: 'Instruqt Lab Documentation',
			logo: {
				src: './src/assets/instruqt-logo-white.png',
				replacesTitle: true,
			},
			description: 'Complete guide to creating and managing Instruqt labs',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/eveld/lab-docs' }
			],
			customCss: [
				// Optional: Add custom CSS for Instruqt branding
				'./src/styles/custom.css',
			],
			expressiveCode: {
				plugins: [pluginLineNumbers(), pluginCollapsibleSections(), pluginCodeOutput()],
				themes: ['starlight-dark', 'starlight-light'],
				defaultProps: {
					showLineNumbers: true,
				},
				styleOverrides: {
					borderRadius: '0.5rem',
				}
			},
		}),
		mdx(),
		mermaid(),
	],
});
