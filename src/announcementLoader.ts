import { featureIconMapping } from "./consts";
import { htmlToPlainText } from "./helpers/text";
import * as announcement from "./source.json";

export function fetchAdvertisement(): AdvertisementInfoPDF {
  const result: AdvertisementInfoPDF = {
    address: "Via delle dolomiti 126",
    //address: announcement.content.lot.location.address,
    backgroundImageUrl: announcement.content.lot.images[0].urls.large,
    bathroomsNumberText: "",
    city: announcement.content.lot.location.city,
    code: announcement.advertisementCode,
    description: htmlToPlainText(announcement.content.lot.description),
    detailImageUrls: [],
    features: [],
    price: announcement.content.lot.amounts.displayedPrice,
    province: announcement.content.lot.location.province,
    roomsNumberText: "",
    squareFootageText: "",
    title: announcement.title,
  };

  var features = announcement.content.lot.features;

  if(features)
  {
    result.squareFootageText = announcement.content.lot.features.find(i => i.type === "area")?.text ?? "";

    const roomsNumber = announcement.content.lot.features.find(i => i.type === "rooms")?.formattedValue;
    if(roomsNumber)
    {
      if(roomsNumber === "1")
      {
        result.roomsNumberText = roomsNumber + " Locale";
      }
      else
      {
         result.roomsNumberText = roomsNumber + " Locali";
      }
    }

    const bathroomsNumber = announcement.content.lot.features.find(i => i.type === "bathrooms")?.formattedValue;
    if(bathroomsNumber)
    {
      if(bathroomsNumber === "1")
      {
        result.bathroomsNumberText = bathroomsNumber + " Bagno";
      }
      else
      {
        result.bathroomsNumberText = bathroomsNumber + " Bagni";
      }
    }

    var icon;
    var label;

    for(let i = 0; i < features.length; i++)
    {
      label = features[i].label;
      icon = null;
      
      if (featureIconMapping.has(label))
      {
        icon = featureIconMapping.get(label)!;
        result.features.push([label, icon]);
      }
    }
  }

  if (announcement.content.lot.images)
  {
    result.detailImageUrls = announcement.content.lot.images.slice(1, 6).map(i => i.urls.medium);
  }

  return result;
}

export type AdvertisementInfoPDF = {
  address: string | undefined;
  backgroundImageUrl: string;
  bathroomsNumberText: string;
  city: string;
  code: string;
  description: string;
  detailImageUrls: string[];
  features: Array<[string, string]>;
  price: number;
  province: string;
  roomsNumberText: string;
  squareFootageText: string;
  title: string;
};
