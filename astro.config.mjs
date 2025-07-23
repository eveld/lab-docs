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
					label: 'Lab Development',
					items: [
						{ label: 'Creating Labs', slug: 'development/creating-labs' },
						{ label: 'Interactive Tasks', slug: 'development/tasks' },
						{ label: 'Testing & Validation', slug: 'development/testing' },
						{ label: 'Content Organization', slug: 'configuration/content' },
					],
				},
				{
					label: 'Configuration',
					collapsed: true,
					items: [
						{ label: 'Lab Structure', slug: 'configuration/lab-structure' },
						{ label: 'Sandbox Resources', slug: 'configuration/sandbox' },
					],
				},
				{
					label: 'Migration Tools',
					collapsed: true,
					items: [
						{ label: 'Legacy to HCL Migration', slug: 'migration/overview' },
						{ label: 'Migration Toolkit', slug: 'migration/toolkit' },
					],
				},
				{
					label: 'Reference',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: 'reference' },
						{
							label: 'Core Resources',
							collapsed: false,
							items: [
								{ label: 'Lab', slug: 'reference/resources/lab/lab' },
								{ label: 'Page', slug: 'reference/resources/page/page' },
								{ label: 'Layout', slug: 'reference/resources/layout/layout' },
								{ label: 'Task', slug: 'reference/resources/task/task' },
							],
						},
						{
							label: 'Sandbox Resources',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'reference/sandbox' },
								{ label: 'Container', slug: 'reference/resources/container/container' },
								{ label: 'Sidecar', slug: 'reference/resources/container/sidecar' },
								{ label: 'Network', slug: 'reference/resources/network/network' },
								{ label: 'Ingress', slug: 'reference/resources/ingress/ingress' },
								{ label: 'Exec', slug: 'reference/resources/exec/exec' },
								{ label: 'Copy', slug: 'reference/resources/copy/copy' },
								{ label: 'Template', slug: 'reference/resources/template/template' },
								{ label: 'Terraform', slug: 'reference/resources/terraform/terraform' },
							],
						},
						{
							label: 'Cloud Providers',
							collapsed: true,
							items: [
								{
									label: 'AWS',
									collapsed: true,
									items: [
										{ label: 'Account', slug: 'reference/resources/aws/account' },
										{ label: 'User', slug: 'reference/resources/aws/user' },
									],
								},
								{
									label: 'Azure',
									collapsed: true,
									items: [
										{ label: 'Service Principal', slug: 'reference/resources/azure/serviceprincipal' },
										{ label: 'Subscription', slug: 'reference/resources/azure/subscription' },
										{ label: 'User', slug: 'reference/resources/azure/user' },
									],
								},
								{
									label: 'Google Cloud',
									collapsed: true,
									items: [
										{ label: 'Project', slug: 'reference/resources/google/project' },
										{ label: 'Service Account', slug: 'reference/resources/google/serviceaccount' },
										{ label: 'User', slug: 'reference/resources/google/user' },
									],
								},
							],
						},
						{
							label: 'Kubernetes',
							collapsed: true,
							items: [
								{ label: 'Cluster', slug: 'reference/resources/k8s/cluster' },
								{ label: 'Config', slug: 'reference/resources/k8s/config' },
								{ label: 'Helm', slug: 'reference/resources/helm/helm' },
								{ label: 'Helm Repository', slug: 'reference/resources/helm/helmrepository' },
							],
						},
						{
							label: 'Nomad',
							collapsed: true,
							items: [
								{ label: 'Cluster', slug: 'reference/resources/nomad/nomadcluster' },
								{ label: 'Job', slug: 'reference/resources/nomad/nomadjob' },
							],
						},
						{
							label: 'User Interface',
							collapsed: true,
							items: [
								{ label: 'Terminal', slug: 'reference/resources/terminal/terminal' },
								{ label: 'Editor', slug: 'reference/resources/editor/editor' },
								{ label: 'Service', slug: 'reference/resources/service/service' },
								{ label: 'External Website', slug: 'reference/resources/externalwebsite/externalwebsite' },
								{ label: 'Note', slug: 'reference/resources/note/note' },
							],
						},
						{
							label: 'Interactive Content',
							collapsed: true,
							items: [
								{ label: 'Quiz', slug: 'reference/resources/quiz/quiz' },
								{ label: 'Multiple Choice Question', slug: 'reference/resources/quiz/multiplechoicequestion' },
								{ label: 'Single Choice Question', slug: 'reference/resources/quiz/singlechoicequestion' },
								{ label: 'Numeric Answer Question', slug: 'reference/resources/quiz/numericanswerquestion' },
								{ label: 'Text Answer Question', slug: 'reference/resources/quiz/textanswerquestion' },
							],
						},
						{
							label: 'Certificates & Security',
							collapsed: true,
							items: [
								{ label: 'Certificate CA', slug: 'reference/resources/cert/certificateca' },
								{ label: 'Certificate Leaf', slug: 'reference/resources/cert/certificateleaf' },
								{ label: 'Certificate File', slug: 'reference/resources/cert/file' },
							],
						},
						{
							label: 'Cache & Registry',
							collapsed: true,
							items: [
								{ label: 'Image Cache', slug: 'reference/resources/cache/imagecache' },
								{ label: 'Registry', slug: 'reference/resources/cache/registry' },
								{ label: 'Registry Auth', slug: 'reference/resources/cache/registryauth' },
							],
						},
						{
							label: 'Random Generators',
							collapsed: true,
							items: [
								{ label: 'Random Creature', slug: 'reference/resources/random/randomcreature' },
								{ label: 'Random ID', slug: 'reference/resources/random/randomid' },
								{ label: 'Random Number', slug: 'reference/resources/random/randomnumber' },
								{ label: 'Random Password', slug: 'reference/resources/random/randompassword' },
								{ label: 'Random UUID', slug: 'reference/resources/random/randomuuid' },
							],
						},
						{
							label: 'Utilities',
							collapsed: true,
							items: [
								{ label: 'HTTP', slug: 'reference/resources/http/http' },
							],
						},
						{
							label: 'Configuration Types',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'reference/types' },
								{ label: 'Resource', slug: 'reference/types/resource' },
								{ label: 'Variable', slug: 'reference/types/variable' },
								{ label: 'Local', slug: 'reference/types/local' },
								{ label: 'Output', slug: 'reference/types/output' },
								{ label: 'Module', slug: 'reference/types/module' },
							],
						},
						{
							label: 'Functions',
							slug: 'reference/functions',
						},
					],
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
