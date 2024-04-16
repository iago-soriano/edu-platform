import { IAssetRepository } from "./interfaces";

export class AssetRepository implements IAssetRepository {
  getGenericImageUrl() {
    return `${process.env.WEB_APP_URL}/assets/image/generic_profile.png`;
  }
}
