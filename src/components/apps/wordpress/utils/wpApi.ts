import { WordPressSite } from '../WordPressSiteCard';

export interface WPPost {
    id: number;
    date: string;
    title: { rendered: string };
    link: string;
    status: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
        'author'?: Array<{ name: string }>;
    };
}

export interface WPComment {
    id: number;
    date: string;
    content: { rendered: string };
    post: number;
}

export interface SiteStats {
    totalPosts: number;
    totalComments: number;
    totalPages: number;
    recentPosts: WPPost[];
    postsByDate: Record<string, number>;
}

export async function fetchSiteStats(site: WordPressSite): Promise<SiteStats> {
    const auth = btoa(`${site.username}:${site.app_password}`);
    const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
    };

    const baseUrl = site.site_url.replace(/\/$/, ''); // Remove trailing slash if present

    try {
        // Fetch Posts (Recent 10)
        const postsRes = await fetch(`${baseUrl}/wp-json/wp/v2/posts?per_page=10&_embed`, { headers });
        const totalPosts = Number(postsRes.headers.get('X-WP-Total') || 0);
        const posts: WPPost[] = postsRes.ok ? await postsRes.json() : [];

        // Fetch Comments Count
        const commentsRes = await fetch(`${baseUrl}/wp-json/wp/v2/comments?per_page=1`, { headers });
        const totalComments = Number(commentsRes.headers.get('X-WP-Total') || 0);

        // Fetch Pages Count
        const pagesRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages?per_page=1`, { headers });
        const totalPages = Number(pagesRes.headers.get('X-WP-Total') || 0);

        // Process for Chart (Posts by Date)
        const postsByDate: Record<string, number> = {};
        posts.forEach(post => {
            const date = post.date.split('T')[0];
            postsByDate[date] = (postsByDate[date] || 0) + 1;
        });

        return {
            totalPosts,
            totalComments,
            totalPages,
            recentPosts: posts,
            postsByDate
        };

    } catch (error) {
        console.error(`Error fetching stats for ${site.site_name}:`, error);
        return {
            totalPosts: 0,
            totalComments: 0,
            totalPages: 0,
            recentPosts: [],
            postsByDate: {}
        };
    }
}
