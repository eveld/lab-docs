// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import mermaid from 'astro-mermaid';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginCodeOutput } from '@fujocoded/expressive-code-output';

// https://astro.build/config
export default defineConfig({
	site: 'http://erikveld.com',
	base: '/lab-docs',
	integrations: [
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
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'Overview', slug: 'introduction/overview' },
					],
				},
				{
					label: 'Getting Started',
					items: [
						{ label: 'Overview', slug: 'getting-started/overview' },
						{ label: '1. Project Setup', slug: 'getting-started/project-setup' },
						{ label: '2. Infrastructure', slug: 'getting-started/infrastructure' },
						{ label: '3. Content & Tasks', slug: 'getting-started/content-tasks' },
						{ label: '4. Testing & Deployment', slug: 'getting-started/testing-deployment' },
					],
				},
				{
					label: 'Lab Configuration',
					items: [
						{ label: 'Lab Structure', slug: 'configuration/lab-structure' },
						{ label: 'Sandbox Resources', slug: 'configuration/sandbox' },
						{ label: 'Content Organization', slug: 'configuration/content' },
					],
				},
				{
					label: 'Development Guide',
					items: [
						{ label: 'Creating Labs', slug: 'development/creating-labs' },
						{ label: 'Interactive Tasks', slug: 'development/tasks' },
						{ label: 'Testing & Validation', slug: 'development/testing' },
					],
				},
				{
					label: 'Migration Tools',
					items: [
						{ label: 'Legacy to HCL Migration', slug: 'migration/overview' },
						{ label: 'Migration Toolkit', slug: 'migration/toolkit' },
					],
				},
				{
					label: 'Configuration Reference',
					autogenerate: { directory: 'api' },
				},
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
