import axios from 'axios';

export async function imageUrlToBase64(url: string): Promise<string> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  const contentType = response.headers['content-type'];
  return `data:${contentType};base64,${base64}`;
}
