export async function GET(path, host, token) {
    const response = await fetch(
        `${host}/${path}?per_page=100`.replaceAll(/\/{2,}/g, "/"),
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Pragma: "no-cache",
                "Cache-Control": "no-cache"
            },
            cache: "no-cache"
        }
    );
    if(response.status >= 400 && response.status < 600) {
        throw new Error(`Server responded with ${response.status}`)
    }
    return await response.json();
}

export async function RESGET(path, host, token) {
    const response = await fetch(
        `${host}/${path}?per_page=100`.replaceAll(/\/{2,}/g, "/"),
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Pragma: "no-cache",
                "Cache-Control": "no-cache"
            },
            cache: "no-cache"
        }
    );
    if(response.status >= 400 && response.status < 600) {
        throw new Error(`Server responded with ${response.status}`)
    }
    return response;
}

export async function POST(path, host, token, body, contentType) {
    const response = await fetch(
        `${host}/${path}`.replaceAll(/\/{2,}/g, "/"),
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Pragma: "no-cache",
                "Cache-Control": "no-cache",
                "Content-Type": contentType
            },
            body: JSON.stringify(body),
            cache: "no-cache"
        }
    );
    if(response.status >= 400 && response.status < 600) {
        throw new Error(`Server responded with ${response.status}`)
    }
    return await response.json();
}

export async function RAWPOST(url, body, contentType) {
    const response = await fetch(
        url,
        {
            method: "POST",
            headers: {
                Pragma: "no-cache",
                "Cache-Control": "no-cache"
            },
            body: body,
            cache: "no-cache"
        }
    );
    if(response.status >= 400 && response.status < 600) {
        throw new Error(`Server responded with ${response.status}`)
    }
    return response;
}

export async function RAWGET(url) {
    const response = await fetch(
        url,
        {
            method: "GET",
            headers: {
                Pragma: "no-cache",
                "Cache-Control": "no-cache"
            },
            cache: "no-cache"
        }
    );
    if(response.status >= 400 && response.status < 600) {
        throw new Error(`Server responded with ${response.status}`)
    }
    return response;
}