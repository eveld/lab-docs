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
							label: 'Content Resources',
							collapsed: false,
							items: [
								{ label: 'Overview', slug: 'reference/content' },
								{ label: 'Lab', slug: 'reference/content/lab' },
								{ label: 'Page', slug: 'reference/content/page' },
								{ label: 'Layout', slug: 'reference/content/layout' },
								{ label: 'Task', slug: 'reference/content/task' },
								{ label: 'Note', slug: 'reference/content/note' },
								{
									label: 'Quiz',
									collapsed: true,
									items: [
										{ label: 'Overview', slug: 'reference/content/quiz' },
										{ label: 'Quiz', slug: 'reference/content/quiz/quiz' },
										{ label: 'Single Choice', slug: 'reference/content/quiz/singlechoicequestion' },
										{ label: 'Multiple Choice', slug: 'reference/content/quiz/multiplechoicequestion' },
										{ label: 'Text Answer', slug: 'reference/content/quiz/textanswerquestion' },
										{ label: 'Numeric Answer', slug: 'reference/content/quiz/numericanswerquestion' },
									],
								},
							],
						},
						{
							label: 'Sandbox Resources',
							collapsed: true,
							items: [
								{ label: 'Overview', slug: 'reference/sandbox' },
								{
									label: 'Compute',
									collapsed: true,
									items: [
										{ label: 'Container', slug: 'reference/sandbox/compute/container' },
										{ label: 'Sidecar', slug: 'reference/sandbox/compute/sidecar' },
									],
								},
								{
									label: 'Networking',
									collapsed: true,
									items: [
										{ label: 'Network', slug: 'reference/sandbox/networking/network' },
										{ label: 'Ingress', slug: 'reference/sandbox/networking/ingress' },
									],
								},
								{
									label: 'User Interface',
									collapsed: true,
									items: [
										{ label: 'Terminal', slug: 'reference/sandbox/ui/terminal' },
										{ label: 'Service', slug: 'reference/sandbox/ui/service' },
										{ label: 'Editor', slug: 'reference/sandbox/ui/editor' },
										{ label: 'External Website', slug: 'reference/sandbox/ui/externalwebsite' },
									],
								},
								{
									label: 'Storage',
									collapsed: true,
									items: [
										{ label: 'Copy', slug: 'reference/sandbox/storage/copy' },
										{ label: 'Template', slug: 'reference/sandbox/storage/template' },
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
												{ label: 'Account', slug: 'reference/sandbox/cloud/aws/account' },
												{ label: 'User', slug: 'reference/sandbox/cloud/aws/user' },
											],
										},
										{
											label: 'Azure',
											collapsed: true,
											items: [
												{ label: 'Service Principal', slug: 'reference/sandbox/cloud/azure/serviceprincipal' },
												{ label: 'Subscription', slug: 'reference/sandbox/cloud/azure/subscription' },
												{ label: 'User', slug: 'reference/sandbox/cloud/azure/user' },
											],
										},
										{
											label: 'Google Cloud',
											collapsed: true,
											items: [
												{ label: 'Project', slug: 'reference/sandbox/cloud/google/project' },
												{ label: 'Service Account', slug: 'reference/sandbox/cloud/google/serviceaccount' },
												{ label: 'User', slug: 'reference/sandbox/cloud/google/user' },
											],
										},
									],
								},
								{
									label: 'Orchestration',
									collapsed: true,
									items: [
										{
											label: 'Kubernetes',
											collapsed: true,
											items: [
												{ label: 'Cluster', slug: 'reference/sandbox/orchestration/k8s/cluster' },
												{ label: 'Config', slug: 'reference/sandbox/orchestration/k8s/config' },
											],
										},
										{
											label: 'Nomad',
											collapsed: true,
											items: [
												{ label: 'Cluster', slug: 'reference/sandbox/orchestration/nomad/nomadcluster' },
												{ label: 'Job', slug: 'reference/sandbox/orchestration/nomad/nomadjob' },
											],
										},
										{
											label: 'Helm',
											collapsed: true,
											items: [
												{ label: 'Helm', slug: 'reference/sandbox/orchestration/helm/helm' },
												{ label: 'Repository', slug: 'reference/sandbox/orchestration/helm/helmrepository' },
											],
										},
									],
								},
								{
									label: 'Utilities',
									collapsed: true,
									items: [
										{ label: 'Exec', slug: 'reference/sandbox/utilities/exec' },
										{ label: 'HTTP', slug: 'reference/sandbox/utilities/http' },
										{ label: 'Terraform', slug: 'reference/sandbox/utilities/terraform' },
										{
											label: 'Random Generators',
											collapsed: true,
											items: [
												{ label: 'Creature', slug: 'reference/sandbox/utilities/random/randomcreature' },
												{ label: 'ID', slug: 'reference/sandbox/utilities/random/randomid' },
												{ label: 'Number', slug: 'reference/sandbox/utilities/random/randomnumber' },
												{ label: 'Password', slug: 'reference/sandbox/utilities/random/randompassword' },
												{ label: 'UUID', slug: 'reference/sandbox/utilities/random/randomuuid' },
											],
										},
										{
											label: 'Cache & Registry',
											collapsed: true,
											items: [
												{ label: 'Image Cache', slug: 'reference/sandbox/utilities/cache/imagecache' },
												{ label: 'Registry', slug: 'reference/sandbox/utilities/cache/registry' },
												{ label: 'Registry Auth', slug: 'reference/sandbox/utilities/cache/registryauth' },
											],
										},
									],
								},
								{
									label: 'Certificates',
									collapsed: true,
									items: [
										{ label: 'Certificate CA', slug: 'reference/sandbox/certificates/cert/certificateca' },
										{ label: 'Certificate Leaf', slug: 'reference/sandbox/certificates/cert/certificateleaf' },
										{ label: 'Certificate File', slug: 'reference/sandbox/certificates/cert/file' },
									],
								},
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
