export default async function GET(path, host, token) {
    const response = await fetch(
        `${host}/${path}`.replaceAll(/\/{2,}/g, "/"),
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    console.log(response);
    return await response.json();
}