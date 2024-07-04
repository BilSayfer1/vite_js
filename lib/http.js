export let base_url = "http://localhost:8080";

export async function getRequest(url) {
    try {
        const response = await fetch(`${base_url}${url}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('GET request failed:', error);
    }
}

export async function postRequest(url, data) {
    try {
        const response = await fetch(`${base_url}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}

export async function deleteRequest(url) {
    try {
        const response = await fetch(`${base_url}${url}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('DELETE request failed:', error);
    }
}
