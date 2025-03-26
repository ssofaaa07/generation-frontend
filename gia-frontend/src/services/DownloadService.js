import axios from "axios"

const DOWNLOAD_URL = 'http://localhost:8080/template';

export const file = async () => {
    const response = await fetch.get(DOWNLOAD_URL);
    if (response.status === 200) {
        const blob = response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.appendChild(link);
        link.click();
        link.remove();
    }
} 