/**
 * Generate a random quote
 * @param {string} url The URL to fetch the quote from
 * @returns A string containing a random quote
 */

async function getRequest(url) {
    try {
        const response = await requestUrl(url);
        if (response.status < 200 && response.status >= 300) {
            throw new Error("Error performing GET request");
        }
        return response;
    } catch (error) {
        throw new Error("Error performing GET request");
    }
}

async function daily_quote() {
    try {
        const response = await getRequest(
            "https://raw.githubusercontent.com/Zachatoo/quotes-database/refs/heads/main/quotes.json"
        );
        const quotes = response.json;
        const random_quote = quotes[Math.floor(Math.random() * quotes.length)];

        const { quote, author } = random_quote;
        const new_content = `> [!quote]+ QotD \n> ${quote}\n> — ${author}`;

        return new_content;
    } catch (error) {
        new Error("Error generating daily quote");
        return "Error generating daily quote";
    }
}

module.exports = daily_quote;
