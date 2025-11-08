export async function fetchContributors(owner = 'KizYTB', repo = 'jtheberg-docs') {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
    if (!response.ok) {
      throw new Error('Failed to fetch contributors');
    }
    const contributors = await response.json();
    return contributors.map(contributor => ({
      id: contributor.id,
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions
    }));
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return [];
  }
}
