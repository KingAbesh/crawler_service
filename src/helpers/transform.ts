export const transform: (str: any) =>
  | {
      address: string;
      locationBoundaries: string;
      link: string;
    }
  | null
  | false = (str: any) => {
  try {
    const url = "https://www.target.com";
    const allLinks = str?.querySelectorAll("a");

    const address =
      allLinks[0]?.childNodes[0]?.parentNode?.parentNode?.childNodes[0]
        ?.childNodes[0]?._rawText;

    let locationBoundaries = address?.split(" ");

    locationBoundaries = locationBoundaries?.[locationBoundaries?.length - 1];

    let link =
      allLinks[allLinks?.length - 1]?.childNodes[0]?.parentNode?.parentNode
        ?.childNodes[0]?.rawAttrs;

    link = `${link?.split(" ")[0]?.replace(/href=/, "")}`;

    return address
      ? { address, locationBoundaries, link: `${url}${link}`.replace('"', "") }
      : null;
  } catch (err) {
    console.log(err);
    return false;
  }
};
