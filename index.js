const axios = require("axios");
const fs = require("fs");
const topLanguages = fs.readFileSync("content/topLanguages.txt", "utf8");

const getQuote = async () => {
  try {
    const { data } = await axios.get(
      "https://quotes.rest/qod?language=en&quot"
    );
    const quote = data.contents.quotes[0].quote;
    const author = data.contents.quotes[0].author;

    console.log("new quote", `"${quote}"`);

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  //fs.writeFileSync("README.md", `_**${quote}**_\n\n${author}`);
  var stream = fs.createWriteStream("README.md");
  stream.once("open", function (fd) {
    stream.write(`_**${quote}**_\n\n${author}`);
    stream.write(`\n\n${topLanguages}`);
    stream.end();
  });
};

generate();
