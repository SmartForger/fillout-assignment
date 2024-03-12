require("dotenv").config();

export const mockGetResponses = (url: string) => {
  const urlObj = new URL(url);
  const limit = parseInt(urlObj.searchParams.get("limit") || "150");
  const offset = parseInt(urlObj.searchParams.get("offset") || "0");

  const totalResponses = 500;
  const pageCount = Math.ceil(totalResponses / limit);

  const itemCount = Math.min(limit, totalResponses - offset);

  const items = new Array(itemCount)
    .fill(0)
    .map((_, i) => ({ submissionId: (offset + i).toString() }));

  return new Promise((resolve) => {
    const randomDelay = Math.round(300 * Math.random());

    setTimeout(() => {
      resolve({
        data: {
          responses: items,
          totalResponses,
          pageCount,
        },
      });
    }, randomDelay);
  });

  return Promise.resolve();
};
