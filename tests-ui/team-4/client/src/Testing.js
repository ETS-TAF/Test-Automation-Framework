
export function sendTestRequest(request) {
    // const server = 'http://localhost:3001';
    const server = 'http://ae3988b2bb5ec49e7badb4867e7d87e2-1496055706.ca-central-1.elb.amazonaws.com:3000';
    return fetch(server, {
        method: 'POST',
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(data => data.json())
}