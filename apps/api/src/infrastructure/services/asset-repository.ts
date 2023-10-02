import { IAssetRepository } from "@interfaces";

export class AssetRepository implements IAssetRepository {

    getGenericImageUrl () {
        return "localhost:3001/assets/image/generic_profile.png";
    }

}