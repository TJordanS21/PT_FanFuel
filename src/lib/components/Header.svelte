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
		background: #ffffff;
		color: #1a1a1a;
		position: sticky;
		top: 0;
		z-index: 100;
		border-bottom: 1px solid #e0e0e0;
	}

	.header-logo a {
		font-size: 1.25rem;
		font-weight: 700;
		color: #db0007;
		text-decoration: none;
	}

	.header-nav {
		display: flex;
		gap: 1.5rem;
	}

	.header-nav a {
		color: #666;
		text-decoration: none;
		font-weight: 500;
		transition: color 0.2s;
	}

	.header-nav a:hover,
	.header-nav a.active {
		color: #db0007;
	}

	.avatar {
		font-size: 1.5rem;
	}
</style>



