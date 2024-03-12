require("dotenv").config();

export const generateSampleResponses = (count: number) => {
  const submissionTime = new Date('2024-03-12T20:00:00Z');

  const responses = new Array(count)
    .fill(0)
    .map((_, i) => {
      submissionTime.setMinutes(submissionTime.getMinutes() + 5);

      return {
        submissionId: i.toString(),
        submissionTime: submissionTime.toISOString(),
      };
    });

  return responses;
}

export const mockGetResponses = (responses: any[]) => (url: string) => {
  const urlObj = new URL(url);
  const limit = parseInt(urlObj.searchParams.get("limit") || "150");
  const offset = parseInt(urlObj.searchParams.get("offset") || "0");

  const totalResponses = responses.length;
  const pageCount = Math.ceil(totalResponses / limit);

  const itemCount = Math.min(limit, totalResponses - offset);
  const items = responses.slice(offset, offset + itemCount);

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
};
