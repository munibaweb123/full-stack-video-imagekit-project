import { IVideo } from "../models/Video";

export type videoFormData = Omit<IVideo, "_id">;

// Generic fetch options with a type-safe body
type fetchOptions<T = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
};

class ApiClient {
  // Generic fetch method with response and request body types
  private async fetch<TResponse, TBody = unknown>(
    endpoint: string,
    options: fetchOptions<TBody> = {}
  ): Promise<TResponse> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const res = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  }

  // GET /api/video
  async getVideos(): Promise<IVideo[]> {
    return this.fetch<IVideo[]>("/video");
  }

  // POST /api/video
  async createVideo(videoData: videoFormData): Promise<IVideo> {
    return this.fetch<IVideo, videoFormData>("/video", {
      method: "POST",
      body: videoData,
    });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
