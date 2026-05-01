<script lang="ts">
	import { page } from '$app/state';

	const navItems = [
		{ href: '/', label: 'Dashboard', icon: '🏠' },
		{ href: '/plan', label: 'Plan', icon: '📅' },
		{ href: '/progress', label: 'Progress', icon: '📊' },
		{ href: '/learn', label: 'Learn', icon: '📖' }
	];
</script>

<header class="header">
	<div class="header-inner">
		<a href="/" class="header-logo">
			<span class="logo-icon">🔥</span>
			<span class="logo-text">FanFuel</span>
		</a>
		<nav class="header-nav">
			{#each navItems as item}
				<a href={item.href} class:active={page.url.pathname === item.href || (item.href !== '/' && page.url.pathname.startsWith(item.href))}>
					<span class="nav-icon">{item.icon}</span>
					{item.label}
				</a>
			{/each}
		</nav>
		<div class="header-profile">
			<div class="avatar">👤</div>
		</div>
	</div>
</header>

<style>
	.header {
		background: #ffffff;
		position: sticky;
		top: 0;
		z-index: 100;
		border-bottom: 1px solid var(--color-border);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1100px;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
	}

	.header-logo {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
	}

	.logo-icon {
		font-size: 1.4rem;
	}

	.logo-text {
		font-size: 1.2rem;
		font-weight: 800;
		color: var(--color-primary);
		letter-spacing: -0.02em;
	}

	.header-nav {
		display: flex;
		gap: 0.25rem;
	}

	.header-nav a {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--color-text-muted);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9rem;
		padding: 0.45rem 0.85rem;
		border-radius: 8px;
		transition: all 0.15s;
	}

	.nav-icon {
		font-size: 0.95rem;
	}

	.header-nav a:hover {
		background: rgba(219, 0, 7, 0.05);
		color: var(--color-primary);
	}

	.header-nav a.active {
		background: rgba(219, 0, 7, 0.08);
		color: var(--color-primary);
		font-weight: 600;
	}

	.avatar {
		font-size: 1.4rem;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg);
		border-radius: 50%;
	}
</style>
