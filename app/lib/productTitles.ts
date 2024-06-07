export const title_subtitle_regexp = /(?<title>.*\d.*?)\s+(?<subtitle>.*)/i;
export default function getProductTitleAndSub(title: string) {
  const res = title_subtitle_regexp.exec(title)?.groups || {
    title: '',
    subtitle: title,
  };

  return res as {
    title: string;
    subtitle: string;
  };
}
