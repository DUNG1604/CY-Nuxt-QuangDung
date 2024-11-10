export default defineEventHandler(async (event) => {
    const apiKey = 'dcf3cce3566c404dbd3fce995bf51036';
    const { pageNumber = 1, strSearch = "h" } = getQuery(event);
    const pageSize = 5;
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${strSearch}&page=${pageNumber}&pageSize=${pageSize}&searchIn=title&apiKey=${apiKey}`);
        const res = await response.json();
        return res;
    } catch (error) {
        console.error("Error fetching data from NewsAPI:", error);
        return {
            status: "error",
            message: "Failed to fetch data"
        };
    }
});
