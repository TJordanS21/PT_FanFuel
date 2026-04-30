<script lang="ts">
	let { activityType } = $props<{ activityType: string }>();

	const playlists: Record<string, { title: string; url: string }> = {
		gym: {
			title: 'Gym Motivation',
			url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP'
		},
		match: {
			title: 'Match Prep',
			url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX3ZeFHRhhi7Y'
		},
		cardio: {
			title: 'Cardio Beats',
			url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX32NsLKyzScr'
		},
		recovery: {
			title: 'Recovery & Chill',
			url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u'
		},
		rest: {
			title: 'Rest Day Vibes',
			url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa'
		}
	};

	const playlist = $derived(playlists[activityType] || playlists['rest']);
</script>

<div class="spotify-card card">
	<h3>&#127925; {playlist.title}</h3>
	<iframe
		title="Spotify Playlist"
		src="{playlist.url}?theme=0"
		width="100%"
		height="152"
		frameborder="0"
		allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
		loading="lazy"
	></iframe>
</div>

<style>
	.spotify-card {
		margin-top: 1.5rem;
	}
	.spotify-card h3 {
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}
</style>
