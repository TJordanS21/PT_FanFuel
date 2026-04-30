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
		background: #db0007;
		color: white;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.header-logo a {
		font-size: 1.25rem;
		font-weight: 700;
		color: #efd049;
		text-decoration: none;
	}

	.header-nav {
		display: flex;
		gap: 1.5rem;
	}

	.header-nav a {
		color: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.header-nav a:hover,
	.header-nav a.active {
		color: #efd049;
	}

	.avatar {
		font-size: 1.5rem;
	}
</style>


