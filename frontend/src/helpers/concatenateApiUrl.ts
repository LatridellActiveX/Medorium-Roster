const baseUrl = "http://localhost:3000"; //from .env file

export default function concatenateApiUrl(url: string) {
    return `${baseUrl}/${url}`;
};