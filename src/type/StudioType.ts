
export interface IReview {
  _id?: string;
  name: string;
  rating: number;
  comment: string;
}

export interface Istudio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number | string;
  securityDeposit: number | string;
  maxCapacity: number | string;
  location: string;
  imageUrl: string;
  images?: string[];
  amenities: string[];
  overview: string;
  rating?: number;
  reviews?: IReview[];
  hostName?: string;
  hostEmail?: string;
  status?: string;
}
