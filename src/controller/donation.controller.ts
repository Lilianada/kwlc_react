import { getDonationApi, getSingleDonationApi } from "../api/donate.api";
import DonateItemDTO, { DonationItemDTO } from "../dto/Donate.dto";
import { ResponseDTO } from "../dto/response.dto";
import { statusEnum } from "../enums/util.enum";
import { DonationsModel } from "../testModel";
import { fakeModel } from "../utils";

export const loadDonations = async (setItem: Function, items: DonateItemDTO[]) => {
    try {
        if (fakeModel) {
            const donateItem = DonationsModel;
            if (donateItem.length > 0) {
                setItem(donateItem);
            }
            else {}
        }
        else {
            const response: ResponseDTO = await getDonationApi();
            
            if (response.code < statusEnum.ok) {
                throw new Error(response.extra_data.toString());
            }
            
            const data:DonationItemDTO[] = response.data;
            console.log("data", data);
            const donationData:DonateItemDTO[] = [];
            // make api call to get individual donation details
            data.map(async (i, index) => { 
                const singleResponse = await getSingleDonationApi(i.id);
                
                if (singleResponse.code >= statusEnum.ok) {
                    //singleResponse.data
                    const _donationData = new DonateItemDTO({
                        description: singleResponse.data.description,
                        id: singleResponse.data.id,
                        // donationImages: singleResponse.data.donationImages.map(x => x.imageUrl),
                        image: singleResponse.data.donationImages?.filter(x => x.isMainImage)[0]?.imageUrl,
                        images: singleResponse.data.donationImages.map(x => x.imageUrl),
                        raised: 0,
                        target: 0,
                        title: i.title
                    });
                    donationData.push();
                    items = items.concat([_donationData])
                    setItem(items);
                }
            });
            // if (donationData.length > 0) {
            //     console.log("setting data", donationData);
            //     setItem(donationData);
            // }
            
        }
    } catch (error) {
        console.error(error);
    }
    
    
}

export const loadSingleDonation = async (setItem: Function, id: string) => {
    try {
        if (fakeModel) {
            const donateItem = DonationsModel.filter(x => x.id.toString() == id);
            if (donateItem.length > 0) {
                setItem(donateItem[0]);
            }
            else {}
        }
        else {
            const response: ResponseDTO = await getSingleDonationApi(parseInt(id));
            if (response.code < statusEnum.ok) {
                throw new Error(response.extra_data.toString());
            }
            const i:DonationItemDTO = response.data;
            if (!i) throw new Error();
            
             setItem(new DonateItemDTO({
                description: i.description,
                id: i.id,
                image: i.donationImages?.length > 0 ? i.donationImages?.filter(x => x.isMainImage)[0].imageUrl: "",
                images: i.donationImages?.length > 0 ? i.donationImages?.map(x => x.imageUrl) : [],
                raised: 0,
                target: 0,
                title: i.title
            }));
        }
    } catch (error) {
        console.log(error);
    }
    
}

export const navigateToHome = () => {
    window.location.href = "/web/";
}