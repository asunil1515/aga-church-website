// pages/api/youtube/latest.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory cache
let cache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      console.log('Returning cached data');
      return res.status(200).json(cache.data);
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    console.log('API Key exists:', !!apiKey);
    console.log('Channel ID exists:', !!channelId);

    if (!apiKey || !channelId) {
      return res.status(500).json({ error: 'YouTube API configuration missing' });
    }

    // Use the more efficient 'list' endpoint (costs only 1 unit)
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );

    if (!channelResponse.ok) {
      const error = await channelResponse.json();
      console.error('YouTube API Error:', error);
      throw new Error('Failed to fetch channel data');
    }

    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist');
    }

    // Get latest video from uploads playlist (costs 1 unit)
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=1&key=${apiKey}`
    );

    if (!videosResponse.ok) {
      const error = await videosResponse.json();
      console.error('YouTube API Error:', error);
      throw new Error('Failed to fetch videos');
    }

    const videosData = await videosResponse.json();
    const latestVideo = videosData.items[0];

    if (!latestVideo) {
      return res.status(404).json({ error: 'No videos found' });
    }

    const videoData = {
      isLive: false, // To check live status would require another API call
      videoId: latestVideo.snippet.resourceId.videoId,
      title: latestVideo.snippet.title,
      thumbnail: latestVideo.snippet.thumbnails.maxres?.url || 
                 latestVideo.snippet.thumbnails.high?.url ||
                 latestVideo.snippet.thumbnails.medium?.url,
      publishedAt: latestVideo.snippet.publishedAt
    };

    // Cache the result
    cache = {
      data: videoData,
      timestamp: Date.now()
    };

    console.log('Successfully fetched and cached video data');
    return res.status(200).json(videoData);

  } catch (error) {
    console.error('YouTube API Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch video data'
    });
  }
}