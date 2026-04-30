<script lang="ts">
	import { page } from '$app/state';

	const navItems = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/plan', label: 'Plan' },
		{ href: '/progress', label: 'Progress' },
		{ href: '/learn', label: 'Learn' }
	];
</script>

<header class="header">
	<div class="header-logo">
		<a href="/">🔥 FanFuel</a>
	</div>
	<nav class="header-nav">
		{#each navItems as item}
			<a href={item.href} class:active={page.url.pathname === item.href}>{item.label}</a>
		{/each}
	</nav>
	<div class="header-profile">
		<span class="avatar">👤</span>
	</div>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		background: #1a1a2e;
		color: white;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-logo a {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
		text-decoration: none;
	}

	.header-nav {
		display: flex;
		gap: 1.5rem;
	}

	.header-nav a {
		color: #aaa;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.header-nav a:hover,
	.header-nav a.active {
		color: #ff6b35;
	}

	.avatar {
		font-size: 1.5rem;
	}
</style>

