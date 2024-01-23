import { htmlToPlainText } from "./helpers/text";
import * as announcement from "./source.json";


export async function fetchAnnouncement(): Promise<Announcement> {
  //const image = await fetchImage(announcement.content.lot.images[0].urls.large);

  return {
    title: announcement.title,
    backgroundImageUrl: announcement.content.lot.images[0].urls.large,
    price: announcement.content.lot.amounts.displayedPrice,
    squareFootageText: announcement.content.lot.features[0].text,
    roomsNumberText:
      announcement.content.lot.features[1].formattedValue + " locali",
    city: announcement.content.lot.location.city,
    province: announcement.content.lot.location.province,
    address: "Via delle dolomiti 126",
    //address: announcement.content.lot.location.address,
    description: htmlToPlainText(announcement.content.lot.description),
  };
}

export type Announcement = {
  address: string | undefined;
  backgroundImageUrl: any;
  city: string;
  description: string;
  price: number;
  province: string;
  roomsNumberText: string;
  squareFootageText: string;
  title: string;
};
