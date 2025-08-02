import { IVideo } from "../models/Video";

export type videoFormData = Omit<IVideo,"_id">

type fetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
}

class ApiClient {
    private async fetch<T>(endpoint:string, options:fetchOptions={}): Promise<T> {
        const { method = "GET", body, headers = {} } = options;

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const res = await fetch(`/api${endpoint}`,
            {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : undefined
            }
        )
        if (!res.ok) {
            throw new Error(await res.text())
        }
        return res.json()
    }

    async getvideos() {
    return this.fetch("/video")
    }

    async createVideo(videoData: videoFormData) {
        return this.fetch("/video", {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient();
