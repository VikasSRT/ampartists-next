import React from "react";

interface YouTubeEmbedProps {
  urlOrId: string; // Can be full URL or just the video ID
  width?: string | number;
  height?: string | number;
  title?: string;
  autoplay?: boolean;
  start?: number;
}

const extractVideoId = (input: string): string | null => {
  try {
    const isFullUrl =
      input.includes("youtube.com") || input.includes("youtu.be");
    if (!isFullUrl) return input; // it's already an ID

    const url = new URL(input.trim());

    if (url.hostname === "youtu.be") {
      return url.pathname.split("/")[1]; // e.g. youtu.be/dqX0bL8kPuo
    }

    return url.searchParams.get("v");
  } catch (e) {
    console.error("Invalid YouTube input:", input);
    return null;
  }
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  urlOrId,
  width = "100%",
  height = 400,
  title = "YouTube video player",
  autoplay = false,
  start,
}) => {
  const videoId = extractVideoId(urlOrId);

  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    ...(start && { start: String(start) }),
  });

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  return (
    <iframe
      width={width}
      height={height}
      src={embedUrl}
      title={title}
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
      style={{ borderRadius: "12px", marginBottom: "1rem" }}
    ></iframe>
  );
};

export default YouTubeEmbed;
